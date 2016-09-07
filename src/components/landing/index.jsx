import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI';
import x from '../../server/ConstantsSocket';
import LandingGallery from '../landing-gallery'
import LandingDetail from '../landing-detail';
var landingGallery = [];
var loading = false;
var qty = 0;
class Landing extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      session: JSON.parse(localStorage.getItem('session')),
      billboards: [],
      step: 0
    }
  }

  componentDidMount(){
    this.loadLanding ()
  }
  componentDidUpdate() {
    //console.log('componentDidUpdate')
    var that = this;
    var evt = document.createEvent('Event');
    evt.initEvent('load', false, false);
    window.dispatchEvent(evt);
    var win = $(window);
    win.scroll(function() {
      // End of the document reached?
      if ($(document).height() - win.height() == win.scrollTop()) {
        $('#loading').show();
        that.state.step=that.state.step+6;
        that.loadLanding ()
      }
    });
    $('#filtrar').click( function(){
      //console.log('filtrar')
      that.state.step = 0;
      landingGallery = []
      that.loadLanding ()
    })
  }
  loadLanding (){
    var that = this;
    var token,selectPrice,selectTypestock, fromdate, todate='';
    if($('#fromdate').val()!=null){
      if($('#fromdate').val().length!=0){
        var fdate = $('#fromdate').val().split('/')
        fromdate = fdate[2] + "-" + fdate[1] + "-" + fdate[0]
        var tdate = $('#todate').val().split('/')
        todate = tdate[2] + "-" + tdate[1] + "-" + tdate[0]
      }
    }


    selectPrice = $('#selectPrice').val();
    selectTypestock = $('#selectTypestock').val();
    //console.log(selectTypestock)
    try {
      if ('session' in that.state)
      token=that.state.session.v_user_token

    }catch(err){
      token=''
    }
    var payload = JSON.stringify({
      in_user_token :token,
      in_date_start:fromdate,
      in_date_end :todate,
      in_id_type_stock:selectTypestock,
      in_id_price_range :selectPrice,
      in_id_country :'CO',
      in_id_city :null,
      in_offset:0,
      in_limit:that.state.step+6
    });
    //console.log(payload)
    if(!loading){
      loading = true;
    fetch(x.globals.hostaddress+'/api/landing',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    }) .catch((err) => {
      console.log(err)
      setTimeout(() => {
        loading = false;
        that.loadLanding()
      },1000)
    })
    .then((response) => {
      return response.json()
    }).then((billboards) => {
      loading = false;
      //console.log(billboards)
      this.setState({ billboards: billboards.data })
    })
  }
  }
  render() {
var footerApp = []


    if (this.state.billboards.length > 0) {
      landingGallery = []

      var billboards = this.state.billboards;

      billboards.forEach(function(billboard, index){
        landingGallery.push(
          <LandingGallery key={'item'+index} data={billboard} />
        )
      })
    //  footerApp.push(<p className="text-center">Cargando Landing...</p>)
    }
    if(qty!=this.state.billboards.length){
      footerApp.push(<p className="text-center">Cargando Landing...</p>)
    } else {
      footerApp.push(<footer key={"footer1"} id="footer">
                      <a href="#" className="btn-help"><span>Need Help</span> <i className="icon-help-circle"></i></a>
                    </footer>)
    }
    qty=this.state.billboards.length
    return (
      <div id="landing">  <Header />
      <div className="ajax-holder inner ">

        <ul className="filter-content inner same-height infinite-scroll">
          {landingGallery}

        </ul>
      </div>
        {footerApp}
    </div>
  )


}

}

export default Landing
