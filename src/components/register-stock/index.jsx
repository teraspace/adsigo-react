import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket';

import SideMenu from '../side-menu'
var that;
var uploadPhoto = [];
var hostaddress = "";
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
    this.loadStockSelected = this.loadStockSelected.bind(this)
    hostaddress = x.globals.hostaddress;
  }
  componentWillMount(){
    this.loadTypeStock()
    this.loadCountries()

  }

  loadCountries(){
    var that = this;
    fetch(hostaddress+'/api/countries',{method: 'POST'})
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
      setTimeout(() => {
        that.loadCountries()
      },1000)
    })
    .then((countries) => {
      this.setState({  countries: countries.data })
    })

  }
  loadTypeStock (){
    var that = this
    fetch(hostaddress+'/api/typestock',{method: 'POST'})
    .then((response) => {
      return response.json()
    }).catch((err) => {
      var that = that;
      console.log(err)
      setTimeout(() => {
        that.loadTypeStock()
      },1000)
    }).then((typeStock) => {
      this.setState({  typeStock: typeStock.data })
    })

  }
  componentDidMount (){
    console.log(this.props.billboard)
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

    this.loadStockSelected()
    var editStock = getBillboardSelected()
    var imagePath = "";
    console.log((editStock))
    if(editStock!=null && typeof(editStock)=='object'){
      imagePath = "images/stock/user_" + editStock.fk_id_user + "/stock_" + editStock.id_stock  + "/"
      this.refreshReview(imagePath,editStock)
    }
    localStorage.removeItem('selBillboard')

    init_map_register()
  }
  render() {
    var title = "My Billboards"
    that = this;
    var optionCountries = [];
    var countries = this.state.countries;
    var editStock = getBillboardSelected()
    var _alto =""
    var _ancho =""
    if (editStock==null){
      editStock = {}
    }else {
      title = "Edit Billboard"
      try {
        _alto = editStock.size.split('x')[0]
        _ancho = editStock.size.split('x')[1]
      }catch(err){}
    }
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
          <h1><img src="./images/ico1.png" height="34" width="32" alt="image description" />{title}</h1>
          <form action="#" id="registerStockForm" className="space-form validate-form">
            <fieldset>
              <div className="hold">
                <h3>1. Billboard's commercial info:</h3>
                <a href="#" className="link">Many billboards? Let us add them by you.!</a>
              </div>
              <div className="gray-holder">
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="name">Billboard name</label>
                  </div>
                  <input className="required" defaultValue={editStock.name}  minLength="2" type="text" placeholder="" name="name" id="name" required />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="typeSpace">Billboard type</label>
                  </div>
                  <select defaultValue={editStock.fk_id_type_stock}  className="required-select" id="typeSpace" required>
                    {optionTypeStock}
                  </select>
                </div>
                <div style={{display: 'none'}} className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="description">Billboard's description</label>
                  </div>
                  <input defaultValue={editStock.description} maxLength="20" minLength="10" className="required" type="text" placeholder="" name="description" id="description" />
                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="select1">Country</label>
                  </div>
                  <select defaultValue={editStock.id_country} className="required-select"  key={"sc1"} onChange={this.selectCountry} id="selectCountry1"   name="selectCountry1" required >
                    {optionCountries}
                  </select>

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="select2">City</label>
                  </div>
                  <select defaultValue={editStock.ciudad}  onChange={this.selectCity} className="required-select" id="selectCity1" name="selectCity1" required>
                    {optionCities}
                  </select>

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="princeDaily">Price per day</label>
                  </div>
                  <input defaultValue={parseFloat(editStock.daily_price)}  minLength="3" className="required" type="number" placeholder="" id="princeDaily" />

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="productionPrice">Production price</label>
                  </div>
                  <input defaultValue={parseFloat(editStock.production_price)} className="required" type="number" placeholder="" id="productionPrice" />

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="stockSizeH">Heigth (cm)</label>
                  </div>
                  <input  defaultValue={_alto}   className="required" type="number" placeholder="" id="stockSizeH" required />

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="stockSizeW">Write (cm)</label>
                  </div>
                  <input defaultValue={_ancho} className="required" type="number" placeholder="" id="stockSizeW" required />

                </div>
                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="address">Address</label>
                  </div>
                  <input defaultValue={(editStock.address)}   minLength="10" className="required" type="text" placeholder="" name="address" id="address" required />

                </div>
                <div style={{display: "none"}} className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="priceMonthly">Monthly price</label>
                  </div>
                  <input defaultValue={parseFloat(editStock.daily_price * 30)}  minLength="3" className="required-number" type="number" placeholder="" name="priceMonthly" id="priceMonthly" required />

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
              <h3>3. Select Google Maps location</h3>
              <div className="gray-holder">
                <div className="row required-row">
                  <input type="text" id="mapsearch"  />
                  <div id="detailmap" style={{height: "320px", width: "100%"}}></div>

                  <input defaultValue={(editStock.googlemaps )}  minLength="5" className="required" type="hidden" placeholder="" name="googlemaps" id="googlemaps" required />
                </div>
              </div>
              <div style={{display: 'none'}} className="gray-holder">
                <h3>4. Billboard's technical information:</h3>

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="visualImpact">Visual impact per day</label>
                  </div>
                  <input defaultValue={0}  className="required" type="number" placeholder="" name="visualImpact" id="visualImpact" />
                </div>

                <div className="row required-row">
                  <div className="label-holder">
                    <label htmlFor="publicTarget">Public targets</label>
                  </div>
                  <select  defaultValue={(editStock.target)}   className="required-select" id="publicTarget" name="publicTarget" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>

                </div>


                <div className="row">
                  <div className="label-holder">
                    <label htmlFor="lightning">Iluminación Nocturna</label>
                  </div>
                  <input defaultChecked={(editStock.lighting == 'S' ? true : false)} type="checkbox" id="lightning"  />
                </div>
                <div className="row">
                  <div className="label-holder">
                    <label htmlFor="hotSpot">Hotspot</label>
                  </div>
                  <input defaultChecked={(editStock.hotspot== 'S' ? true : false)}  type="checkbox" id="hotSpot" />
                </div>
                <div className="row">
                  <div className="label-holder">
                    <label htmlFor="mainRoad">Main Road</label>
                  </div>
                  <input  defaultChecked={(editStock.main_road== 'S' ? true : false)}  type="checkbox" id="mainRoad" />
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
    var editStock = getBillboardSelected()
    var path,fileName = [], photoFiles = [], count=4,_photo;
    var id_stock = 0;
    if(editStock!=null)
    if ('id_stock' in editStock) id_stock = editStock.id_stock
    else id_stock=0;
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
      in_id_stock: id_stock,
      in_name:  document.getElementById('name').value,
      in_description:  document.getElementById('description').value,
      in_id_country:  document.getElementById("selectCountry1").value,
      in_id_city: document.getElementById("selectCity1").value.split(',')[0],
      in_address:  document.getElementById('address').value,
      in_googlemaps:  document.getElementById('googlemaps').value,
      in_availability:  'S',
      in_size:  (document.getElementById('stockSizeH').value +'x'+document.getElementById('stockSizeW').value),
      in_target:   parseInt(document.getElementById("publicTarget").value),
      in_impact: parseInt(-1),
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
    console.log(payload)
    if(!validar(payload)) {
      return;
    }
    console.log('register');
    console.log('onLoginClick');    var _token;

    fetch(hostaddress+'/api/register-stock', {
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
      if (session.success && session.code=='API_SUCCESS'){
        localStorage.removeItem('selBillboard')
        openMessage(session.message, function(){window.location="/"})
      }



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
    fetch(hostaddress+'/api/cities' ,
    {   method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }).catch((err) => {
      console.log(err)
      setTimeout(() => {
        that.selectCountry()
      },1000)
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
  refreshReview(imagePath,editStock){
    console.log('imagePath')
    var image1 = imagePath+editStock.first_photo
    var image2 = imagePath+editStock.second_photo
    var image3 = imagePath+editStock.third_photo
    var image4 = imagePath+editStock.four_photo
    var image5 = imagePath+editStock.five_photo
    this.loadPreview('image1',image1)
    this.loadPreview('image2',image2)
    this.loadPreview('image3',image3)
    this.loadPreview('image4',image4)
    this.loadPreview('image5',image5)
  }
  loadPreview (htmlElement,image){
    console.log(image)
    console.log(htmlElement)
    $('#'+htmlElement).css("background-image", "url("+image+")");

    $('#'+htmlElement).css("background-size", "cover");
    $('#'+htmlElement).css("background-position", "center center");
  }
  loadStockSelected (){
    if(_editStock!=""){

    }
  }
}
function validar (data){
  var _data = JSON.parse(data);
  var ok = true;
  if(_data.in_user_token.length<=5){
    alert('You must to be logged')
    ok = false;
  } else
  // if(_data.in_id_stock!=0){
  //   alert('Este formulario solo es para inserción.')
  //   ok = false;
  // } else
  if(_data.in_name.length<=5){
    alert('You must write a name.')
    ok = false;
  } else
  // if(_data.in_description.length<=10){
  //   alert('Debe escribir una descripción concisa.')
  //   ok = false;
  // } else
  if(_data.in_id_country.length>2){
    alert('You must select the location country.')
    ok = false;
  }
  else
  if(_data.in_id_city.length>6){
    alert('You must select location city.')
    ok = false;
  }
  else
  if(_data.in_address.length<=10){
    alert('You must write address')
    ok = false;
  }  else
  if(_data.in_googlemaps<=5){
    alert('You must select google maps localtion.')
    ok = false;
  } else
  // if(_data.in_user_photos.length<=0){
  //   alert('Debe seleccionar al menos una foto')
  //   ok = false;
  // } else
  if(isNaN(_data.in_daily_price) || _data.in_daily_price<=0 ){
    console.log(_data.in_daily_price)
    alert('Yoy must write size..')
    ok = false;
  } else
  if(_data.in_availability<1 || _data.in_availability!='S'){
    alert('You must to be avaible..')
    ok = false;
  } else
  if( _data.in_size.length<3  ){
    alert('You must write the size')
    ok = false;
  } else
  if(_data.in_target<1 || _data.in_target<=0){
    alert('You must write target.')
    ok = false;
  } else
  // if(_data.in_impact<1 || isNaN(_data.in_impact)){
    //   alert('Debe escribir el impacto')
    //   ok = false;
    // } else
    if(isNaN(_data.in_production_price) || _data.in_production_price<=0 ){
      alert('You must write production price.')
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
