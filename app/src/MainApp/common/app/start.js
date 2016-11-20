import React, { Component, PropTypes } from 'react';
import * as actions from './actions';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

export default function start(WrappedComponent) {
    class Start extends Component {

        static propTypes = {
            intl: PropTypes.object.isRequired,
            start: PropTypes.func.isRequired
        };

        render() {
            const { intl } = this.props;
            const { currentLocale, defaultLocale, initialNow, messages } = intl;

            return (
                <IntlProvider
                    defaultLocale={defaultLocale}
                    initialNow={initialNow}
                    key={currentLocale}
                    locale={currentLocale}
                 //   messages={messages[currentLocale]}
                >
                    <WrappedComponent {...this.props} />
                </IntlProvider>
            )
        }
    }

    Start = connect(state => ({
        intl: state.intl,
    }), actions)(Start);

    return Start;
}
