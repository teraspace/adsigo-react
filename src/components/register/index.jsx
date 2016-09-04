import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket';

var that;
var uploadPhoto;
var hostaddress;
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: '',
      countries: [],
      cities: []
    };
    this.selectCountry = this.selectCountry.bind(this)
    hostaddress = x.globals.hostaddress
  }
  componentWillMount(){
    fetch(hostaddress+'/api/countries',{method: 'POST'})
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
      //this.setPhotoListener('iphoto')
      $.uploadPreview({
          input_field: '#iphoto',   // Default: .image-upload
          preview_box: "#image"+1,  // Default: .image-preview
          label_field: "#image-label"+1,    // Default: .image-label
          label_default: "Choose File",   // Default: Choose File
          label_selected: "Change File",  // Default: Change File
          no_label: false                 // Default: false
        });
    $('#iphoto').change(function() {
      $('#iphoto').simpleUpload(hostaddress+'/api/photo',{
        allowedExts: ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi", "png", "gif"],
        allowedTypes: ["image/pjpeg", "image/jpeg", "image/png", "image/x-png", "image/gif", "image/x-gif"],
        maxFileSize: 5000000, //5MB in bytes
        success: function(data){

          uploadPhoto = JSON.parse(data);
          document.getElementById('fileInfo').innerHTML = uploadPhoto.data.path
          //document.getElementById("previewPhoto").src = x.globals.hostaddress+ "/"+uploadPhoto.data.path
        },
        error: function(error){
          console.log(error)
        }
      } );
    });

  }
  render () {
    that = this;
    var optionCountries = [];
    var countries = this.state.countries;
    try {
      optionCountries.push(<option  key={"Cx"}  value="0" className="hide-me">Select Country</option>);
      countries.forEach(function(country, index){
        optionCountries.push(<option key={"C"+index} value={country.id_iso} className="hide-me">{country.description}</option>);
      })
    }catch(err){}

    var optionCities = [];
    var cities = this.state.cities;
    try {
      optionCities.push(<option key={'cityx'}  value="0" className="hide-me">Select City</option>);
      cities.forEach(function(city, index){
        optionCities.push(<option key={'city'+index} value={city.id_city} className="hide-me">{city.name}</option>);
      })
    }catch(err){}


    return <main id="main" role="main">
      <Header />
      <div className="main-holder">
        <div className="quote-box">
          <blockquote>
            <q>“I’m a company and I want to buy advertisement spaces.”</q>
          </blockquote>
          <span className="note-text">Great! Please fill out this <span>tiny</span> form.</span>
        </div>

        <form action=""  className="space-form login" >
          <input type="hidden" name="_token" value="XdSbSFqvWzoY1bcBPpsS7EUnlLrPnrof6zxHWcfl" />
          <fieldset>
            <ol className="login-steps">
              <li>
                <div className="info-title">
                  <span>About the Company</span>
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide js-slide-hidden">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="typeIdentification">Tipo de Identificacion:</label>
                  </div>
                  <select  className="required-select login-form" id="typeIdentification" name="typeIdentification" required >
                    <option value="0" className="hide-me">Select Type Identify</option>
                    <option value="C.C">C.C</option>
                    <option value="T.I">T.I</option>
                    <option value="NIT">NIT</option>
                  </select>
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="identification">Numero de Identificacion:</label>
                  </div>
                  <input maxLength={20} className="required" type="text" placeholder="Numero de Identifiacion" id="identification" name="identification" required />
                </div>
                <div className="row required-row">
                  <div style={{marginLeft:'170px'}} className="image-container" id="image1">
                    <label htmlFor="image-upload" id="image-label1">Choose File</label>
                    <input type="file" name="iphoto" id="iphoto" />
                    <span id="fileInfo"></span>
                  </div>

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="firstName">Name:</label>
                  </div>
                  <input  maxLength={50} className="required" type="text"  id="nameuser" name="name"  required />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="lastNane">Company Name:</label>
                  </div>
                  <input maxLength={100}  className="required" type="text"  id="namecompany" name="namecompany"  />
                </div>


                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="selectCountry">Country of Resident:</label>
                  </div>
                  <select key={12} onChange={this.selectCountry} className="required-select login-form" id="selectCountry"   name="selectCountry" required >
                    {optionCountries}
                  </select>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="selectCity">City of Resident:</label>
                  </div>
                  <select className="required-select login-form" id="selectCity" name="selectCity" required >
                    {optionCities}
                  </select>
                </div>


                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="address">Address:</label>
                  </div>
                  <input maxLength={200}   className="required" type="text" placeholder="Address" id="address" name="address"  />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="phone">Phone:</label>
                  </div>
                  <input maxLength={20}   className="required" type="tel" placeholder="321 592 53 55" id="phone" name="phone"  />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide js-slide-hidden">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>
                  </div>
                </div>


              </li>

              <li className="gray">
                <div className="info-title">
                  <span>About the Login</span>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="email1">e-mail</label>
                  </div>
                  <input maxLength={100}  name="email" className="required" type="mail" placeholder="myname@myemail.com" id="mail" />
                  <div className="question-holder">
                    <a href="#">[?]</a>
                    <div className="question-slide js-slide-hidden">
                      <div className="slide-holder">
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="password">Password:</label>
                  </div>
                  <input maxLength={50} name="pass" id="pass" className="required eq" type="password" placeholder="***********" />
                  <input maxLength={50} name="pass_confirmation" id="pass_confirmation" className="required eq" type="password" placeholder="Confirm Password"  />
                </div>
              </li>
            </ol>
            <div className="terms-conditions">
              <span> By clicking the “Sign Up” Button you agree to our <a href="#">Terms and Conditions</a> and our <a href="#">Privacy Policy</a>.</span>
            </div>
            <button id="enviar" type="button" onClick={this.register} className="btn-sign-up"><span>SIGN UP</span></button>
            <strong className="bottom-text">...and welcome to the family!</strong>
          </fieldset>
        </form>
      </div>
    </main>
  }

  register() {
    console.log('register')
    var that = this;
    var path,fileName;
    try {
      path = document.getElementById("iphoto").value
      fileName = JSON.stringify(uploadPhoto)
    }catch(err){

}

    var payload = JSON.stringify({
      in_user_token:'',
      in_identification: document.getElementById('identification').value,
      in_name:  $('#nameuser').val(),
      in_name_company: $('#namecompany').val(),
      in_user_photo:  fileName,
      in_phone:  document.getElementById('phone').value,
      in_address:  document.getElementById('address').value,
      in_email:  document.getElementById('mail').value,
      in_password:  document.getElementById('pass').value,
      in_type_identification:  document.getElementById('typeIdentification').value,
      in_id_country:  document.getElementById('selectCountry').value,
      in_id_city:  document.getElementById('selectCity').value,
      in_ip_user_host: ''
    });
    if(!validar(payload)) {
      return;
    }
    console.log('register');
    console.log('onLoginClick');    var _token;

    fetch(hostaddress + '/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }).then((response) => {
      return response.json();
    }).then((session) => {
      console.log(session);
      //localStorage.setItem('session',JSON.stringify(session.data));
      if (!session.success && session.code=='API_MESSAGE'){
        $('#modalContainer').on('show.bs.modal', function (e) {
          $('#noButton').hide();
          $('#modalTitle').text('Atención');
          $('#modalBody').text(session.message);
          $('#yesButton').text('Aceptar').click(function(e){
            console.log(e)
            $('#modalContainer').modal('hide');
            //  window.location="http://adsigo.teraspace.co:8080"
          })
        }).modal({
          keyboard: false,
          backdrop: 'static'
        });
      } else if (session.success){
        $('#modalContainer').on('show.bs.modal', function (e) {
          $('#noButton').hide();
          $('#modalTitle').text('Felicitaciones');
          $('#modalBody').text('Binvenido a Adverspace');
          $('#yesButton').text('Aceptar').click(function(e){
            console.log(e)
            $('#modalContainer').modal('hide');
            window.location="http://adsigo.teraspace.co:8080"
          })
        }).modal({
          keyboard: false,
          backdrop: 'static'
        });

      }
    });
  }
  selectCountry (){
    var _context = this;
    var x = document.getElementById("selectCountry").value;
    var payload = JSON.stringify({in_country: x});
    fetch(hostaddress+'/api/cities' ,
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
      $('#'+htmlElement).simpleUpload(hostaddress+'/api/photo/stock',{
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

  if(_data.in_type_identification=="0"){
    alert('Debe seleccionar tipo de identificacion')
    ok = false;
  } else
  if(_data.in_user_photo==null){
    alert('Debe seleccionar una foto')
    ok = false;
  } else
  if(_data.in_identification==""){
    alert('Debe escribir su idetificación')
    ok = false;
  } else
  if(_data.in_first_name==""){
    alert('Escriba su nombre')
    ok = false;
  } else
  if(_data.in_last_name==""){
    alert('Escriba su apellido')
    ok = false;
  }
  else
  if(_data.in_address==""){
    alert('Escriba su direccion')
    ok = false;
  }  else
  if(_data.in_phone==""){
    alert('Escriba su direccion')
    ok = false;
  } else
  if(_data.in_email=="" || !String(_data.in_email).includes('@')){
    alert('Escriba su direccion de correo')
    ok = false;
  }else
  if(_data.in_password=="" || _data.in_password!=document.getElementById('pass_confirmation').value){
    alert('Escriba su password y confirme')
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
