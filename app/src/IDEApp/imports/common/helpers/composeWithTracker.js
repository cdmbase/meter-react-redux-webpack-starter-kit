import {compose} from "react-komposer";
import {Tracker} from "meteor/tracker";

function getTrackerLoader(loaderFunc) {
    return (props, onData, env) => {

        let trackerCleanup = null;

        const handler = Tracker.nonreactive(() => {
            return Tracker.autorun(() => {
                // Store clean-up function if provided.
                trackerCleanup = loaderFunc(props, onData, env);
            });
        });

        return () => {
            if(typeof trackerCleanup === 'function') trackerCleanup();
            return handler.stop();
        };
    };
}

function composeWithTracker(loadFunc) {
    return function(component) {
        return compose(getTrackerLoader(loadFunc))(component);
    };
}

export default composeWithTracker;