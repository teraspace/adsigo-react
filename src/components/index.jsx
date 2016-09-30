import React  from 'react'
import ReactDOM  from 'react-dom'
import AdsigoApp  from './adsigo-app'
import Landing  from './landing'
import Login  from './login'
import Register  from './register'
import PageNotFound  from './page-not-found'
import Routes  from './routes'
import Header  from './header'
import ModalView from './modal-view';
import RegisterStock from './register-stock'
import SelectCountry from './select-country'
import MySells from './my-sells'
import MyBillboards from './my-billboards'
import BillboardDetail from './billboard-detail'
import RecoverPassword from './recover-password'
import x from '../server/ConstantsSocket';

//{"id_user":48,"first_name":"Pedri","last_name":"Martines","user_photo":"logo.png","phone":"34444","address":"KA 122.22","email":"abc@hotmail.com","id_country":"4","id_city":null,"fk_id_restriction":1,"v_user_token":"njLf6VNGkdQ3KSw"}
var Home;
var country = localStorage.getItem('country')
if(country==null){
  Home = Landing;
} else {
  Home = Landing;
}
localStorage.setItem('country','CO')
localStorage.setItem('country_name','COLOMBIA')
var routes = [
  ['#', AdsigoApp],
  ['/', Home],
  ['/login', Login],
  ['/register', Register],
  ['/register-stock/:billboard', RegisterStock],
  ['/register-stock', RegisterStock],
  ['/recover-password', RecoverPassword],
  ['/my-sells', MySells],
  ['/my-billboards', MyBillboards],
[ '/billboard-detail', BillboardDetail],
  ['*', PageNotFound]
];

ReactDOM.render( <Routes routes={routes} /> , document.getElementById('aplicacion')) ;
ReactDOM.render( <ModalView />, document.getElementById('modalview')) ;
