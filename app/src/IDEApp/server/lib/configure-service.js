
const services = Meteor.settings.private.oAuth;

const configureService = () => {
    if ( services ) {
        for( let service in services ){
            ServiceConfiguration.configurations.upsert( { service: service }, {
                $set: services[service]
            });
        }
    }
};

export default configureService;