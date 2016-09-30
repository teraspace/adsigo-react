var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(server);
var Promises = require('bluebird');
var ConstantsSocket = require('./ConstantsSocket');
var _ = require('./ConstantsAPI');
var Response = require('./model/Response');
var bodyParser = require('body-parser');
var apiUtil = require('./ApiUtil');
var fileSystem = require('fs');
var path = require('path');
var async = require("async");
var browserify = require('browserify-middleware');
var multer  =   require('multer');
var fs = require('fs')

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('iphoto');
var uploads = multer({ dest: 'uploads/' })

var COMMANDER = false;

//Reinicia a la cero horas de cada día.
setInterval(function() {
  var time = new Date();
  if (time.getHours() == 0 && (time.getMinutes() == 0 || time.getMinutes() == 1)) {
    process.exit();
    console.log('cerrando')
  }
}, 60000);
if (process.argv.length > 0) {}
//Ruta estandar router ReactJS
app.get('/*', function(req,res){
  var fileArr = req.path.split('/')
  var file=""

  if(req.path=='/')
    res.sendFile(path.join(__dirname, '../../build/')+'index.html')
  else if((req.path).toString().includes('.'))
    res.sendFile(path.join(__dirname, '../../build')+req.path)
  else {
    console.log('asdasdasdsasadssadas')

    res.sendFile(path.join(__dirname, '../../build/')+'index.html')

}

//  process.exit()
})

//Publica el folder con los archivos del sitio.
app.use(express.static(path.join(__dirname, '../../build/')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Setea el formato de request a urlencoded. Usado para el inicioa de sesión únicamente.
app.use(bodyParser.urlencoded({
  extended: true
}));
//Crea el método de inicio de sesión.
app.post('/api/get-dealings', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params.replace('undefined',''));
  //  p.in_ip_user_host = ip;
  _.app_get_sales_dealings = p;
  var procedureCall = apiUtil.getJsonquery(_.app_get_sales_dealings);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/restore-password', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.body)
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.app_restore_password = p;
  var procedureCall = apiUtil.getJsonquery(_.app_restore_password);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/get-stock', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.app_get_user_stock = p;
  var procedureCall = apiUtil.getJsonquery(_.app_get_user_stock);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});


//Crea el método de inicio de sesión.
app.post('/api/stock-dealings', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.appdealings = p;
  var procedureCall = apiUtil.getJsonquery(_.appdealings);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});

//Crea el método de inicio de sesión.
app.post('/api/stock-availbility', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.appgetavailability = p;
  var procedureCall = apiUtil.getJsonquery(_.appgetavailability);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/stock-detail', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.appshowstock = p;
  var procedureCall = apiUtil.getJsonquery(_.appshowstock);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/pricerange', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  //_.appgettypestock = p;
  var procedureCall = apiUtil.getJsonquery(_.appgetpricerange);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/landing', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.applanding = p;

  var procedureCall = apiUtil.getJsonquery(_.applanding);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});



//Crea el método de inicio de sesión.
app.post('/api/register-stock', function(req, res) {
  //Se procesan las cabeceras donde llega el nombre de ususario y password.
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log("name-> " + req);

  // console.log("password-> " + stringify(req.body.password));
  //Se asignan los parámetros del Procedimiento del Inicio de Sesión.

  var p = JSON.parse(req.body.params);


  p.in_ip_user_host = ip;
  //p.in_user_token = '';

  var photos = p.in_user_photos
  p['in_user_photos'] = null;
  delete p.in_user_photos
  var filesExtensions = []
  var photoParams = ['in_first_photo', 'in_second_photo' ,'in_third_photo' , 'in_fourth_photo' ];
  photoParams.forEach(function(fp,index){
    p[photoParams[index]] = '';
  })
  photos.forEach(function(photo,index){

    photos[index] = JSON.parse(photo).data
    filesExtensions[index] = String(photos[index].originalname).slice(-4)
    p[photoParams[index]] = String(photos[index].originalname.replace(' ','_'));
  })
  //console.log(filesExtensions)



  _.appstock = p;
  var context = this;
  var procedureCall = apiUtil.getJsonquery(_.appstock);
  //console.log(procedureCall);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      var dir = __dirname  +  '/img/stock/user_' + p.in_fk_id_user + '/stock_' + response[0].id;
      var userDir = __dirname  + '/img/stock/user_' + p.in_fk_id_user + '/';
      var stockDir = 'stock_' + response[0].id + '/';
      if (!fs.existsSync(userDir)){
        fs.mkdirSync(userDir);
      }
      if (!fs.existsSync(userDir+stockDir)){
        fs.mkdirSync(userDir+stockDir);
        console.log('dirrectorio creado')
      }

      var photosok = true;
      photos.forEach(function(photo,index){
        console.log(photo)
      //  if (fs.existsSync(dir))
        try {
          fs.rename(__dirname+ "/" + photo.path, dir +'/' + photo.originalname.replace(' ','_')  )
        } catch(err){
          photosok = false;
        }
      })
      if (photosok){
        res.send(response[0]); //Se envia la respuesta al request.
      } else {
        Response.code='API_MESSAGE'
        Response.message='Error al transferir las fotos'
        res.send(Response);
      }

    } catch (err) {
      console.log(err)
      console.log('error1');
    }
  }).catch(function(err) {
    console.log('error2');
  });
});

app.post('/api/photo/stock', uploads.array('photo1', 4), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  console.log(req.files); //form files
  Response.data = req.files[0];
  Response.message = "File uploaded correctly";
  Response.code = "API_MESSAGE";
  Response.success = true;
  res.end(JSON.stringify(Response));
})
app.post('/api/photo', multer({ dest: './uploads/'}).single('iphoto'), function(req,res){
  console.log(req.body); //form fields

  console.log(req.file); //form files
  Response.data = req.file;
  Response.message = "File uploaded correctly";
  Response.code = "API_MESSAGE";
  Response.success = true;
  res.end(JSON.stringify(Response));
});

app.get('/bundle.js', function(req, res) {
  res.sendFile('./js/bundle.js');
});
app.get('/*', function(req, res) {
  res.sendFile('/home/carlos/adsigo-react/build/index.html');
});
//Crea el método de inicio de sesión.
app.post('/api/cities', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var p = JSON.parse(req.body.params);
  //  p.in_ip_user_host = ip;
  _.appcity = p;
  console.log(_.appcity)
  var procedureCall = apiUtil.getJsonquery(_.appcity);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/typestock', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var procedureCall = apiUtil.getJsonquery(_.appgettypestock);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      console.log(response)
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
      console.log(err)
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/countries', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var procedureCall = apiUtil.getJsonquery(_.appcountry);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  })
});
//Crea el método de inicio de sesión.
app.post('/api/register', function(req, res) {
  //Se procesan las cabeceras donde llega el nombre de ususario y password.
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log("name-> " + req);

  // console.log("password-> " + stringify(req.body.password));
  //Se asignan los parámetros del Procedimiento del Inicio de Sesión.

  var p = JSON.parse(req.body.params);
  console.log(p)
  p.in_ip_user_host = ip;
  p.in_user_token = '';
  var photo = JSON.parse(p.in_user_photo)
  p.in_user_photo = photo.data.originalname
  var fileExtension = String(p.in_user_photo).slice(-4);
p.in_user_photo = p.in_identification+''+fileExtension

  _.appregistro = p;

  var context = this;
  var procedureCall = apiUtil.getJsonquery(_.appregistro);
  //console.log(procedureCall);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.
    try {
      fs.rename("./"+photo.data.path, './uploads/../img/photo_user/'+p.in_identification+''+fileExtension)
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  }).catch(function(err) {
    console.log('error2');
  });
});
//Crea el método de inicio de sesión.
app.post('/api/login', function(req, res) {
  //Se procesan las cabeceras donde llega el nombre de ususario y password.
  console.log('/api/login')
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log("name-> " + req);

  // console.log("password-> " + stringify(req.body.password));
  //Se asignan los parámetros del Procedimiento del Inicio de Sesión.
  var p = JSON.parse(req.body.params);
  _.applogin = p;

  var context = this;
  var procedureCall = apiUtil.getJsonquery(_.applogin);

  console.log(procedureCall);
  //Se invoca el promice local para llamada al Procedimiento almacenado.
  callFunction(procedureCall).then(function(response) {
    //Se procesa la respuesta que se envia al cliente.ç
    console.log(response)
    try {
      res.send(response[0]); //Se envia la respuesta al request.
    } catch (err) {
      console.log('error1');
    }
  }).catch(function(err) {
    console.log('error2');
  });
});

/**
* Función que invoca la llamada al Funcion de la clase callFunction.JS
* @param procedureCall. Modelo JSON del PRocedimiento invocado por el cliente.
*/
function callFunction(procedureCall) {
  return new Promises(function(fullfill, reject) {
    var pc;
    if (typeof procedureCall == 'string') {
      pc = procedureCall;
    } else {
      console.log('json');
      pc = JSON.stringify(procedureCall);
    }
    var target;
    try {
      target = procedureCall.target; //Obtiene el target.
    } catch (err) {
    }

    const cp = require('child_process');
    const n = cp.fork(`${__dirname}/CallFunction.js`);
    var timeout = setTimeout(function() {
      console.log('timeout')
      //  n.send({ statement: 'kill' });
      n.kill('SIGHUP');
      console.log('consulta pesada ' + target);

      var Response = require('./model/Response');

      // Se establece el mensaje de error en la respuesta
      Response.data = null;
      Response.message = "Tiempo de espera terminado";
      Response.code = "API_MESSAGE";
      Response.success = false;
      clearTimeout(timeout);
      fullfill([JSON.stringify(Response), target]);
      reject([JSON.stringify(Response), target]);
    }, 9000);

    n.on('message', (m) => {
      var Response = require('./model/Response');
      var resp;
      if (typeof procedureCall == 'string') {
        console.log('string');
        resp = m.response;
      } else {
        console.log('json');
        resp = m.response;
      }

      //  console.log(response.cursor)
      try{
        Response.data = resp[1];
      }catch(err){}

      var testResponse = resp[0];
      var success = false;
      success = testResponse.app[1] === 't' ? true : false;
      Response.success =success
      if (!success) {
        Response.data = [];
        Response.message = testResponse.app.split(',')[1];
        Response.code = "API_MESSAGE";
      } else if (success){
        Response.id = testResponse.app.split(',')[2];
        Response.message = testResponse.app.split(',')[1];
        Response.code = "API_SUCCESS";
      }
      clearTimeout(timeout);
      n.kill('SIGHUP');
      fullfill([Response, target]);
    });
    n.send({
      statement: procedureCall
    });
  });
}

server.listen(8080);
console.log('api server is up on port 8080');
