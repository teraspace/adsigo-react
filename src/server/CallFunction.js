process.send = process.send || function() {};
process.on('message', (m) => {
    prepareCallFunction(JSON.parse(m.statement)).then(function(result, err) {
      //  console.log('prepareCallFunction(callFunction: fn(procedureCall: string))');
        process.send({
            response: result
        });
    });
});

var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);
var cn = require('./model/ConnectData');
var db = pgp(cn);
var qrm = pgp.queryResult;
var nombreFuncion = 'listarusuario';

function prepareCallFunction(callFunction) {
    return new promise(function(fullfill, reject) {
        Parametros = callFunction.Parametros;
        db.one('select proargnames from pg_proc where proname=$1 limit 1', callFunction.metodo).then(function(data) {
            db.tx(function(t) {
                // t = this;
                var progargs = data.proargnames;
console.log(progargs)
                var cadenaArgumentos = '(';
                var separator = '';
                var arrayArgumentos = [];
                if(progargs!=null)
                if(typeof(progargs)=='object')
                progargs.forEach(function(progarg, index) {
                    if (index > 0) {
                        separator = ',';
                    }

                    cadenaArgumentos = cadenaArgumentos + separator + '$' + parseInt(index + 1);
                    arrayArgumentos.push(eval('Parametros.' + progarg));
                });
                cadenaArgumentos = cadenaArgumentos + ')';
                //console.log("SELECT " + callFunction.metodo + cadenaArgumentos, arrayArgumentos);

                var q1 = t.one("SELECT " + callFunction.metodo + cadenaArgumentos + " as app", arrayArgumentos);
                var q2 = t.many('FETCH ALL FROM mycursor');
                console.log("SELECT " + callFunction.metodo + cadenaArgumentos + " as app", arrayArgumentos)
                // returning a promise that determines a successful transaction:
                return this.batch([q1, q2]); // all of the queries are to be resolved;
            }).then(function(data) {
              //  console.log(data)
                pgp.end()
                fullfill(data);
            }).catch(function(error) {
                console.log('error5');  console.log(error[0].result)
                var msgerror = 'Error general';
                var success = 't';
                try {
                  msgerror = JSON.stringify(error[0].result).split(',')[1].replace('\\','')
                  console.log(msgerror)
                }catch(error){
                  console.log(error)
                  success='f'
                }
                fullfill([ {app: success+','+msgerror } ]);
                reject(error);

            });
        }).then(function(data) {
          //  console.log(data); // display found audit records;
        }).catch(function(error) {
            console.log(error)
            console.log('error6');
            fullfill([ {app: 'f,Error general' } ]);

        });
        // find the user from id;
    });
}
