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
      dealings: []
    };

  }
  componentWillMount(){
    var token,iduser;
    var that = this;
    var  fromdate=""
    var todate='';var dealingdate='';
    if($('#fromdatesells').val()!=null){
      if($('#todatesells').val().length!=0){
        var fdate = $('#fromdatesells').val().split('/')
        fromdate = fdate[2] + "-" + fdate[1] + "-" + fdate[0]
        var tdate = $('#todatesells').val().split('/')
        todate = tdate[2] + "-" + tdate[1] + "-" + tdate[0]
        var ddate = $('#dealingdate').val().split('/')
        dealingdate = ddate[2] + "-" + ddate[1] + "-" + ddate[0]
      }
    }

    try {
      if ('session' in that.state)
      token=that.state.session.v_user_token
      iduser=that.state.session.id_user
    }catch(err){
      token=''
    }
    var payload = JSON.stringify({
      in_user_token : token,
      in_creation_date : dealingdate,
      in_date_start : fromdate,
      in_date_end : todate
    });

    console.log(payload)
    fetch(x.globals.hostaddress+'/api/get-dealings',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }).then((response) => {
      return response.json()
    }).then((dealings) => {
      console.log(dealings)
      this.setState({ dealings: dealings.data })
    })

  }

  componentDidMount (){
    var that = this
    myload()

    $('#fromdatesells').datepicker({dateFormat:'dd/mm/yy', onClose : function(date){
      that.refresh(date)
    }})
    $('#todatesells').datepicker({dateFormat:'dd/mm/yy', onClose : function(date){
      that.refresh(date)

    }})
    $('#dealingdate').datepicker({dateFormat:'dd/mm/yy', onClose : function(date){
      that.refresh(date)

    }})
  }
  refresh(date){
    var that = this
    if($('#fromdatesells').val().trim()!="" && $('#todatesells').val().trim()!=""){
      that.componentWillMount()
    }

  }
  render() {
    that = this;
    var dealings = this.state.dealings;
    var listaDealings = []
    dealings.forEach(function(dealing,index){
      listaDealings.push(
        <tr key={"fila"+index}>
          <td key={"col1"} data-label="No. Dealing"><span>{dealing.purchase_order}</span></td>
          <td key={"col2"} data-label="Billboard's name"><span>{dealing.name}</span></td>
          <td key={"col3"} data-label="Start Date"><span>{dealing.date_start}</span></td>
          <td key={"col4"} data-label="End Date"><span>{dealing.date_end}</span></td>
          <td key={"col5"} data-label="Total Due"><span>{dealing.total_value}</span></td>
          <td key={"col6"} data-label="Dealing state"><span>{dealing.dealing_accepted}</span></td>
          <td key={"col7"} data-label="Actions"><span><strong><a href="inc/modal/modal02.html" className="ico-box btn-review fancybox.ajax"><i className="icon-eye1"></i></a><a href="inc/modal/modal03.html" className="ico-box btn-review fancybox.ajax"><i className="icon-thumb"></i></a><a href="#" className="ico-box"><i className="icon-picture"></i></a><a href="#" className="ico-box"><i className="icon-camera"></i></a></strong></span></td>
        </tr>)
      })

      return  <main id="main" className="register-stock" role="main">
        <Header />
        <div id="content" style={{height:'100% !important'}}>
          <div className="content-holder order-detail">
            <h1><img src="images/ico1.png" height="34" width="32" alt="image description" />My Sells</h1>
            <div className="shopping-sales-report">
              <form style={{ display: 'inline-box'}}  action="#" className="sales-filter-form">
                <fieldset>

                  <div style={{ display: 'inline-box', width:'auto'}}  className="left-box">
                    <span className="title-text">Sort por:</span>
                    <span className="select-wrap big">
                      <select className="sales-select jcf-hidden">
                        <option>Date Start</option>
                        <option>Option 1</option>
                      </select>
                    </span>


                  </div>
                  <div style={{ display: 'inline-box', width:'auto'}} className="left-box">
                    <div style={{width:'250px', display: 'inline'}} className="date-box inner">
                      <div className="js-date-open-close">
                        <div className="">
                          <input type="text" className="date-from1 " placeholder="Start date" name="fromdatesells" id="fromdatesells" />
                        </div>
                      </div>
                      <div className="js-date-open-close">
                        <div className="">
                          <input type="text" className="date-to1 " placeholder="End date" name="todatesells" id="todatesells" />
                        </div>
                      </div>
                      <div className="js-date-open-close">
                        <div className="">
                          <input type="text" className="date-to1 " placeholder="Dealing date" name="dealingdate" id="dealingdate" />
                        </div>
                      </div>
                    </div>
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
                    <th>No. Dealing</th>
                    <th>Billboard's name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Due</th>
                    <th>Dealing state</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listaDealings}
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



  }
