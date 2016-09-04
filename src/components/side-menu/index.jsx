import React from 'react';
import ReactDOM from 'react-dom';



export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: JSON.parse(localStorage.getItem('session'))
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  render() {


    return <aside id="sidebar">
            <nav className="side-nav">
              <ul>
                <li><a href="#">My Sells<span style={{display:'none'}} className="number">3</span></a></li>
                <li><a href="/my-billboards">My Billboards</a></li>
                  <ul>
                    <li><a href="/register-stock">Add New Billboard</a></li>
                  </ul>
                <li><a href="#">My Profile</a></li>
                  <li><a href="#">My Availibility</a></li>
              </ul>
            </nav>
          </aside>;
  }


};
