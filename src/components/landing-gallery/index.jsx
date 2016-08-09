import React from 'react'
import ReactDOM from 'react-dom'
import _ from '../../server/ConstantsAPI';

class LandingGallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = { gallery: [] }
  }

  componentWillMount() {
  console.log('componentWillMount');
    // fetch('http://adsigo.teraspace.co:8080/api/login',{method: 'POST'})
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((empleados) => {
    //     this.setState({ empleados: empleados })
    //   })
  }

  render() {
    if (this.props.data) {
console.log(this.props.data)
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
  console.log(photo_gallery)
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
            <a href="#" className="btn-reviews">Ver Espacio</a>
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

}

export default LandingGallery
