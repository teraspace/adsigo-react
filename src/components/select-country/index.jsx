import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI';
import x from '../../server/ConstantsSocket';
import LandingGallery from '../landing-gallery'

export default class SelectCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        };
        this.selectCountry = this.selectCountry.bind(this)
    }

    componentWillMount() {
      $('html').addClass('page-center')
      $('body').addClass('page-center')
        $('#aplicacion').addClass('page-center')
        var that = this;
        fetch(x.globals.hostaddress+'/api/countries',{method: 'POST',mode: 'cors'})
        .then((response) => {
          return response.json()
        })
        .then((countries) => {
          that.setState({countries: countries})
        })
    }
  componendDidMount(){

}
    render() {
        var that = this;
        var optionCountries = []
        var _countries = this.state.countries.data;
        if (_countries != null)
        _countries.forEach(function(country,index){
          optionCountries.push(<option key={'country'+index} value={country.id_iso+","+country.name}>{country.name}</option>)
          })
            return  <div id="landing-country" >
                <div className="label-holder">
                  <label htmlFor="selectCountry"> Select your country of resident:</label>
                </div>
                <select key={12} className="required-select login-form" id="selectCountry"   name="selectCountry" required >
                  {optionCountries}
                </select>
                <button onClick={this.selectCountry}>Continuar</button>
              </div>
    }
    selectCountry (){
      console.log('selectCountry')
      var x = document.getElementById("selectCountry").value.split(',');
      var session = {id_user:-1,first_name:"",last_name:"",user_photo:"",phone:"",address:"",email:"",id_country:x,id_city:null,fk_id_restriction:-1,v_user_token:""}
      localStorage.setItem('country',x[0]);
      localStorage.setItem('country_name',x[1]);
      location.reload()
    }
}
