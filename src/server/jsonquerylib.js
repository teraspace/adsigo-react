/**
*
* @author T. Carlos Manuel Patiño Machado.
*
* @since 08 Octubre 2015
*
* Utilitario para crear cadena Json de invocación de API.
*
*/
console.log('jsonquerylib')
    var device_token;
    var listaParametros = [];
    var Metodo;
    var Modelo;
    var Parametros;

    this.getJsonquery = getJsonquery;
    this.getListaParametros = getListaParametros;
    this.addParametro = addParametro;
    this.listaParametros = listaParametros;
    this.setMetodo = setMetodo;
    this.setModelo = setModelo;
    this.setParametros = setParametros;
    this.setDeviceToken = setDeviceToken;
    function getJsonquery(){
                    var str={
                        "device_token":device_token,
                        "metodo":Metodo,
                        "modelo":Modelo,
                        "Parametros":getListaParametros ()
                    };
                    var jsonquery={
                      "jsonquery":str
                    };
                    return JSON.stringify(str);
    }

    function addParametro(key,value){
        listaParametros.push(parametro(key,value));
            function parametro (key,value){

                var param = {
                    "key":key,
                    "value":value
                };
                return param;
            }
    }
    function setDeviceToken (dt){
      device_token = dt;
    }
    function getDeviceToken(){
      return device_token;
    }
    function getListaParametros (){
        return listaParametros;
    }
    function setMetodo(metodo){
        Metodo = metodo;
    }
    function setModelo(modelo){
        Modelo = modelo;
    }
    function setParametros(parametros){
        listaParametros = parametros;
    }
exports.setMetodo = setMetodo;
exports.getJsonquery=getJsonquery;
exports.setModelo = setModelo;
exports.getDeviceToken=getDeviceToken;
exports.setDeviceToken=setDeviceToken;
exports.getListaParametros=getListaParametros;
exports.addParametro=addParametro;
exports.setParametros=setParametros;
