import React from 'react';
import PanelConfiguracion from '../panel-configuracion'
import Login from '../login'
import _ from '../../server/ConstantsAPI'
import x from '../../server/ConstantsSocket'
var that;
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session')),
      typeStock: [],
      priceRange:[],
      cities: []
    };

  }

  componentDidMount() {
    this.loadPriceRange()
    this.loadTypeStock()
    this.loadCities()



  }
  loadCities(){
    var payload = JSON.stringify({in_country: 'CO'});
    fetch( x.globals.hostaddress + '/api/cities' ,
    {   method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "params=" + payload
    })     .catch((err) => {
      console.log(err)
      setTimeout(() => {
        that.locaCities()
      },1000)
    })
    .then((response) => {
      return response.json()
    }).then((cities) => {
      that.setState({  cities: cities.data })
    })
}
  loadTypeStock(){
    var that = this
    fetch(x.globals.hostaddress+'/api/typestock',{method: 'POST'})
    .then((response) => {
      return response.json()
      })      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          that.loadTypeStock()
        },1000)
      })
    .then((typeStock) => {
      that.setState({  typeStock: typeStock.data })
    })
}
 loadPriceRange(){
    var that = this
   fetch(x.globals.hostaddress+'/api/pricerange',{method: 'POST'})
   .then((response) => {
     return response.json()
   })
   .catch((err) => {
     console.log(err)
     setTimeout(() => {
       that.loadPriceRange()
     },1000)
   })
   .then((priceRange) => {
     that.setState({  priceRange: priceRange.data })
   })
}
  componendDidMount (){
    console.log('componentWillMount');

  }
  render() {
    that = this;
    var modo ;
    //Si la sesion es nula muestra el dialogo Login
    if(this.state.session==null ){
      modo = <Login loginResponse={that.loginResponse}/>;
    }else {
      modo = <PanelConfiguracion />;
    }
    var typeStock = this.state.typeStock
    var typeStockOptions = []
    typeStockOptions.push(<option key={'ts0'}  value={0} data-sort="symbol">Format</option>)
    typeStock.forEach(function(ts,index){
      typeStockOptions.push(<option key={'ts'+(index+1)}  value={parseInt(ts.id_type_stock)} data-sort="symbol">{ts.name}</option>)
    })
    var priceRange = this.state.priceRange
    var priceRangeOptions = []
    priceRangeOptions.push(<option key={'ts0'}  value={0} data-sort="symbol">Precio</option>)
    priceRange.forEach(function(pr,index){
      priceRangeOptions.push(<option key={'pr'+(index+1)}  value={parseInt(pr.id_price_range)} data-sort="symbol">{pr.label}</option>)
    })

    var cities = this.state.cities
    var cityOptions = []
    cityOptions.push(<option key={'city0'}  value={0} data-sort="symbol">City</option>)
    cities.forEach(function(city,index){
      cityOptions.push(<option key={'city'+(index+1)}  value={parseInt(city.fk_country_id_iso)} data-sort="symbol">{city.name}</option>)
    })
    return <header id="header" className="home">
		<div className="top-holder">
			<div className="head-bar">
				<div className="hold">
					<div className="alignleft">
						<div className="search-holder">
							<a href="#" className="open-search"><i className="icon-search"></i></a>
							<div className="search-drop js-slide-hidden">
								<div className="box">
									<form action="#" className="search-form">
										<fieldset>
											<input type="search" placeholder="City, District, Billboard type" />
											<button type="submit"><i className="icon-search"></i></button>
										</fieldset>
									</form>
								</div>
							</div>
						</div>
						<a href="#" className="btn-filter inner"><span>Advanced <span className="none">Filter</span></span></a>
					</div>
          {modo}
				</div>
			</div>
			<div className="logo">
				<a href="http://adsigo.teraspace.co:8080"><img src="img/logo.png" height="27" width="79" alt="adsigo" /></a>
			</div>
		</div>
    <div action="#" id="filterPanel" className="filter-form inner shown" method="get">
			<fieldset>
				<ul className="item-list inner">
					<li>
						<div className="date-box inner">
							<div className="js-date-open-close">
								<div className="date-holder">
									<input  className="js-date-field date-from" type="text" placeholder="Start date"  name="fromdate" id="fromdate" />
								</div>
							</div>
							<div className="js-date-open-close">
								<div className="date-holder">
									<input className="js-date-field date-to" type="text" placeholder="End date"  name="todate" id="todate" />
								</div>
							</div>
						</div>
					</li>
					<li>
            <div className="filter-right">
                <select id="selectTypestock" className="sorting-select">
                  {typeStockOptions}
      					</select>
  						</div>
					</li>
					<li>
            <div className="filter-right">
                <select id="selectCity" className="sorting-select">
                  {cityOptions}
      					</select>
  						</div>
					</li>
					<li>
					<div className="filter-right">
              <select id="selectPrice" className="sorting-select">
                {priceRangeOptions}
    					</select>
						</div>
					</li>
				</ul>
				<div className="filter-right">
					<label htmlFor="select">Order by:</label>
					<select id="select" className="sorting-select">
						<option data-sort="symbol">Relevance</option>
						<option data-sort="symbol">A - Z</option>
						<option data-sort="symbol" data-ascending="false">Z - A</option>
						<option data-sort="number">0 - 9</option>
						<option data-sort="number" data-ascending="false">9 - 0</option>
					</select>
				</div>
				<button id="filtrar" className="button">Aply filter</button>
			</fieldset>
		</div>
	</header>
}
loginResponse(response) {
  console.log('refresh');
  that.setState({session:response})
     myload()
}

}
