import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket';

import SideMenu from '../side-menu'
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
    this.selectCity = this.selectCity.bind(this)

  }
  componentWillMount(){
    fetch(x.globals.hostaddress+'/api/typestock',{method: 'POST'})
    .then((response) => {
      return response.json()
    })
    .then((typeStock) => {
      this.setState({  typeStock: typeStock.data })
    })
    fetch(x.globals.hostaddress+'/api/countries',{method: 'POST'})
    .then((response) => {
      return response.json()
    })
    .then((countries) => {
      this.setState({  countries: countries.data })
    })

  }
  componendDidUpdate () {
  console.log('componendDidUpdate')
}
  componentDidMount (){
     myload()
     $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          geocodeAddress();
          return false;
        }
      });
    this.setPhotoListener('photo1')
    this.setPhotoListener('photo2')
    this.setPhotoListener('photo3')
    this.setPhotoListener('photo4')
    this.setPhotoListener('photo5')
    $("#registerStockForm").validate();
    //document.getElementById('selectCountry1').selectedIndex = "1";
    this.selectCountry()
init_map_register();
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
        optionCities.push(<option key={'cities'+index} value={city.id_city+","+city.name} className="hide-me">{city.name}</option>);
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
          <form action="#" id="registerStockForm" className="space-form validate-form">
            <fieldset>
              <h2><span>Agregar Nuevo Espacio</span></h2>
              <div className="hold">
                <h3>1. Información Comercial del Espacio:</h3>
                <a href="#" className="link">Muchos Espacios? Déjanos agregarlos por tí!</a>
              </div>
              <div className="gray-holder">
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="name">Nombre de la valla</label>
                  </div>
                  <input className="required"  minLength="2" type="text" placeholder="Input" name="name" id="name" required />
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
                    <label htmlFor="typeSpace">Tipo de Valla</label>
                  </div>
                  <select className="required-select" id="typeSpace" required>
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
                <div style={{display: 'none'}} className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="description">Descripción del Espacio</label>
                  </div>
                  <input maxLength="20" minLength="10" className="required" type="text" placeholder="Input" name="description" id="description" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{display: 'none'}}  className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="select1">Pais</label>
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
                    <label htmlFor="select2">Ciudad</label>
                  </div>
                  <select onChange={this.selectCity} className="required-select" id="selectCity1" name="selectCity1" required>
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
                    <label htmlFor="princeDaily">Ргесіо рог Dia</label>
                  </div>
                  <input minLength="3" className="required" type="number" placeholder="Input Url" id="princeDaily" />
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
                    <label htmlFor="productionPrice">Ргесіо рог Impresiôn</label>
                  </div>
                  <input  className="required" type="number" placeholder="Precio por impresión" id="productionPrice" />
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
                    <label htmlFor="stockSize">Alto (cm)</label>
                  </div>
                  <input className="required" type="number" placeholder="Input" id="stockSize" required />
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
                    <label htmlFor="stockSize">Ancho (cm)</label>
                  </div>
                  <input className="required" type="number" placeholder="Input" id="stockSize" required />
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
                    <label htmlFor="address">Dirección</label>
                  </div>
                  <input minLength="10" className="required" type="text" placeholder="Input" name="address" id="address" required />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>






                <div style={{display: "none"}} className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="priceMonthly">Рreсіо рог Mes</label>
                  </div>
                  <input minLength="3" className="required-number" type="number" placeholder="Input Number " name="priceMonthly" id="priceMonthly" required />
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
              <h3>2. Select photos for billboard</h3>
              <div className="gray-holder">
                <div style={{ display:'inline', width:'100%'}} id="uploadGallery" className="row required-row">
                  <div className="image-container" id="image1">
                    <label htmlFor="image-upload" id="image-label1">Choose File</label>
                    <input type="file" name="photo1" id="photo1" />
                    <span id="photo1_fileInfo"></span>
                  </div>
                  <div className="image-container" id="image2">
                    <label htmlFor="image-upload" id="image-label2">Choose File</label>
                    <input type="file" name="photo1" id="photo2" />
                    <span id="photo2_fileInfo"></span>
                  </div>
                  <div className="image-container" id="image3">
                    <label htmlFor="image-upload" id="image-label3">Choose File</label>
                    <input type="file" name="photo1" id="photo3" />
                    <span id="photo3_fileInfo"></span>
                  </div>
                  <div className="image-container" id="image4">
                    <label htmlFor="image-upload" id="image-label4">Choose File</label>
                    <input type="file" name="photo1" id="photo4" />
                    <span id="photo4_fileInfo"></span>
                  </div>
                  <div className="image-container" id="image5">
                    <label htmlFor="image-upload" id="image-label5">Choose File</label>
                    <input type="file" name="photo1" id="photo5" />
                    <span  id="photo5_fileInfo"></span>
                  </div>
                </div>
              </div>
              <h3>3. Seleccione ubicación Google Maps</h3>
              <div className="gray-holder">
                <div className="row required-row">
                  <input type="text" id="mapsearch"  />
                  <div id="detailmap" style={{height: "320px", width: "100%"}}></div>

                  <input  minLength="5" className="required" type="hidden" placeholder="Input Url" name="googlemaps" id="googlemaps" required />
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
              <h3>4. Información Técnica del Espacio:</h3>
              <div className="gray-holder">

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="visualImpact">Impacto visual por día</label>
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
                    <label htmlFor="publicTarget">Estrato targets</label>
                  </div>
                  <select className="required-select" id="publicTarget" name="publicTarget" required>
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


                <div className="row">
                  <div className="label-holder">
                    <label htmlFor="lightning">Iluminación Nocturna</label>
                  </div>
                  <input type="checkbox" id="lightning"  />
                </div>
                <div className="row">
                  <div className="label-holder">
                    <label htmlFor="hotSpot">Hotspot</label>
                  </div>
                  <input type="checkbox" id="hotSpot" />
                </div>
                <div className="row">
                  <div className="label-holder">
                    <label htmlFor="mainRoad">Main Road</label>
                  </div>
                  <input type="checkbox" id="mainRoad" />
                </div>
              </div>
              <input onClick={that.register} type="submit" value="Guardar" />
            </fieldset>
          </form>
        </div>
      </div>
        <SideMenu />;
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
document.getElementById("selectCountry1").value = 'CO' //Solo Colombia en MVP
 document.getElementById('description').value = 'No description' // Sin description en MVP

    var payload = JSON.stringify({
      in_user_token:that.state.session.v_user_token,
      in_id_stock: 0,
      in_name:  document.getElementById('name').value,
      in_description:  document.getElementById('description').value,
      in_id_country:  document.getElementById("selectCountry1").value,
      in_id_city: document.getElementById("selectCity1").value.split(',')[0],
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
    if(!validar(payload)) {
      return;
    }
    console.log('register');
    console.log('onLoginClick');    var _token;

    fetch(x.globals.hostaddress + '/api/register-stock', {
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
  selectCity () {
    console.log( document.getElementById("selectCity1").value.split(',')[1])
    var _context = this;

    geocodeAddress();

  }
  selectCountry (){
    var _context = this;
    var x = document.getElementById("selectCountry1").value;
//Se quema CO para uso solo en Colombia sin restar.. El codigo queda para el futuro.
    var payload = JSON.stringify({in_country: 'CO'});
    fetch( x.globals.hostaddress + '/api/cities' ,
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
    $.uploadPreview({
        input_field: "#"+htmlElement,   // Default: .image-upload
        preview_box: "#image"+idphoto,  // Default: .image-preview
        label_field: "#image-label"+idphoto,    // Default: .image-label
        label_default: "Choose File",   // Default: Choose File
        label_selected: "Change File",  // Default: Change File
        no_label: false                 // Default: false
      });
    $('#'+htmlElement).change(function() {
      console.log(this.value)
      var that = this
      $('#'+htmlElement).simpleUpload( x.globals.hostaddress +'/api/photo/stock',{
        allowedExts: ["jpg", "jpeg", "jpe", "png"],
        allowedTypes: ["image/pjpeg", "image/jpeg", "image/png", "image/x-png"],
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
  // if(_data.in_description.length<=10){
  //   alert('Debe escribir una descripción concisa.')
  //   ok = false;
  // } else
  // if(_data.in_id_country.length>2){
  //   alert('Debe seleccionar un país.')
  //   ok = false;
  // }
  // else
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
