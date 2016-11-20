import React, { PropTypes, Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class SignUp extends Component {

    componentWillMount() {
        if( Meteor.user()){
            browserHistory.push('/');
        }
    }
    componentDidMount() {
        if( Meteor.user()){
            browserHistory.push('/');
        }
    }
    render () {
        return (
            <div className="container">
                <Accounts.ui.LoginForm fromState={ STATES.SIGN_UP } />
            </div>
        )
    }

};
