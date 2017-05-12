"use strict";

var React = require('react');

var Input = require('../common/inputText');

var AuthoForm = React.createClass({

    render() {
        return (
            <form action="">
                <h1>Manage Author</h1>

                <Input name="firstName" 
                       label="First Name" 
                       onChange={this.props.onChange} 
                       value={this.props.author.firstName} />
                <br />
                
                <Input name="lastName" 
                       label="Last Name" 
                       onChange={this.props.onChange} 
                       value={this.props.author.lastName} />
                <br />

                <input type="submit" value="Save" className="btn btn-default" />
            </form>
        );
    }
});

module.exports = AuthoForm;