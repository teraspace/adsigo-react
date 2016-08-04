import React from 'react';
import Header from '../header';
import Landing from '../landing';

class AdsigoApp extends React.Component {
    constructor(props) {
        super(props);
    }
	componentDidMount () {
    var evt = document.createEvent('Event');
    evt.initEvent('load', false, false);
    window.dispatchEvent(evt);


}

    render() {

        return <Header />;
    }
}
export default AdsigoApp;
