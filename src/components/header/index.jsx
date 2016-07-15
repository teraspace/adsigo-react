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
    $( "#from" ).datepicker();
    $( "#tox" ).datepicker();
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
						<a href="#" className="btn-filter"><span>Filtro <span className="none">Avanzado</span></span></a>
					</div>
					<div className="help-desk"><a href="#">?</a></div>
          {modo}
				</div>
			</div>
			<div className="logo">
				<a href="http://adsigo.teraspace.co:8080"><img src="img/logo.png" height="27" width="79" alt="adsigo" /></a>
			</div>
		</div>
		<form action="#" id="filterPanel" className="filter-form inner shown" method="get">
			<fieldset>
				<ul className="item-list">
					<li>
						<a href="#"><span>Fechas</span></a>
						<div id="dropDate" className="drop small date-box js-slide-hidden">
							<div className="js-date-open-close">
								<label For="from">Inicio:</label>
								<div className="date-holder">
									<input className="js-date-field date-from hasDatepicker" type="text" placeholder="dd/mm" id="from" />
									<i className="icon-calendar"></i>
								</div>
							</div>
							<span className="icon-arrow-down"></span>
							<div className="js-date-open-close">
								<label For="to">Final:</label>
								<div className="date-holder">
									<input className="js-date-field date-to hasDatepicker" type="text" placeholder="dd/mm" id="to" />
									<i className="icon-calendar"></i>
								</div>
							</div>
						</div>
					</li>
					<li>
						<a href="#"><span>Revista </span></a>
						<ul id="dropReview" className="drop options js-slide-hidden">
							<li>
								<a href="#">Outdoor</a>
								<div className="subdrop marked-section">
									<input className="mark-button" type="reset" value="Mark All" />
									<ul className="checkbox-list">
										<li>
											<div className="checkbox-holder">
												<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-1" className="input1" /></span>
												<label for="checkbox-1">Valla Externa Fija</label>
											</div>
										</li>
										<li>
											<div className="checkbox-holder">
												<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-2"  className="input1"  /></span>
												<label for="checkbox-2">Paradero</label>
											</div>
										</li>
										<li>
											<div className="checkbox-holder">
												<span className="jcf-checkbox jcf-checked"><span></span><input type="checkbox" checked="" id="checkbox1-2"  className="input1"  /></span>
												<label for="checkbox1-2" className="jcf-label-active">Valla Externa Digital</label>
											</div>
										</li>
									</ul>
								</div>
							</li>
							<li><a href="#">Indoor</a></li>
						</ul>
					</li>
					<li>
						<a href="#"><span>Ciudad</span></a>
						<div id="dropCities" className="drop js-slide-hidden">
							<ul className="checkbox-list">
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-3"  className="input1"  /></span>
										<label for="checkbox-3">Miami</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-4"  className="input1"  /></span>
										<label for="checkbox-4">Las Vegas</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-5"  className="input1" /></span>
										<label for="checkbox-5">San Francisco</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-6"  className="input1"  /></span>
										<label for="checkbox-6">Rio de Janeiro</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-7"  className="input1"  /></span>
										<label for="checkbox-7">Buenos Aires</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-8"  className="input1" /></span>
										<label for="checkbox-8">Santiago</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-9"  className="input1"  /></span>
										<label for="checkbox-9">Barranquilla</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-10"  className="input1" /></span>
										<label for="checkbox-10">Paris</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-11"  className="input1"  /></span>
										<label for="checkbox-11">London</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-12"  className="input1"  /></span>
										<label for="checkbox-12">Lima</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-13"  className="input1" /></span>
										<label for="checkbox-13">Quito</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-14"  className="input1" /></span>
										<label for="checkbox-14">Toronto</label>
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a href="#"><span>Precio</span></a>
						<div id="dropPrices" className="drop large-2 js-slide-hidden">
							<ul className="checkbox-list">
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-15" className="input1" /></span>
										<label for="checkbox-15">0  - $1,000,000</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-16" className="input1"  /></span>
										<label for="checkbox-16">$1,000,000  - $5,000,000</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-17"  className="input1" /></span>
										<label for="checkbox-17">$5,000,000  - $10,000,000</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-18" className="input1"  /></span>
										<label for="checkbox-18">$10,000,000  - $20,000,000</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-19" className="input1"  /></span>
										<label for="checkbox-19">$20,000,000 y superior.</label>
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a href="#"><span>Tamaño Revista</span></a>
						<div id="dropSizeReview" className="drop js-slide-hidden">
							<ul className="checkbox-list">
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-21"  className="input1"  /></span>
										<label for="checkbox-21">1 Estrella</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-22"  className="input1"  /></span>
										<label for="checkbox-22">2 Estrellas</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-23" className="input1" /></span>
										<label for="checkbox-23">3 Estrellas</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-24" className="input1"  /></span>
										<label for="checkbox-24">4 Estrellas</label>
									</div>
								</li>
								<li>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-25"  className="input1"  /></span>
										<label for="checkbox-25">5 Estrellas</label>
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a onClick={that.showAvail} href="#"><span>Disponibilidad</span></a>
						<div id="dropAvail" className="drop shown large js-slide-hidden">
							<ul className="checkbox-list">
								<li>
									<div className="question-holder">
										<a href="#">[?]</a>
										<div className="question-slide js-slide-hidden">
											<div className="slide-holder">
												<p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
											</div>
										</div>
									</div>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-26"  className="input1"  /></span>
										<label for="checkbox-26">Disponible</label>
									</div>
								</li>
								<li>
									<div className="question-holder">
										<a href="#">[?]</a>
										<div className="question-slide js-slide-hidden">
											<div className="slide-holder">
												<p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica. Li lingues differe solmen in li grammatica, li pronunciation e li. </p>
											</div>
										</div>
									</div>
									<div className="checkbox-holder">
										<span className="jcf-checkbox jcf-unchecked"><span></span><input type="checkbox" id="checkbox-27" className="input1" /></span>
										<label for="checkbox-27">NO-Disponible</label>
									</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				<div className="filter-right">
					<label For="select">Sort by:</label>
					<select id="select" className="sorting-select jcf-hidden">
						<option data-sort="symbol">A - Z</option>
						<option data-sort="symbol" data-ascending="false">Z - A</option>
						<option data-sort="number">0 - 9</option>
						<option data-sort="number" data-ascending="false">9 - 0</option>
					</select>
          <span className="jcf-select jcf-hidden jcf-unselectable jcf-select-sorting-select">
                      <span className="jcf-select-text">
                        <span className="">A - Z</span>
                      </span>
                      <span className="jcf-select-opener"></span>
          </span>
				</div>
				<button type="submit"><i className="icon-search"></i></button>
			</fieldset>
		</form>
	</header>
}
loginResponse(response) {
  console.log('refresh');
  that.setState({session:response})
}

}
