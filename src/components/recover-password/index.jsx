import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI';
import x from '../../server/ConstantsSocket';
import LandingGallery from '../landing-gallery'

export default class RecoverPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: []
        };
        this.sendPassword = this.sendPassword.bind(this)
    }

    componentWillMount() {
      $('html').addClass('page-center')
      $('body').addClass('page-center')
        $('#aplicacion').addClass('page-center')

    }
  componendDidMount(){

}
    render() {
        var that = this;

            return  <main id="main" role="main">
                      <Header />
                        <ol className="login-steps" style={{position:'relative',top:'100px'}}>
                              <div className="row required-row" >

                                    <div className="label-holder">
                                      <label htmlFor="mail"> Enter your mail and click Send:</label>
                                    </div>
                                    <input key={12} className="required-select login-form" id="mail"   name="mail" required  />

                              </div>
                              <div className="row required-row" style={{marginTop:'50px'}} >
                                <button onClick={this.sendPassword}>Send</button>
                              </div>
                        </ol>

                    </main>
    }
    sendPassword (){
      var that = this;
      var payload = JSON.stringify({
        in_mail: document.getElementById('mail').value
      })
      fetch(x.globals.hostaddress+'/api/restore-password',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "params=" + payload
      }

      ).catch((error)=>{
        console.log(err)
        setTimeout(() => {
          that.sendPassword()
        },1000)
      }).then((response) => {
        return response.json()
      }).then((password) => {
        console.log(password)
        if (!password.success && password.code=='API_MESSAGE'){
          openMessage(password.message, function(){window.location="/"})
        }
        that.setState({password: password})
      })
    }
}
