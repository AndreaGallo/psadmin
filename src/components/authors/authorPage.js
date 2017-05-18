"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorPage = React.createClass({
    getInitialState() {
        return { authors: AuthorStore.getAllAuthors() };
    },

    componentWillMount() {
        AuthorStore.addChangeListener(this._onChange);
        
    },
    //Clean up when this component is unmounted
    componentWillUnmount() {
        AuthorStore.removeChangeListener(this._onChange);
        
    },

    _onChange: function () {
        this.setState({
            authors: AuthorStore.getAllAuthors()
        });
    },

    deleteAuthor: (id) => {
         AuthorActions.deleteAuthor(id);
         toastr.success('Author deleted!');
    },

    render() {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors} deleteAuthor={this.deleteAuthor}/>
            </div>
        );
    }
});

module.exports = AuthorPage;