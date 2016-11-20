import React from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-bootstrap';

const SignOut = () => {

    return (
        <Accounts.ui.LoginForm fromState={ STATES.PROFILE } />
    )
};

export default SignOut;