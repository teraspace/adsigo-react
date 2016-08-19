import React from 'react'
import ReactDOM from 'react-dom'
import _ from '../../server/ConstantsAPI'

class LandingDetail extends React.Component {


  constructor(props) {
    super(props)
    this.state = { detail: [] };
    this.reevent = this.reevent.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  componentWillMount () {

  }
  componentDidMount () {
    console.log('componentDidMount')
    this.getAvaibility()
    this.reevent();

  }
  render(){
    var details = this.props.data
    console.log(details)
    var that = this
    if (this.props.data) {
      var first_photo,second_photo,third_photo,fourth_photo = null
      var path_photo = "images/stock/user_"+this.props.data.fk_id_user+"/stock_"+this.props.data.id_stock+"/"
      var photo_gallery = []
      first_photo = path_photo + this.props.data.first_photo
      second_photo = path_photo + this.props.data.second_photo
      third_photo = path_photo + this.props.data.third_photo
      fourth_photo = path_photo + this.props.data.fourth_photo
    }
    console.log(this.props.data)
    if(this.props.data.first_photo!=""){
      photo_gallery.push(
        <div key={"photo1"} style={{width: "653px", height: "440px", top: "0px", left: "-653px", position: "absolute", overflow: "hidden"}}>
          <img data-u="image" src={first_photo} style={{width: "653px", height: "440px", top: "0px", left: "0px", position: "absolute"}} />
          <img data-u="thumb" src={first_photo} style={{display: "none"}} />
        </div>)
      }
      if(this.props.data.second_photo!=""){
        photo_gallery.push(
          <div key={"photo2"} style={{width: "653px", height: "440px", top: "0px", left: "0px", position: "absolute", overflow: "hidden"}}>
            <img data-u="image" src={second_photo} style={{width: "653px", height: "440px", top: "0px", left: "0px", position: "absolute"}} />
            <img data-u="thumb" src={second_photo} style={{display: "none"}} />
          </div>)
      } else {
          photo_gallery.push(
            <div key={"photo3"} style={{width: "653px", height: "440px", top: "0px", left: "653px", position: "absolute", overflow: "hidden"}}>
              <img data-u="image" src={third_photo}  style={{width: "653px", height: "440px", top: "0px", left: "0px", position: "absolute"}} / >
                <img data-u="thumb" src={third_photo} style={{display: "none"}} />
              </div>)
      }
      if(this.props.data.third_photo!=""){
        photo_gallery.push(
          <div style={{width: "653px", height: "440px", top: "0px", left: "653px", position: "absolute", overflow: "hidden"}}>
            <img data-u="image" src={third_photo}  style={{width: "653px", height: "440px", top: "0px", left: "0px", position: "absolute"}} / >
              <img data-u="thumb" src={third_photo} style={{display: "none"}} />
            </div>)
      }
      if(this.props.data.fourth_photo!=""){
        photo_gallery.push(
        <div style={{width: "653px", height: "440px", top: "0px", left: "1306px", position: "absolute", overflow: "hidden"}}>
          <img data-u="image" src={fourth_photo}  style={{width: "653px", height: "440px", top: "0px", left: "0px", position: "absolute"}} / >
          <img data-u="thumb" src={fourth_photo} style={{display: "none"}} />
        </div>)
      }
      return <div className=" fancybox-wrap fancybox-desktop fancybox-type-ajax fancybox-opened" tabIndex="-1" style={{width:" 923px", height: "auto", position: "absolute", top: "20px", left: "214px", opacity: "1", overflow: "visible"}}>
                  <div className="fancybox-skin" style={{padding: "0px", width: "auto", height: "auto"}}>
                    <div className="fancybox-outer">
                      <div className="fancybox-inner" style={{overflow: "visible", width: "923px", height: "100px"}}>
                        <div id="popup-1" className="lightbox">
                          <div className="lightbox-title">
                            <div className="title-bar">

                              <h1>{details.name+ " "} <br />
                                {details.address}</h1>


                              <ul className="breadcrumbs">
                                <li>por <a href="inc/modal/modal04.html" className="btn-review fancybox.ajax">{details.nombre_propietario}  </a></li>
                                <li>{details.id_city}, {details.id_country}</li>

                                <li>{details.in_out}</li>
                              </ul>

                            </div>
                            <div className="rating-bar">
                              <ul className="star-rating small">
                                <li className=" "><a className="one-star" title="Rate this 1 star out of 4" href="#">1</a></li>
                                <li><a className="two-stars" title="Rate this 2 stars out of 4" href="#">2</a></li>
                                <li><a className="three-stars" title="Rate this 3 stars out of 4" href="#">3</a></li>
                                <li className=" "><a className="four-stars" title="Rate this 4 stars out of 4" href="#">4</a></li>
                              </ul>
                              <span className="text">(84 votos)</span>
                              <a href="#" className="close icon-close"></a>
                            </div>
                          </div>
                          <div className="top-holder">
                            <div className="picture-holder same-height-left" style={{height:"437px"}}>
                              <div id="slider1_container" style={{position: "relative", width: "653px", height: "440px", overflow: "hidden"}} data-jssor-slider="true">
                                <div data-u="slides" style={{cursor: "move", position: "absolute", left: "0px", top: "0px", width: "653px", height: "440px", overflow: "hidden", zIndex: "0"}}>
                                  {photo_gallery}
                                </div>
                                <div data-u="thumbnavigator" className="jssort03" style={{left: "0px", bottom: "0px", width: "653px", height: "84px"}} data-jssor-slider="true">
                                  <div data-u="slides" style={{cursor: "default",width: "280px"}}>
                                    <div data-u="prototype" className="p">
                                      <div className="w">
                                        <div data-u="thumbnailtemplate" className="t"></div>
                                      </div>
                                      <div className="c"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <form method="POST" action="http://advertspace.co/user/orders/addTo/cart/1" acceptCharset="UTF-8">
                              <input name="_token" type="hidden" value="RJ8QcfDTvXk03N1HDa7fRlDpP75oLCqPHm3L1Xcb" />
                              <input type="hidden" name="_token" value="RJ8QcfDTvXk03N1HDa7fRlDpP75oLCqPHm3L1Xcb" id="token" />
                              <input type="hidden" value="1" id="idSpace" name="idSpace" />
                              <div className="col same-height-right" style={{height: "437px"}}>
                                <h2>comprar</h2>
                                <div className="gray-box amount-box">
                                  <div className="date-box2">
                                    <div className="js-date-open-close">
                                      <input className="js-date-field multidate" type="text" placeholder="Date Range"  name="startDate" required="" id="dp1470988129361" />
                                      <i className="icon-keyboard-arrow-down"></i>
                                    </div>

                                  </div>
                                  <select className="select-amount jcf-hidden" name="qtyPrint">
                                    <option className="hidden">Cantidad de Impresión(es)</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </select><span className="jcf-select jcf-unselectable jcf-select-select-amount"><span className="jcf-select-text"><span className="jcf-option-hidden ">Cantidad de Impresión(es)</span></span><span className="jcf-select-opener"></span></span>
                                  <div className="tooltip-holder">
                                    <a href="#" className="open-tooltip">Qué son “Impresiones?”</a>
                                    <div className="tooltip-slide js-slide-hidden" style={{display: "none", opacity: "1"}}>
                                      <div className="slide-holder">
                                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                                      </div>
                                    </div>
                                  </div>
                                  <h3><span>Resumen del Pedido</span></h3>
                                  <span className="result-holder"><span className="result day-number">0</span> días de publicidad + <span className="result amount-number">0</span> impresión(es)</span>
                                  <dl className="count-holder">
                                    <dt>Publicidad:</dt>
                                    <dd className="productionSpace">0</dd>
                                    <dt><span>+</span>Impresión(es):</dt>
                                    <dd className="productionPrint">0</dd>
                                  </dl>
                                  <dl className="sum-holder">
                                    <dt>total (cop)</dt>
                                    <dd className="totalSpace">0</dd>
                                  </dl>
                                  <a href="#" className="btn-buy">Comprar</a>

                                  <div>
                                    <button type="submit" id="addOrder" className="btn-append"><span>+</span> Agregar a Orden</button>

                                  </div>

                                  <div className="tooltip-holder">
                                    <a href="#" className="open-tooltip">Ver Condiciones*</a>
                                    <div className="tooltip-slide js-slide-hidden">
                                      <div className="slide-holder">
                                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="lightbox-content">
                            <span className="title">1. Información Comercial del SurfBoard:</span>
                            <div className="info-box">
                              <dl>
                                <dt>Ciudad:</dt>
                                <dd>{details.id_city}</dd>
                                <dt>Dirección:</dt>
                                <dd>{details.address}</dd>
                                <dt>Tipo de Espacio:</dt>
                                <dd>{details.fk_id_type_stock}</dd>
                                <dt>Tamaño Visual de Publicidad (cm):</dt>
                                <dd>{details.size}</dd>
                                <dt>Tipo de Valla:</dt>
                                <dd>{details.in_out}</dd>
                                <dt>Impactos Visuales por Dia:</dt>
                                <dd>{details.impact}</dd>
                                <dt>Estratos Targets:</dt>
                                <dd>{details.target}</dd>
                              </dl>
                              <dl>
                                <dt>Ver en Mapa:</dt>
                                <dd id="detailmap" style={{height: "346px"}}>
                                </dd>
                              </dl>
                            </div>
                            <span className="title">2. Información sobre la tabla:</span>
                            <div className="info-box">
                              <div className="text-container">
                                <p>.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a title="Close" className="fancybox-item fancybox-close" onClick={that.closeModal.bind(that)}></a>
                  </div>
                </div>

              }
              reevent(){
                console.log('reevent')
                initJssorGallery()
                var today = new Date();
                var y = today.getFullYear();
                $('.multidate').multiDatesPicker({

                  maxPicks: 2,
                	numberOfMonths: [3,4],
                	defaultDate: '1/1/'+y
                });
              //  $('.multidate').multiDatesPicker();
                init_map();
              }
              closeModal(){
                console.log('closeModal')
                ReactDOM.unmountComponentAtNode(document.getElementById('modalview'))
              }
              getAvaibility(){
                var details = this.props.data
                var idstock = details.id_stock;
                var token;
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
                fetch(_.globals.hostaddress+'/api/stock-availbility',{
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
                  console.log(availbility)
                })
              }
            }

            export default LandingDetail