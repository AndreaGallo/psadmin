"use strict";

var React = require('react');
var AuthoForm = require('./authorForm');

var ManageAuthorPage = React.createClass({

    getInitialState: function () {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            }
        };
    },

    setAuthorState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        this.setState({
            author: this.state.author
        });
    },

    render() {
        return (
            <AuthoForm author={this.state.author} onChange={this.setAuthorState}/>
        );
    }
});

module.exports = ManageAuthorPage;