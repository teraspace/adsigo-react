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
    var user_photo,last_name;
    if(this.state.session!=null){
      user_photo = "./img/photo_user/"+this.state.session.user_photo ;
      last_name = this.state.session.last_name
    }

    return <div id="nav">
      <a href="#" className="menu-open">
        <span className="burger">
          <span>                    </span>
        </span>
        <span onClick={this.showPanel} className="text">
          Buyer {last_name}
        </span>
      </a>
      <a href="#" className="user-photo menu-open">
        <img src={user_photo} height="51" width="51" alt="image description" />
      </a>
      <div  id="nav-prop" className="nav-drop js-slide-hidden">
        <ul>
          <li>
            <a href="/register-stock">Vender</a>
          </li>
          <li>
            <a href="http://adsigo.co/user/dashboard">Panel de Administracion</a>
          </li>
          <li>
            <a href="http://adsigo.co/user/profile">Perfil</a>
          </li>
          <li>
            <a href="/user/orders">Mis Compras</a>
          </li>
          <li>
            <a onClick={this.logOut} href="#">Salir</a>
          </li>
        </ul>
      </div>
    </div>;
  }
  showPanel (){
    document.getElementById("nav-prop").classList.toggle("shown");
  }
  logOut (){
    localStorage.setItem('session',null)
    localStorage.removeItem('session');
    setTimeout (function (){
      location.reload();
    },100)

  }

};
