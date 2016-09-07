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
      countries: null,
      cities: []
    };
    this.selectCountry = this.selectCountry.bind(this)
    this.login = this.login.bind(this)

    hostaddress = x.globals.hostaddress
  that = this;
  }
  componentWillMount(){
    this.loadCountries()

  }
  componentDidMount (){

    this.setPhotoListener()
$("#registerUserForm").validate();
    myload()
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
    }catch(err){
      console.log(err)
    }

    var optionCities = [];
    var cities = this.state.cities;
    try {
      optionCities.push(<option key={'cityx'}  value="0" className="hide-me">Select City</option>);
      cities.forEach(function(city, index){
        optionCities.push(<option key={'city'+index} value={city.id_city} className="hide-me">{city.name}</option>);
      })
    }catch(err){
      console.log(err)
    }


    return <main id="main" role="main">
      <Header />
      <div className="main-holder">
        <div className="quote-box">
          <blockquote>
            <q>“I’m a company and I want to buy advertisement spaces.”</q>
          </blockquote>
        </div>

        <form action="" id="registerUserForm"  className="space-form login validate-form" >
          <input type="hidden" name="_token" value="XdSbSFqvWzoY1bcBPpsS7EUnlLrPnrof6zxHWcfl" />
          <fieldset>
            <ol className="login-steps">
              <li>
                <div className="info-title">
                  <span>About the Company</span>
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="typeIdentification">Identification type:</label>
                  </div>
                  <select  className="required-select required login-form" id="typeIdentification" name="typeIdentification" required >
                    <option value="0" className="hide-me">Select Type:</option>
                    <option value="C.C">C.C</option>
                    <option value="NIT">NIT</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="identification">Identification number:</label>
                  </div>
                  <input minLength={3} maxLength={20} className="required" type="text" placeholder="" id="identification" name="identification" required />
                </div>
                <div className="row required-row">
                  <div style={{marginLeft:'170px'}} className="image-container" id="image1">
                    <input type="file" name="iphoto" id="iphoto" />
                      <label htmlFor="image-upload" id="image-label1">Choose File</label>

                    <span id="fileInfo"></span>
                  </div>

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="firstName">Name:</label>
                  </div>
                  <input minLength={3}  maxLength={50} className="required" type="text"  id="nameuser" name="name"  required />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="lastNane">Company Name:</label>
                  </div>
                  <input minLength={3} maxLength={100}  className="required" type="text"  id="namecompany" name="namecompany"  />
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
                  <input minLength={3} maxLength={200}   className="required" type="text" placeholder="" id="address" name="address"  />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="phone">Phone:</label>
                  </div>
                  <input minLength={3} maxLength={20}   className="required" type="tel" placeholder="" id="phone" name="phone"  />
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
                  <input minLength={5} maxLength={100}  name="email" className="required" type="mail" placeholder="" id="mail" />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="password">Password:</label>
                  </div>
                  <input minLength={5} maxLength={50} name="pass" id="pass" className="required eq" type="password" placeholder="Password" />
                  <input minLength={5} maxLength={50} name="pass_confirmation" id="pass_confirmation" className="required eq" type="password" placeholder="Confirm Password"  />
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
    var path,fileName;
    try {
      path = document.getElementById("iphoto").value
      fileName = JSON.stringify(uploadPhoto)
    }catch(err){}

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
          $('#modalTitle').text('Warning');
          $('#modalBody').text(session.message);
          $('#yesButton').text('Accept').click(function(e){
            console.log(e)
            $('#modalContainer').modal('hide');
          })
        }).modal({
          keyboard: false,
          backdrop: 'static'
        });
      } else if (session.success){
        $('#modalContainer').on('show.bs.modal', function (e) {
          $('#noButton').hide();
          $('#modalTitle').text('Congratulations');
          $('#modalBody').text('Welcome a Adverspace');
          $('#yesButton').text('Accept').click(function(e){
            console.log(e)
            $('#modalContainer').modal('hide');
            that.login()
            //window.location="http://adsigo.teraspace.co:8080"
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
    }).catch((err) => {
      console.log(err)
      setTimeout(() => {
        this.selectCountry()
      },1000)
    }).then((response) => {
      return response.json()
    }).then((cities) => {
      _context.setState({  cities: cities.data })
    })
  }
  setPhotoListener () {

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
  loadCountries(){
    fetch(hostaddress+'/api/countries',{method: 'POST'})
    .then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
      setTimeout(() => {
        this.loadCountries()
      },1000)
    })
    .then((countries) => {
      this.setState({  countries: countries.data })
    })
  }
  login() {
    console.log('onLoginClick');
    fetch(x.globals.hostaddress+'/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + JSON.stringify({
        in_mail: document.getElementById('mail').value,
        in_password: document.getElementById('pass').value,
        in_languaje: 'US',
        in_ip_user_host: ''
      })
    }).catch((err) => {
      console.log(err)
      setTimeout(() => {
        that.login()
      },1000)
    }).then((response) => {
      return response.json();
    }).then((session) => {
      console.log(session);
      if (!session.success && session.code=='API_MESSAGE'){

        $('#modalContainer').on('show.bs.modal', function (e) {
          $('#noButton').hide();
          $('#modalTitle').text('Warning');
          $('#modalBody').text(session.message);
          $('#yesButton').text('Accept').click(function(e){
            console.log(e)
            $('#modalContainer').modal('hide');
          })
        }).modal();

        return;
      }
      localStorage.setItem('session',JSON.stringify(session.data[0]));
      localStorage.setItem('country',session.data[0].id_country);
      window.location="http://adsigo.teraspace.co:8080"


    });
  }
}
function validar (data){
  var _data = JSON.parse(data);
  var ok = true;

  if(_data.in_type_identification=="0"){
    alert('Identification type required.')
    ok = false;
  } else
  if(_data.in_user_photo==null){
    alert('Photo profile required')
    ok = false;
  } else
  if(_data.in_identification==""){
    alert('You must enter your identification')
    ok = false;
  } else
  if(_data.in_first_name==""){
    alert('Yoy must enter your name')
    ok = false;
  } else
  if(_data.in_last_name==""){
    alert('You must enter your last name')
    ok = false;
  }
  else
  if(_data.in_address==""){
    alert('You must enter your address')
    ok = false;
  }  else
  if(_data.in_phone==""){
    alert('You must enter your phone.')
    ok = false;
  } else
  if(_data.in_email=="" || !String(_data.in_email).includes('@')){
    alert('You must enter your email address')
    ok = false;
  }else
  if(_data.in_password=="" || _data.in_password!=document.getElementById('pass_confirmation').value){
    alert('You must enter your password and please confirm.')
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
