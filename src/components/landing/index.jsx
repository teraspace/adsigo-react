import React from 'react'
import ReactDOM from 'react-dom'
import LandingGallery from '../landing-gallery'
class Landing extends React.Component {

  constructor(props) {
    super(props)
    this.state = { products: [] }
  }

  componentWillMount() {
  console.log('componentWillMount');
    fetch(_.globals.hostaddress+'/api/login',{method: 'POST'})
      .then((response) => {
        return response.json()
      })
      .then((products) => {
        this.setState({ products: products })
      })
  }

  render() {
    if (this.state.products.length > 0) {
      return (
        <div className="container-fluid">
          <LandingGallery  />
        </div>
      )
    } else {
      return <p className="text-center">Cargando Landing...</p>
    }
  }

}

export default Landing
