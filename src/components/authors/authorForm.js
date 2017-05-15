"use strict";

var React = require('react');

var Input = require('../common/inputText');

var AuthoForm = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render() {
        return (
            <form action="">
                <h1>Manage Author</h1>

                <Input name="firstName" 
                       label="First Name" 
                       onChange={this.props.onChange} 
                       value={this.props.author.firstName} 
                       error={this.props.errors.firstName}/>
                <br />

                <Input name="lastName" 
                       label="Last Name" 
                       onChange={this.props.onChange} 
                       value={this.props.author.lastName} 
                       error={this.props.errors.lastName}/>
                <br />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave}/>
            </form>
        );
    }
});

module.exports = AuthoForm;