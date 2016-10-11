import React from 'react'
import ReactDOM from 'react-dom'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket'
import Header from '../header'

class LandingDetail extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      detail: {},
      numberDays: 0,
      productionTotal: 0,
      productionSpace: 0,
      availbility: []
    };
    this.reevent = this.reevent.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.putDealing = this.putDealing.bind(this)
    this.selectPrints = this.selectPrints.bind(this)
    this.showDetail = this.showDetail.bind(this)
  }
  componentWillMount () {
  
    console.log('loading?????')
    this.showDetail()
     this.getAvaibility()
  }
  componentDidMount () {
    console.log('componentDidMount')

  }

  render(){
    console.log(this.props.querystring)
    var details = this.state.details
    if(details==undefined) return <span>Cargando...</span>
    var that = this
    if (details!={}) {
      var first_photo,second_photo,third_photo,fourth_photo = null
      var path_photo = "images/stock/user_"+details.fk_id_user+"/stock_"+details.id_stock+"/"
      var photo_gallery = []
      first_photo = path_photo + details.first_photo
      second_photo = path_photo + details.second_photo
      third_photo = path_photo + details.third_photo
      fourth_photo = path_photo + details.fourth_photo
    }
    console.log(details)
    if(details.first_photo!=""){
      photo_gallery.push(
        <div key={"photo1"} className="img-holder">
          <img data-u="image" src={first_photo}  />
        </div>)
      }
      if(details.second_photo!=""){
        photo_gallery.push(
          <div key={"photo2"} className="img-holder">
            <img data-u="image" src={second_photo}  />
          </div>)
        }
            if(details.third_photo!=""){
              photo_gallery.push(
                <div key={"photo3"} className="img-holder">
                  <img data-u="image" src={third_photo}   / >
                  </div>)
                }
                if(details.fourth_photo!=""){
                  photo_gallery.push(
                    <div key={"photo4"} className="img-holder">
                      <img data-u="image" src={fourth_photo}  / >
                      </div>)
                    }
                    return  <main id="main" className="billboard-detail" role="main">
                      <Header />
                      <div className="container-box small">
                        <div className="product-section">
                          <div className="product-block">
                            <div className="slider">
                              <div className="slider-for">
                                {photo_gallery}
                              </div>
                              <div className="slider-nav">
                                {photo_gallery}
                              </div>
                            </div>
                            <div className="form-block">
                              <h1>{details.name+ " "} <br />
                              {details.address}</h1>
                            <span className="text">
                              By <a href="#">{details.nombre_propietario} </a> <br /> Billboard type: {details.in_out} <br />  Size: {details.size}<br /> {details.city_name}, {details.country_name} <br />{details.address} &nbsp;<a href="#">View on map</a>
                          </span>
                          <div className="pricing">
                            <span className="title">Price per day</span>
                            <span className="price">{(details.daily_price.formatMoney())}</span>
                          </div>
                          <div className="selectdate-form">
                            <div className="row date-box2">
                              <div className="js-date-open-close">
                                <input className="js-date-field multidate" type="text" placeholder="Date Range"  name="startDate" required="" id="dateRange" />
                              </div>

                            </div>
                            <select onChange={that.selectPrints} className="select-amount" id="qtyPrint" name="qtyPrint">
                              <option className="hidden">Production quantity</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                            <table>
                              <tbody>
                                <tr>
                                  <td>{that.state.numberDays} Days of Billboard:</td>
                                  <td>{that.state.productionSpace.formatMoney()}</td>
                                </tr>
                                <tr>
                                  <td>Print &amp; Installation</td>
                                  <td>{that.state.productionTotal.formatMoney()}</td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td>Total:</td>
                                  <td>{(that.state.productionSpace+that.state.productionTotal).formatMoney()}</td>
                                </tr>
                              </tfoot>
                            </table>
                            <div className="btn-holder">
                              <input onClick={that.putDealing}  type="submit"  className="btn" defaultValue="REQUEST BILLBOARD" />
                              <input id="addOrder" className="btn" defaultValue="Contact Seller" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="detailmap" className="map-holder"  style={{height: "346px"}}>
                         <input type="text" id="mapsearch"  />
                        <div id="detailmap" style={{height: "320px", width: "100%"}}></div>

                        <input defaultValue={""}  minLength="5" className="required" type="hidden" placeholder="" name="googlemaps" id="googlemaps" required />                      </div>
                    </div>
                    <div className="article" style={{display:'none'}}>
                      <h2>ABOUT THE BILLBOARD</h2>
                      <dl>
                        <dt>City:</dt>
                        <dd>{details.city_name}</dd>
                        <dt>Address:</dt>
                        <dd>{details.address}</dd>
                        <dt>Space type:</dt>
                        <dd>{details.in_out}</dd>
                        <dt>Billoboard's visual size (cm):</dt>
                        <dd>{details.size}</dd>
                        <dt>Billboard type:</dt>
                        <dd>{details.in_out}</dd>
                      </dl>
                    </div>
                    <div className="article" style={{display: 'none'}}>
                      <h2>technical information</h2>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided.</p>
                    </div>
                  </div>
                </main>



              }
              selectPrints (){
                console.log('selectPrints')
                var details = this.state.details
                var qtyPrint = document.getElementById('qtyPrint').value
                var numberDays = this.state.numberDays
                var productionPrice = details.production_price
                var dailyPrice = details.daily_price
                this.setState( {
                  productionTotal : (parseFloat(qtyPrint) * parseFloat(productionPrice)),
                  productionSpace : parseFloat(dailyPrice)*parseFloat(numberDays)
                } )
                console.log(dailyPrice*numberDays)
              }
              reevent(){
                console.log('reevent')
                var that = this;
                //initJssorGallery2()
                var today = new Date();
                var y = today.getFullYear();
                $('.multidate').click(function(){
                  $('.multidate').val('')
                  $('.multidate').datepicker('show')
                  $('.multidate').multiDatesPicker('resetDates', 'disabled');
                })
console.log(that.state.availbility)

                $('.multidate').multiDatesPicker({
                  dateFormat: 'dd/mm/yy',
                  minDate: 0,
                  maxPicks: 2,
                  numberOfMonths: [3,4],
                  defaultDate: '1/1/'+y,
                  onSelect: function() {
                    $(this).data('datepicker').inline = true;
                    if($('.multidate').val().includes(',')){
                      var startDate = $('.multidate').val().split(',')[0].trim()
                      var endDate = $('.multidate').val().split(',')[1].trim()
                      startDate = startDate.split('/')
                      startDate = new Date(startDate[1]+'/'+startDate[0]+'/'+startDate[2])
                      endDate = endDate.split('/')
                      endDate = new Date(endDate[1]+'/'+endDate[0]+'/'+endDate[2])
                      console.log(days_between(startDate,endDate))
                      that.setState({numberDays : days_between(startDate,endDate) })
                      $(this).data('datepicker').inline = false;
                    }
                  }


                });
                //  init_map();
              }
              closeModal(){
                console.log('closeModal')
                ReactDOM.unmountComponentAtNode(document.getElementById('modalview'))
              }
              getAvaibility(){
                var details = this.state.details
                var idstock = this.props.querystring
                var token;
                var that = this
                try {
                  token=JSON.parse(localStorage.getItem('session')).v_user_token

                }catch(err){
                  token=''
                }
                var payload = JSON.stringify({
                  in_user_token :token,
                  in_id_stock :idstock
                });
                console.log(payload)
                fetch(x.globals.hostaddress+'/api/stock-availbility',{
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "params=" + payload
                })
                .then((response) => {
                  return response.json()
                })
                .then((availbility) => {
                  var _avaibility;
                  try {
                    _avaibility =  availbility.data[0].cursor.split(',')
                    _avaibility.pop()
                    _avaibility.reverse()
                  } catch(err){
                    return;
                  }
                  this.setState({availbility: _avaibility})
                  setTimeout(function(){
                    //myload2()
                    //that.reevent();
                    //init_map(details.data[0].googlemaps);
                  },800)
                })
              }
              putDealing(){
                console.log('putDealing')
                var that = this
                var details = this.state.details
                var idstock = details.id_stock;

                var token,iduser;
                try {
                  token=JSON.parse(localStorage.getItem('session')).v_user_token
                  iduser=JSON.parse(localStorage.getItem('session')).id_user
                }catch(err){
                  token=''
                }
                var dates = document.getElementById('dateRange').value.split(',')

                if(dates.length>1 ){
                  var startDate = dates[0].split('/')
                  var endDate = dates[1].split('/')
                  console.log(startDate)
                  startDate = startDate[2] + '-' + parseInt(startDate[1]) +'-'+ parseInt(startDate[0])
                  endDate = endDate[2] + '-' + parseInt(endDate[1]) +'-'+ parseInt(endDate[0])

                } else {
                  openMessage('Please select your date range and try again!')
                  return;
                }
                var qtyPrint = document.getElementById('qtyPrint').value
                var payload = JSON.stringify({
                  in_user_token: token,
                  in_id_stock :details.id_stock,
                  in_name :details.name,
                  in_id_city :details.id_city,
                  in_address:details.address,
                  in_fk_id_user:iduser,
                  in_daily_price :parseFloat(details.daily_price),
                  in_production_price :parseFloat(details.production_price),
                  in_number_of_arts :qtyPrint,
                  in_date_start :startDate,
                  in_date_end :endDate
                });
                console.log(payload)
                fetch(x.globals.hostaddress+'/api/stock-dealings',{
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "params=" + payload
                })
                .then((response) => {
                  return response.json()
                })
                .then((deal) => {
                  console.log(deal)
                  if(deal.success && deal.code=='API_SUCCESS' && deal.id>0){
                    console.log(deal)
                    openMessage('Deal sent successfully to publisher')
                  }
                  that.closeModal()
                })
              }

              showDetail(){
                var that = this;
                console.log('showDetail')
                var idstock = this.props.querystring;
                var token;
                try {
                  if ('session' in this.state)
                  token=JSON.parse(localStorage.getItem('session')).v_user_token

                }catch(err){
                  console.error(err)
                  token=''
                }
                var payload = JSON.stringify({
                  in_user_token :token,
                  in_id_stock :idstock
                });
                console.log(payload)
                fetch(x.globals.hostaddress+'/api/stock-detail',{
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "params=" + payload
                })
                .then((response) => {
                  return response.json()
                })
                .then((details) => {
                  console.log(details)

                  that.setState({details: details.data[0]})
                  setTimeout(function(){
                    myload2()
                    that.reevent();
                    init_map(details.data[0].googlemaps);
                  },800)



                })
              }
            }
            function days_between(date1, date2) {

              // The number of milliseconds in one day
              var ONE_DAY = 1000 * 60 * 60 * 24

              // Convert both dates to milliseconds
              var date1_ms = date1.getTime()
              var date2_ms = date2.getTime()
              // Calculate the difference in milliseconds
              var difference_ms = Math.abs(date1_ms - date2_ms)

              // Convert back to days and return
              return Math.round(difference_ms/ONE_DAY)

            }
            export default LandingDetail
