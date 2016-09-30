import React from 'react';
import ReactDOM from 'react-dom';
import _ from '../../server/ConstantsAPI';
import x from '../../server/ConstantsSocket';

var that ;
export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session'))
    };
  }

  componentWillMount() {
    console.log('xxxxxxxxxx');
  }

  render() {

    that = this;
    return <div id="nav" className='login'>
      <a  onClick={this.showPanel} href="#" className="menu-open">
        <span className="burger">
          <span>                    </span>
        </span>
        <span  className="text">Login</span>
      </a>
      <a href="#" className="user-photo menu-open">
        <img src="../img/ico-menu.png" height="51" width="51" alt="image description" />
      </a>
      <div id="nav-prop" className="nav-drop shown js-slide-hidden" >
        <div className="holder">
          <div className="input-wrap ico-email">
            <input id="email" name="email" type="email" placeholder="E-mail" required />
          </div>
          <div className="input-wrap ico-key">
            <input id="password" name="password" type="password" placeholder="Password" required />
          </div>
          <input type="submit" className="btn" value="Login" onClick={that.login} />
          <a href="/register" className="btn btn-green">New? Sign In!</a>
          <div className="recover-link">
            <a href="/recover-password">Recover Password.</a>
          </div>
        </div>
      </div>
    </div>;
  }

  login() {


    console.log('onLoginClick');
    fetch(x.globals.hostaddress+'/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + JSON.stringify({
        in_mail: document.getElementById('email').value,
        in_password: document.getElementById('password').value,
        in_languaje: 'US',
        in_ip_user_host: ''
      })
    }).then((response) => {
      return response.json();
    }).then((session) => {
      console.log(session);
      if (!session.success && session.code=='API_MESSAGE'){

        $('#modalContainer').on('show.bs.modal', function (e) {
          $('#noButton').hide();
          $('#modalTitle').text('Atención');
          $('#modalBody').text(session.message);
          $('#yesButton').text('Aceptar').click(function(e){
            console.log(e)
            $('#modalContainer').modal('hide');
          })
        }).modal();

        return;
      }
      localStorage.setItem('session',JSON.stringify(session.data[0]));
      localStorage.setItem('country',session.data[0].id_country);
      that.props.loginResponse(session);

    });
  }
  showPanel (){
    console.log('showPanel');
    document.getElementById("nav-prop").classList.toggle("shown");
  }
};
