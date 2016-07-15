
/**
 *
 * @author T. Carlos Manuel Patiño Machado.
 *
 * @since 08 Octubre 2015
 *
 *	Clase que construye la cadena JSON con sus parámetros respectivos.
 */

var ConstantsSocket = require ('./ConstantsSocket');
var _ = require ('./ConstantsAPI');
var jsonQuery = require('./jsonquerylib.js');

var ApiUtil = {
  /*
    Función que obtiene el modelo del Procedimiento declarado en ConstantsAPI
  * @param {String} nameProc nombre del procedimiento almacenado
  */
    getNameProc: function (nameProc) {
        for (var key in _) {
            if (_[key] === nameProc){
                return key;
              }
        }
    },
  /*
  * @param {String} proc nombre del procedimiento almacenado
  */
    llamarAPI:  function (target,proc) {
      //var ActionsSocket = require('./ActionsSocket');
          var procedimiento;

          if (typeof proc==='object'){
            procedimiento = this.getNameProc(proc);
          } else {
            procedimiento = proc;
          }

          jsonQuery.setMetodo(procedimiento);
          jsonQuery.setModelo("");
          jsonQuery.setParametros(proc);
          jsonQuery.setDeviceToken(ActionsSocket.device_token());
          var payload = "" + jsonQuery.getJsonquery();
          return payload;
        //  ActionsSocket.emit(ConstantsSocket.CALL_STATEMENT,payload,target);
    },
    /*
    * @param {String} cadena instrucción SQL
    */
    llamarSQL: function (query){
      //var ActionsSocket = require('./ActionsSocket');
          jsonQuery.setMetodo(this.getNameProc(query));
          jsonQuery.setModelo("");
          jsonQuery.setParametros(query);
          jsonQuery.setDeviceToken(ActionsSocket.device_token());
      var payload = "" + jsonQuery.getJsonquery();
        //  ActionsSocket.dispatch(ConstantsSocket.CALL_QUERY,payload);
    },
    /**
    * @param {String} proc nombre del procedimiento almacenado
    */
    getJsonquery:  function (proc) {
      var procedimiento;
        if (typeof proc==='object'){
          procedimiento = this.getNameProc(proc);
        } else {
          procedimiento = this.getNameProc(proc);
        }
          jsonQuery.setMetodo(procedimiento);
          jsonQuery.setModelo("");
          jsonQuery.setParametros(proc);
          var payload = "" + jsonQuery.getJsonquery();
          return payload;
      }
};
module.exports = ApiUtil;
