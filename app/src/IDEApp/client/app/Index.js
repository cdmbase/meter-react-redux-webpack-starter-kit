import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MainMenu from './main-menu';
import Helmet from 'react-helmet';
import start from 'MainApp/common/app/start';

import Dashboard from '../../imports/app/modules/application/components/dashboard';
// Styles
import '../stylesheets/main.less';


export default class App extends Component {


    create(menu) {
        return createSidebarButtons(menu);
    }

    render() {
        const { ui, children, currentLocale, location } = this.props;
        return (
            <div >
                {this.props.children || <Dashboard /> }
            </div>
        )
    }

}

App = start(App);

export default connect(state => ({
    ui: state.ui
}))(App);
