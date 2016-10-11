import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket';
import { Router, Route, Link, browserHistory } from 'react-router'
import SideMenu from '../side-menu'
var that;
var uploadPhoto = [];
//{"id_user":90,"name":"Carlos","user_photo":"34325232.png","phone":"1221231","address":"Cra 53 No. 80","email":"qqwq@gmail.com","id_country":"CO","id_city":"0","fk_id_restriction":1,"v_user_token":"GukQEeeINTLVK64"}
export default class MyBillboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session')),
      billboards: []
    };
    this.editBillboard = this.editBillboard.bind(this)

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
    })

    .then((response) => {
      return response.json()
    }).then((billboards) => {
      that.setState({ billboards: billboards.data })
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
      								<td key={"col1"} data-label="# Billboard"><span>{billboard.id_stock}</span></td>
      								<td key={"col2"} data-label="Name"><span>{billboard.name}</span></td>
      								<td key={"col3"} data-label="City"><span>{billboard.ciudad}</span></td>
      								<td key={"col4"} data-label="Address"><span>{billboard.address}</span></td>
      								<td key={"col5"} data-label="Price per day"><span>{billboard.daily_price.formatMoney()}</span></td>
      								<td key={"col6"} data-label="Production price"><span>{billboard.production_price.formatMoney()}</span></td>
      								<td key={"col7"} data-label="Visual size"><span>{billboard.size}</span></td>
      								<td key={"col8"} data-label="View / Edit Billboard"><strong><a href="#" className="ico-box"><i className="icon-eye1"></i></a><a key={"edit"+index} id={"edit"+index} onClick={that.editBillboard.bind(that,billboard)} href="#" className="ico-box"><i  className="icon-pencil"></i></a></strong></td>
      							</tr>)
    })

    return  <main id="main" className="register-stock" role="main">
      <Header />
        <div id="content" style={{height:'100% !important'}}>
          <div className="content-holder order-detail">
    				<h1><img src="images/ico1.png" height="34" width="32" alt="image description" />My Billboards</h1>
    				<div className="shopping-sales-report">
    					<form action="#" className="sales-filter-form">
    						<fieldset>
    							<div className="left-box">
                    <a className="btn btn-primary btn-sm pull-left" href="/register-stock">
                        <span className="glyphicon glyphicon-plus"></span>&nbsp;
                        Add New Billboard
                    </a>
    							</div>
    							<div className="search-box">
    								<span className="title-text">Search:</span>
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
    								<th># Billboard</th>
    								<th>Name</th>
    								<th>City</th>
    								<th>Address</th>
    								<th>Price per day</th>
    								<th>Production price</th>
    								<th>Visual size</th>
    								<th>View / Edit Billboard</th>
    							</tr>
    						</thead>
    						<tbody>
                  {listaBillboards}
    						</tbody>
    					</table>
    					<div className="link-holder">
    						<a href="#" className="right">Next Page &gt;&gt;</a>
    					</div>
    				</div>
    			</div>
        </div>
      <SideMenu />
    </main>

  }

  editBillboard (billboard) {
    console.log('editBillboard')
    setBillboardSelected(billboard)
  //  localStorage.setItem('id_stock',billboard.id_stock);


  }

}
