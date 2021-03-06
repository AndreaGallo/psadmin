"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function (transition, component) { // to protect from losing work
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function () {  //we choose update the author data here because this method doesn't produce a re-render
        var authorId = this.props.params.id;

        if (authorId) {
            this.setState({
                author: AuthorStore.getAuthorById(authorId)
            });
        }
    },

    setAuthorState: function (event) {
        this.setState({
            dirty: true
        });
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        this.setState({
            author: this.state.author
        });
    },

    isAuthorFormValid: function () {
        var formValid = true;
        this.state.errors = {};

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = "First Name should have at least 3 characters";
            formValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = "Last Name should have at least 3 characters";
            formValid = false;
        }

        this.setState({
            errors: this.state.errors
        });

        return formValid;
    },

    saveAuthor: function (event) {
        event.preventDefault();
        if (!this.isAuthorFormValid()) {
            return;
        }

        if(this.state.author.id){
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);
        }
        
        this.setState({
            dirty: false
        });
        toastr.success('Author saved');
        this.transitionTo('authors');

    },

    render() {
        return (
            <AuthorForm author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors} />
        );
    }
});

module.exports = ManageAuthorPage;