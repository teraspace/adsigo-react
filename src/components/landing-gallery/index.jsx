import React from 'react'
import ReactDOM from 'react-dom'
import _ from '../../server/ConstantsAPI';
import x from '../../server/ConstantsSocket';
import LandingDetail from '../landing-detail';

class LandingGallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = { gallery: [] }
  }

  render() {
    var that = this;
    if (this.props.data) {
      var first_photo,second_photo,third_photo,fourth_photo = null;
      var path_photo = "images/stock/user_"+this.props.data.fk_id_user+"/stock_"+this.props.data.id_stock+"/"
      var photo_gallery = []
      first_photo = path_photo + this.props.data.first_photo
      second_photo = path_photo + this.props.data.second_photo
      third_photo = path_photo + this.props.data.third_photo
      fourth_photo = path_photo + this.props.data.fourth_photo
      if(this.props.data.first_photo!=""){
        photo_gallery.push(                  <div  key={"photo1"} className="slide" style={{height:'307px', position: 'absolute', left: '390px',  width: '390px'}}>
        <img  style={{height:'307px'}} src={first_photo} height="307" width="402" alt="image description" />
      </div>)
    }
    if(this.props.data.second_photo!=""){
      photo_gallery.push(                   <div key={"photo2"} className="slide" style={{position: 'absolute', left: '780px', width: '390px'}}>
      <img style={{height:'307px'}}  src={second_photo} height="307" width="402" alt="image description" />
    </div>)
  } else {
    photo_gallery.push(                   <div key={"photo2"} className="slide" style={{position: 'absolute', left: '780px', width: '390px'}}>
    <img style={{height:'307px'}}  src={first_photo} height="307" width="402" alt="image description" />
  </div>)
}
if(this.props.data.third_photo!=""){
  photo_gallery.push(         <div key={"photo3"} className="slide" style={{position: 'absolute', left: '0px', width: '390px'}}>
  <img style={{height:'307px'}}  src={third_photo} height="307" width="402" alt="image description" />
</div>)
}
if(this.props.data.fourth_photo!=""){
  photo_gallery.push(         <div key={"photo4"} className="slide" style={{position: 'absolute', left: '0px', width: '390px'}}>
  <img style={{height:'307px'}}  src={fourth_photo} height="307" width="402" alt="image description" />
</div>)
}
return (
  <li>
    <div className="picture-holder" style={{height: '307px'}}>
      <div className="cycle-gallery gallery-js-ready" style={{height: '307px'}}>
        <div className="mask" style={{height: '307px'}}>
          <div className="slideset" style={{position: 'relative', height: '100%', marginLeft: '-390px'}}>
            {photo_gallery}
          </div>
        </div>
        <a className="btn-prev" href="#"><span className="icon-arrow-left"></span></a>
        <a className="btn-next" href="#"><span className="icon-arrow-right"></span></a>
      </div>
      <a  onClick={this.showDetail.bind(that,that.props.data)} className="btn-reviews">Ver Espacio</a>
    </div>
    <div className="price-holder" style={{ zIndex:'2'}}>
      <span className="price-main">{this.props.data.daily_price} por día by Dolmen Visual</span>
    </div>
    <div className="info-box height same-height-left" style={{height: '73px'}}>
      <div className="address-holder">
        <address>{this.props.data.name}<br/>{this.props.data.description}<br/>{this.props.data.address}</address>
      </div>
    </div>
  </li>
)
} else {
  return <p className="text-center">Cargando LandingGallery...</p>
}
}
showDetail(data){
  var idstock = data.id_stock;
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
    ReactDOM.render(<LandingDetail data={details.data[0]} />,document.getElementById('modalview'))
  })
}

}

export default LandingGallery
