"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
    getInitialState() {
        return { authors: [] };
    },

    componentDidMount() {
        if (this.isMounted()) {
            this.setState({
                authors: AuthorApi.getAllAuthors()
            });
        }
    },

    render() {
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;