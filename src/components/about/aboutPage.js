"use strict";

var React = require('react');

var About = React.createClass({
    statics: {
        willTransitionTo: (transition, params, query, callback) => {
            if (!confirm('Are you sure yu want to read this page?')) {
                transition.abort();
            } else {
                callback();
            }
        },
        willTransitionFrom: (transition, component) => {
            if (!confirm('Are you sure yu want to leave this page?')) {
                transition.abort();
            }
        }
    },
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <p>
                    This applicaion uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;