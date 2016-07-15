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


var routes = [
  ['#', AdsigoApp],
  ['/', AdsigoApp],
  ['/login', Login],
  ['/register', Register],
  ['/register-stock', RegisterStock],
  ['*', PageNotFound]
];

ReactDOM.render( <Routes routes={routes} /> , document.getElementById('aplicacion')) ;
ReactDOM.render( <ModalView />, document.getElementById('modalview')) ;
