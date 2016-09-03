import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket';

import SideMenu from '../side-menu'
var that;
var uploadPhoto = [];
//{"id_user":90,"name":"Carlos","user_photo":"34325232.png","phone":"1221231","address":"Cra 53 No. 80","email":"qqwq@gmail.com","id_country":"CO","id_city":"0","fk_id_restriction":1,"v_user_token":"GukQEeeINTLVK64"}
export default class MySells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session')),
      billboards: []
    };

  }
  componentWillMount(){
    var token,iduser;
    var that = this;
    try {
      if ('session' in that.state)
      token=that.state.session.v_user_token
      iduser=that.state.session.id_user
    }catch(err){
      token=''
    }
    var payload = JSON.stringify({
      in_user_token :token,
      in_fk_id_user:iduser
    });
    console.log(payload)
    fetch(x.globals.hostaddress+'/api/get-stock',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }).then((response) => {
      return response.json()
    }).then((billboards) => {
      this.setState({ billboards: billboards.data })
    })

  }
  componendDidUpdate () {
  console.log('componendDidUpdate')
}
  componentDidMount (){
     myload()

  }
  render() {
    that = this;
    var billboards = this.state.billboards;
    var listaBillboards = []
    billboards.forEach(function(billboard,index){
      listaBillboards.push(
                    <tr key={"fila"+index}>
      								<td key={"col1"} data-label="# de Espaclo"><span>{billboard.id_stock}</span></td>
      								<td key={"col2"} data-label="Nombre de Espaclo"><span>{billboard.name}</span></td>
      								<td key={"col3"} data-label="Cludad"><span>{billboard.ciudad}</span></td>
      								<td key={"col4"} data-label="Dirección"><span>{billboard.address}</span></td>
      								<td key={"col5"} data-label="Preclo por Día"><span>{billboard.daily_price}</span></td>
      								<td key={"col6"} data-label="Preclo por Impreslón"><span>{billboard.production_price}</span></td>
      								<td key={"col7"} data-label="Tamaño Vlsual"><span>{billboard.size}</span></td>
      								<td key={"col8"} data-label="View / Edit Billboard"><strong><a href="#" className="ico-box"><i className="icon-eye1"></i></a><a href="#" className="ico-box"><i className="icon-pencil"></i></a></strong></td>
      							</tr>)
    })

    return  <main id="main" className="register-stock" role="main">
      <Header />
        <div id="content">
          <div className="content-holder order-detail">
    				<h1><img src="images/ico1.png" height="34" width="32" alt="image description" />Mis Espacios</h1>
    				<div className="shopping-sales-report">
    					<form action="#" className="sales-filter-form">
    						<fieldset>
    							<div className="left-box">
    								<span className="title-text">Organizar por:</span>
    								<span className="select-wrap big">
    									<select className="sales-select">
    										<option>Option 1</option>
    										<option>Option 2</option>
    									</select>
    								</span>
    							</div>
    							<div className="search-box">
    								<span className="title-text">Buscar:</span>
    								<span className="input-wrap">
    									<input type="search" />
    									<button type="submit"><i className="icon-search"></i></button>
    								</span>
    							</div>
    						</fieldset>
    					</form>
    					<table className="sales-table order">
    						<colgroup>
    							<col className="col1" />
    							<col className="col2" />
    							<col className="col3" />
    							<col className="col4" />
    							<col className="col5" />
    							<col className="col6" />
    							<col className="col7" />
    							<col className="col8" />
    						</colgroup>
    						<thead>
    							<tr>
    								<th># de Espaclo</th>
    								<th>Nombre de Espaclo</th>
    								<th>Cludad</th>
    								<th>Dirección</th>
    								<th>Preclo por Mes Día</th>
    								<th>Preclo por Impreslón</th>
    								<th>Tamaño Vlsual</th>
    								<th>Ver / Edltar Espaclo</th>
    							</tr>
    						</thead>
    						<tbody>

                  {listaBillboards}
    						</tbody>
    					</table>
    					<div className="link-holder">
    						<a href="#" className="right">Siguiente Página &gt;&gt;</a>
    					</div>
    				</div>
    			</div>
        </div>
      <SideMenu />
    </main>

  }



}
