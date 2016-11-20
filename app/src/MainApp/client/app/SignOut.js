import React from 'react';
import { Accounts, STATES } from 'meteor/veeramarni:accounts-bootstrap';

const SignOut = () => {

    return (
        <Accounts.ui.LoginForm fromState={ STATES.PROFILE } />
    )
};

export default SignOut;