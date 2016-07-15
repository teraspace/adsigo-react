import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI'

var that;
var uploadPhoto = [];
export default class RegisterStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session')),
      countries: [],
      cities: [],
      typeStock: []
    };
    this.selectCountry = this.selectCountry.bind(this)

  }
  componentWillMount(){
    fetch(_.globals.hostaddress+'/api/typestock',{method: 'POST'})
    .then((response) => {
      return response.json()
    })
    .then((typeStock) => {
      this.setState({  typeStock: typeStock.data })
    })
    fetch(_.globals.hostaddress+'/api/countries',{method: 'POST'})
    .then((response) => {
      return response.json()
    })
    .then((countries) => {
      this.setState({  countries: countries.data })
    })

  }

  componentDidMount (){
    var evt = document.createEvent('Event');
    evt.initEvent('load', false, false);
    window.dispatchEvent(evt);

    this.setPhotoListener('photo1')
    this.setPhotoListener('photo2')
    this.setPhotoListener('photo3')
    this.setPhotoListener('photo4')
  }
  render() {
    that = this;
    var optionCountries = [];
    var countries = this.state.countries;
    try {
      optionCountries.push(<option key="countriesn" className="hide-me">Select Country</option>);
      countries.forEach(function(country, index){
        optionCountries.push(<option key={'countries'+index} value={country.id_iso} className="hide-me">{country.description}</option>);
      })
    }catch(err){}

    var optionCities = [];
    var cities = this.state.cities;
    try {
      optionCities.push(<option key="citiesn" className="hide-me">Select City</option>);
      cities.forEach(function(city, index){
        optionCities.push(<option key={'cities'+index} value={city.id_city} className="hide-me">{city.name}</option>);
      })
    }catch(err){}
    var optionTypeStock = [];
    var typestock = this.state.typeStock;
    try {
      optionTypeStock.push(<option key="ts" className="hide-me">Select Type Stock</option>);
      typestock.forEach(function(ts, index){
        optionTypeStock.push(<option key={'ts'+index} value={ts.id_type_stock} className="hide-me">{ts.name}</option>);
      })
    }catch(err){}
    return      <main id="main" className="register-stock" role="main">
      <Header />
      <div id="content">
        <div className="content-holder">
          <h1><img src="./images/ico1.png" height="34" width="32" alt="image description" />Mis Espacios</h1>
          <div action="#" className="space-form validate-form">
            <fieldset>
              <h2><span>Agregar Nuevo Espacio</span></h2>
              <div className="hold">
                <h3>1. Información Comercial del Espacio:</h3>
                <a href="#" className="link">Muchos Espacios? Déjanos agregarlos por tí!</a>
              </div>
              <div className="gray-holder">
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="name">Nombre del Espacio Publicitario</label>
                  </div>
                  <input className="required" type="text" placeholder="Input" name="name" id="name" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="description">Descripción del Espacio</label>
                  </div>
                  <input className="required" type="text" placeholder="Input" name="description" id="description" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="select1">Pais</label>
                  </div>
                  <select className="required-select"  key={"sc1"} onChange={this.selectCountry} id="selectCountry1"   name="selectCountry1" required >
                    {optionCountries}
                  </select>
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="select2">Ciudad</label>
                  </div>
                  <select className="required-select" id="selectCity" name="selectCity">
                    {optionCities}
                  </select>
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="address">Direcciôn del Espacio Publicitéгіо</label>
                  </div>
                  <input className="required" type="text" placeholder="Input" name="address" id="address" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="googlemaps">Link googlemaps</label>
                  </div>
                  <input className="required" type="text" placeholder="Input Url" name="googlemaps" id="googlemaps" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="file1" className="row required-row">
                  <div className="label-holder">
                    <label For="photo1">Foto 1</label>
                  </div>
                  <input align="right" className="required-select login-form" type="file" name="photo1" id="photo1" data-jcf='{"buttonText": "Adjuntar", "placeholderText": ""}' />
                  <span id="photo1_fileInfo"></span>
                  <img heigth="50px" id="photo1_previewPhoto" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="foto2">Foto 2</label>
                  </div>
                  <input align="right" className="required-select login-form" type="file" name="photo1" id="photo2" data-jcf='{"buttonText": "Adjuntar", "placeholderText": ""}' />
                  <span id="photo2_fileInfo"></span>
                  <img heigth="50px" id="photo2_previewPhoto" />            								<div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="foto3">Foto 3</label>
                  </div>
                  <input align="right" className="required-select login-form" type="file" name="photo1"  id="photo3" data-jcf='{"buttonText": "Adjuntar", "placeholderText": ""}' />
                  <span id="photo3_fileInfo"></span>
                  <img heigth="50px" id="photo3_previewPhoto" />          								<div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="photo4">Foto 4</label>
                  </div>
                  <input align="right" className="required-select login-form" type="file" name="photo1"  id="photo4" data-jcf='{"buttonText": "Adjuntar", "placeholderText": ""}' />
                  <span id="photo4_fileInfo"></span>
                  <img heigth="50px" id="photo4_previewPhoto" />
                    <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="priceMonthly">Рreсіо рог Mes</label>
                  </div>
                  <input className="required-number" type="number" placeholder="Input Number " name="priceMonthly" id="priceMonthly" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="princeDaily">Ргесіо рог Dia</label>
                  </div>
                  <input className="required" type="number" placeholder="Input Url" id="princeDaily" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="productionPrice">Ргесіо рог Impresiôn</label>
                  </div>
                  <input className="required" type="number" placeholder="Precio por impresión" id="productionPrice" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label For="visualImpact">Impacto visual por día</label>
                  </div>
                  <input className="required" type="number" placeholder="Impacto visual por día" name="visualImpact" id="visualImpact" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label For="publicTarget">Estrato targets</label>
                  </div>
                  <select className="required-select" id="publicTarget" name="publicTarget">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                  </select>
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <h3>2. Información Técnica del Espacio:</h3>
              <div className="gray-holder">
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="stockSize">Tamaño Visual de Pufalicidad (cm)</label>
                  </div>
                  <input className="required" type="number" placeholder="Input" id="stockSize" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label For="typeSpace">Tipo de Espscio Publicitario</label>
                  </div>
                  <select className="required-select" id="typeSpace">
                    {optionTypeStock}
                  </select>
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="label-holder">
                    <label For="lightning">Iluminación Nocturna</label>
                  </div>
                  <input type="checkbox" id="lightning" />
                </div>
                <div className="row">
                  <div className="label-holder">
                    <label For="hotSpot">Hotspot</label>
                  </div>
                  <input type="checkbox" id="hotSpot" />
                </div>
                <div className="row">
                  <div className="label-holder">
                    <label For="mainRoad">Main Road</label>
                  </div>
                  <input type="checkbox" id="mainRoad" />
                </div>
              </div>
              <input onClick={that.register} type="submit" value="Guardar" />
            </fieldset>
          </div>
        </div>
      </div>
      <aside id="sidebar">
        <nav className="side-nav">
          <ul>
            <li><a href="#">Mis Ordenes<span className="number">3</span></a></li>
            <li>
              <a href="#">Mis Espacios</a>
              <ul>
                <li><a href="#">Espacios Indoor</a></li>
                <li><a href="#">Espacios Outdoor</a></li>
                <li><a href="#">Agregar Espacio</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Reportes</a>
              <ul>
                <li><a href="#">Reportes Indoor</a></li>
                <li><a href="#">Reportes Outdoor</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Disponibilidad</a>
              <ul>
                <li><a href="#">Disponibilidad Indoor</a></li>
                <li><a href="#">Disponibilidad Outdoor</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </main>;

  }

  register() {
    console.log('register')

    var path,fileName = [], photoFiles = [], count=4,_photo;

    for (var i=1;i<=count;i++){
      _photo = document.getElementById(String('photo' + i + '_fileInfo')).innerHTML
      if(_photo.toString().length>10){
          photoFiles.push(_photo)
      }
    }
    var payload = JSON.stringify({
      in_user_token:that.state.session.v_user_token,
      in_id_stock: 0,
      in_name:  document.getElementById('name').value,
      in_description:  document.getElementById('description').value,
      in_id_country:  document.getElementById("selectCountry1").value,
      in_id_city: document.getElementById("selectCity").value,
      in_address:  document.getElementById('address').value,
      in_googlemaps:  document.getElementById('googlemaps').value,
      in_availability:  'S',
      in_size:  (document.getElementById('stockSize').value),
      in_target:   parseInt(document.getElementById("publicTarget").value),
      in_impact: parseInt(document.getElementById("visualImpact").value),
      in_lighting:  document.getElementById('lightning').checked == true ? 'S' : 'N',
      in_hotspot:  document.getElementById('hotSpot').checked == true ? 'S' : 'N',
      in_main_road: document.getElementById('mainRoad').checked == true ? 'S' : 'N',
      in_fk_id_type_stock:  document.getElementById("typeSpace").value,
      in_fk_id_user:  that.state.session.id_user,
      in_user_photos: photoFiles,
      in_daily_price:  parseInt(document.getElementById('princeDaily').value),
      in_production_price:  parseInt(document.getElementById('productionPrice').value),
      in_ip_user_host: ''
    });
//console.log(payload)
    if(!validar(payload)) {
      return;
    }
    console.log('register');
    console.log('onLoginClick');    var _token;

    fetch(_.globals.hostaddress + '/api/register-stock', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }).then((response) => {
      return response.json();
    }).then((session) => {
    //  console.log(session);
      //localStorage.setItem('session',JSON.stringify(session.data));

      $('#modalContainer').on('show.bs.modal', function (e) {
        $('#noButton').hide();
        $('#modalTitle').text('Felicitaciones');
        $('#modalBody').text(session.message);
        $('#yesButton').text('Aceptar').click(function(e){
          console.log(e)
          $('#modalContainer').modal('hide');
        if(session.success) window.location="http://adsigo.teraspace.co:8080"
        })
      }).modal({
        keyboard: false,
        backdrop: 'static'
      });


    });
  }
  selectCountry (){
    var _context = this;
    var x = document.getElementById("selectCountry1").value;
    var payload = JSON.stringify({in_country: x});
    fetch( _.globals.hostaddress + '/api/cities' ,
    {   method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }).then((response) => {
      return response.json()
    }).then((cities) => {
      _context.setState({  cities: cities.data })
    })
  }

  setPhotoListener (htmlElement) {

    var idphoto = htmlElement.slice(-1);
    $('#'+htmlElement).change(function() {
      console.log(this.value)
      var that = this
      $('#'+htmlElement).simpleUpload( _.globals.hostaddress +'/api/photo/stock',{
        allowedExts: ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi", "png", "gif"],
        allowedTypes: ["image/pjpeg", "image/jpeg", "image/png", "image/x-png", "image/gif", "image/x-gif"],
        maxFileSize: 5000000, //5MB in bytes
        fields : {
          idphoto: htmlElement
        },
        success: function(data){

          var originalname = JSON.parse(data).data.originalname
          uploadPhoto [idphoto] = JSON.stringify(data);
          document.getElementById(htmlElement+'_fileInfo').innerHTML = data
          $('#file'+idphoto+'>span>span:first-child').text(originalname)
        },
        error: function(error){
          console.log(error)
        }
      } );
    });
  }

}
function validar (data){
  var _data = JSON.parse(data);
  var ok = true;
  if(_data.in_user_token.length<=5){
    alert('Debe estar logueado')
    ok = false;
  } else
  if(_data.in_id_stock!=0){
    alert('Este formulario solo es para inserción.')
    ok = false;
  } else
  if(_data.in_name.length<=5){
    alert('Debe escribir un nombre conciso.')
    ok = false;
  } else
  if(_data.in_description.length<=10){
    alert('Debe escribir una descripción concisa.')
    ok = false;
  } else
  if(_data.in_id_country.length>2){
    alert('Debe seleccionar un país.')
    ok = false;
  }
  else
  if(_data.in_id_city.length>6){
    alert('Debe seleccionar una ciudad.')
    ok = false;
  }
  else
  if(_data.in_address.length<=10){
    alert('Escriba la direccion')
    ok = false;
  }  else
  if(_data.in_googlemaps<=5){
    alert('Escriba la url de ubicación geografica.')
    ok = false;
  } else
  if(_data.in_user_photos.length<=0){
    alert('Debe seleccionar al menos una foto')
    ok = false;
  } else
  if(isNaN(_data.in_daily_price) || _data.in_daily_price<=0 ){
    alert('Debe escribir el tamaño.')
    ok = false;
  } else
  if(_data.in_availability<1 || _data.in_availability!='S'){
    alert('Debe estar disponible por defecto..')
    ok = false;
  } else
  if(isNaN(_data.in_size) || _data.in_size<=0 ){
    alert('Debe escribir el tamaño.')
    ok = false;
  } else
  if(_data.in_target<1 || _data.in_target<=0){
    alert('Debe seleccionar public Target.')
    ok = false;
  } else
  if(_data.in_impact<1 || isNaN(_data.in_impact)){
    alert('Debe escribir el impacto')
    ok = false;
  } else
  if(isNaN(_data.in_production_price) || _data.in_production_price<=0 ){
    alert('Debe escribir precio de impresion.')
    ok = false;
  }
  return ok
}
function chageIcon(domImg,srcImage)
{
  var img = new Image();
  img.onload = function()
  {
    // Load completed
    domImg.src = this.src;
  };
  img.src = srcImage;
}
