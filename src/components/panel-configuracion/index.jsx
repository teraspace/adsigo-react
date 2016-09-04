import React from 'react';
import ReactDOM from 'react-dom';

export default class PanelConfiguracion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session'))
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  render() {
    var user_photo,name;
    if(this.state.session!=null){
      if(this.state.session.user_photo!=null){
        user_photo = "./img/photo_user/"+this.state.session.user_photo ;
        if(this.state.name_company!=null)
          name = this.state.session.name_company
        else
          name = this.state.session.name
      }
    }

    return <div id="nav">
      <a href="#" className="menu-open">
        <span className="burger">
          <span>                    </span>
        </span>
        <span onClick={this.showPanel} className="text">
          {name}
        </span>
      </a>
      <a href="#" className="user-photo menu-open">
        <img src={user_photo} height="51" width="51" alt="image description" />
      </a>

      <div className="nav-drop inner js-slide-hidden">
        <div className="holder">
          <ul className="sub-list">
            <li><a href="/my-sells">Mis Ventas</a></li>
            <li><a href="/my-billboards">Mis Espacios</a></li>
            <li><a href="#">Reportes</a></li>
            <li><a href="#">Disponibilidad</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a onClick={this.logOut} href="#">Cerrar Sesion</a></li>
          </ul>
        </div>
      </div>

    </div>;
  }
  showPanel (){
  //  document.getElementById("nav-prop").classList.toggle("shown");
  }
  logOut (){
    localStorage.setItem('session',null)
    localStorage.removeItem('session');
  localStorage.removeItem('country');
    setTimeout (function (){
      location.reload();
    },100)

  }

};
