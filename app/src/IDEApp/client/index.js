import { Accounts } from 'meteor/std:accounts-ui';
import 'IDEApp/methods/methods';
import {  push } from 'react-router-redux';
import { browserHistory } from 'react-router';

Accounts.ui.config({
    requestPermissions: {
        github: ['user', 'repo']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    homeRoutePath: '/workspace',
    onSignedInHook: () =>  browserHistory.push('/workspace'),
    onSignedOutHook: () => browserHistory.push('/signin'),
    loginPath: '/signin',
    signUpPath: '/signup',
    resetPasswordPath: '/reset-password',
    profilePath: '/',
    minimumPasswordLength: 4
});