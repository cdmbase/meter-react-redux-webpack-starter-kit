import React, { PropTypes, Component } from 'react';
import Tracker from 'tracker-component';
import { Accounts, STATES } from 'meteor/std:accounts-bootstrap';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';


export default class Profile extends Tracker.Component {


  render() {
    return (
            <div className="container">
                <Accounts.ui.LoginForm fromState={STATES.PROFILE} />
            </div>
    );
  }

}
