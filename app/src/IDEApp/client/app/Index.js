import React, { Component } from 'react';
//import Tracker from 'npm';
import {  push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

const AdminPage = () => (
    <h3>Admin</h3>
);

export default class Index extends Component {
    constructor(props){
        super(props);

    }

    componentWillMount() {
        // Check that the user is logged in before the component mounts
            console.log("push to /signin before compount mount");
           // browserHistory.push('/hello');
    }

    componentDidUpdate() {
        // Navigate to a sign in page if the user isn't authenticated with data changes
            console.log("push to /signin on compount update");
         //   browserHistory.push('/hello');
    }

    render() {
        return <AdminPage {...this.state} />;
    }
}