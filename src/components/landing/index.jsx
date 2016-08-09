import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../header'
import _ from '../../server/ConstantsAPI';
import LandingGallery from '../landing-gallery'
class Landing extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      session: JSON.parse(localStorage.getItem('session')),
      billboards: [],
      step: 0
    }
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.loadLanding ()
  }
  componentDidMount(){

  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
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
      console.log('filtrar')
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
      in_id_type_stock:0,
      in_id_price_range :selectPrice,
      in_id_country :'CO',
      in_id_city :null,
      in_offset:0,
      in_limit:that.state.step+6
    });
    console.log(payload)
    fetch(_.globals.hostaddress+'/api/landing',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    })
    .then((response) => {
      return response.json()
    })
    .then((billboards) => {
      this.setState({ billboards: billboards.data })
    })
  }
  render() {
    if (this.state.billboards.length > 0) {
      var landingGallery = []
      var billboards = this.state.billboards;
      billboards.forEach(function(billboard, index){
        landingGallery.push(
          <LandingGallery key={'item'+index} data={billboard} />
        )
      })
    }
    return (
      <div id="landing">  <Header />
      <div className="ajax-holder inner ">

        <ul className="filter-content inner same-height infinite-scroll">
          {landingGallery}

        </ul>
      </div>
      <p className="text-center">Cargando Landing...</p>
    </div>
  )


}

}

export default Landing
