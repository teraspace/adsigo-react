import React from 'react';
import _ from '../../server/ConstantsAPI';

class LandingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentWillMount() {}

    render() {
        if (this.state.empleados.length > 0) {
            return <div className="container-fluid">            </div>;
        } else {
            return <p className="text-center">
                Cargando empleados...
            </p>;
        }
    }
}
// console.log('componentWillMount');
//   fetch('http://adsigo.teraspace.co:8080/login',{method: 'POST'})
//     .then((response) => {
//       return response.json()
//     })
//     .then((products) => {
//       console.log(products[0].data)
//       this.setState({ products: products[0].data })
//     })
export default LandingList;
