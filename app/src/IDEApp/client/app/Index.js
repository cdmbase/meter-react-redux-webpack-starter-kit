import React from 'react';
import Tracker from 'tracker-component';
import {  push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

const AdminPage = () => (
    <h3>Admin</h3>
);

export default class Index extends Tracker.Component {
    constructor(props){
        super(props);
        this.autorun(() => {
            this.setState({
                isAuthenticated: Meteor.user()
            });
        });
    }

    componentWillMount() {
        // Check that the user is logged in before the component mounts
        if (!this.state.isAuthenticated){
            console.log("push to /signin before compount mount");
            browserHistory.push('/signin');
        }
    }

    componentDidUpdate() {
        // Navigate to a sign in page if the user isn't authenticated with data changes
        if (!this.state.isAuthenticated){
            console.log("push to /signin on compount update");
            browserHistory.push('/signin');
        }
    }

    render() {
        return <AdminPage {...this.state} />;
    }
}