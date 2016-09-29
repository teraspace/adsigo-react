import page from 'page';
import React from 'react';
import ReactDOM from 'react-dom';

var navigate;

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: <div />
        };

        navigate = function(url) {
            return function() {
                console.log(url)
                page(url);
            };
        };
    }

    componentDidMount() {
        var self = this;

        this.props.routes.forEach(function(route) {
            var url = route[0];
            var Component = route[1];
            page(url, function(ctx) {
                self.setState({
                    component: <Component params={ctx.params} querystring={ctx.querystring} />
                });
            });
        });
        page.start();
    }

    render() {
        return this.state.component;
    }
};
