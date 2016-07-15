process.send = process.send || function () {};

process.on('message', (m) => {
    prepareCallFunction((m.statement)).then(function(result,err){
      process.send({ response: result });

    });
});

var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require ('pg-promise')(options);
var cn = require ('./model/ConnectData')
var db = pgp(cn);
var qrm = pgp.queryResult;
var Parametros = {
  _id : 0,
  ref1: 'out_cursor'
};

function prepareCallFunction(callFunction) {
  return new promise (function(fullfill,reject){
    Parametros = callFunction.Parametros;
    //console.log(Parametros)
    db.one('select proargnames from pg_proc where proname=$1',callFunction.metodo) // find the user from id;
        .then(function (data) {
                db.tx(function (t) {
                    // t = this;
                    // creating a sequence of transaction queries:
                      var progargs = data.proargnames;
                      var cadenaArgumentos='(';var separator='';
                      var arrayArgumentos = [];
                      //console.log(progargs)
                      progargs.forEach(function(progarg,index){
                        if (index>0)separator=',';
                        cadenaArgumentos=cadenaArgumentos+separator+'$'+parseInt(index+1);
                        arrayArgumentos.push(eval('Parametros.'+progarg));
                      });
                    //  console.log(arrayArgumentos)
                      cadenaArgumentos=cadenaArgumentos+')';
                      var q1 = this.one("SELECT nodejsdemo." + callFunction.metodo + cadenaArgumentos, arrayArgumentos);
                      var q2 = this.many('FETCH ALL IN "out_cursor"');

                    // returning a promise that determines a successful transaction:
                    return this.batch([q1,q2]); // all of the queries are to be resolved;
                    }).then(function (data) {
                        //console.log('first')
                        //console.log(data[1])
                        fullfill(data[1]);
                    }).catch(function (error) {
                      console.log(error)
                      console.log('error')
                        //console.log(error); // printing the error;
                    });

        })
        .then(function (data) {
          //  console.log(data); // display found audit records;
        })
        .catch(function (error) {
            //console.log(error); // display the error;
        });
  });
}
