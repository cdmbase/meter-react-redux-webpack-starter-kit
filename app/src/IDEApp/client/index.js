import { Accounts } from 'meteor/std:accounts-ui';

import 'IDEApp/methods/methods';


Accounts.ui.config({
    requestPermissions: {
        github: ['user', 'repo']
    },
    loginPath: '/'
});

