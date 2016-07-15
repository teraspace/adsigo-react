import React from 'react'
import ReactDOM from 'react-dom'

class LandingGallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = { gallery: [] }
  }

  componentWillMount() {
  console.log('componentWillMount');
    // fetch('http://adsigo.teraspace.co:8080/api/login',{method: 'POST'})
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((empleados) => {
    //     this.setState({ empleados: empleados })
    //   })
  }

  render() {
    if (this.state.gallery.length > 0) {
      return (
        <div className="container-fluid">

        </div>
      )
    } else {
      return <p className="text-center">Cargando LandingGallery...</p>
    }
  }

}

export default LandingGallery
