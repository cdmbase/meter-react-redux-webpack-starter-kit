import './startup';
import { Accounts } from 'meteor/accounts-base';
import logger from 'cdm-logger'

// Accounts.onCreateUser(function (options, user) {
//     logger.debug("User", user);
//     user.profile = options.profile || {username: user};
//     return user;
// });