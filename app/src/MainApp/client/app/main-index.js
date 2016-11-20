import React, { Component } from 'react';
import Tracker from 'tracker-component';
import {  push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import Home from 'Home';


export default class Index extends Tracker.Component {
    constructor(props) {
        super(props);
        this.autorun(() => {
            this.setState({
                isAuthenticated: Meteor.user()
            });
        });

    }

    componentWillMount() {
        // Check that the user is logged in before the component mounts
      //  browserHistory.push('/');
    }

    componentDidUpdate() {
        // Navigate to a sign in page if the user isn't authenticated with data changes
       // browserHistory.push('/');
    }

    render() {
        return <Home {...this.state} />;
    }
}