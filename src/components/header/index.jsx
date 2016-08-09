import React from 'react';
import PanelConfiguracion from '../panel-configuracion'
import Login from '../login'
var that;
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session'))
    };
  }

  componentWillMount() {

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
											<input type="search" placeholder="Ciudad, Región, Tipo de Medio" />
											<button type="submit"><i className="icon-search"></i></button>
										</fieldset>
									</form>
								</div>
							</div>
						</div>
						<a href="#" className="btn-filter inner"><span>Filtro <span className="none">Avanzado</span></span></a>
					</div>
					<div className="help-desk"><a href="#">?</a></div>
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
									<input  className="js-date-field date-from" type="text" placeholder="Fecha Inicio"  name="fromdate" id="fromdate" />
								</div>
							</div>
							<div className="js-date-open-close">
								<div className="date-holder">
									<input className="js-date-field date-to" type="text" placeholder="Fecha Final"  name="todate" id="todate" />
								</div>
							</div>
						</div>
					</li>
					<li>
            <div className="filter-right">
                <select id="selectTypestock" className="sorting-select">
                  <option value={0} data-sort="symbol">Formato</option>

      						<option value={1} data-sort="symbol">Valla Externa</option>
      						<option  value={2} data-sort="symbol">Paradero</option>
      						<option  value={3} data-sort="symbol" >Valla Externa Digital</option>

      					</select>
  						</div>
					</li>
					<li>
						<a href="#" className="drop-opener"><span>Ciudad</span></a>
						<div className="drop">
							<ul className="checkbox-list">
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-3" />
										<label htmlFor="checkbox-3">Miami</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-4" />
										<label htmlFor="checkbox-4">Las Vegas</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-5" />
										<label htmlFor="checkbox-5">San Francisco</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-6" />
										<label htmlFor="checkbox-6">Rio de Janeiro</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-7" />
										<label htmlFor="checkbox-7">Buenos Aires</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-8" />
										<label htmlFor="checkbox-8">Santiago</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-9" />
										<label htmlFor="checkbox-9">Barranquilla</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-10" />
										<label htmlFor="checkbox-10">Paris</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-11" />
										<label htmlFor="checkbox-11">London</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-12" />
										<label htmlFor="checkbox-12">Lima</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-13" />
										<label htmlFor="checkbox-13">Quito</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<input type="checkbox" id="checkbox-14" />
										<label htmlFor="checkbox-14">Toronto</label>
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
					<div className="filter-right">
              <select id="selectPrice" className="sorting-select">
    						<option value={0} data-sort="symbol">Precio</option>
    						<option  value={1} data-sort="symbol">0 - $1.000.000</option>
    						<option  value={2} data-sort="symbol" >$1.000.000 - $5.000.000</option>
    						<option  value={3} data-sort="number">$10.000.000 - $20.000.000</option>
    						<option  value={4} data-sort="number" >$20.000.000 - y superior</option>
    					</select>
						</div>
					</li>
				</ul>
				<div className="filter-right">
					<label htmlFor="select">Ordernar por:</label>
					<select id="select" className="sorting-select">
						<option data-sort="symbol">Relevancia</option>
						<option data-sort="symbol">A - Z</option>
						<option data-sort="symbol" data-ascending="false">Z - A</option>
						<option data-sort="number">0 - 9</option>
						<option data-sort="number" data-ascending="false">9 - 0</option>
					</select>
				</div>
				<button id="filtrar" className="button">Aplicar Filtros</button>
			</fieldset>
		</div>
	</header>
}
loginResponse(response) {
  console.log('refresh');
  that.setState({session:response})
}

}
