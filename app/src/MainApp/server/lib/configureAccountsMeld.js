import { Meteor } from 'meteor/meteor'
import { AccountsMeld } from 'meteor/splendido:accounts-meld'



const configureAccountsMeld = () => {
    AccountsMeld.configure({
        askBeforeMeld: true
    })
};


export default configureAccountsMeld;