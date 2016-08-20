import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MainMenu from './MainMenu';
import Helmet from 'react-helmet';
import {Grid, Row, Col} from 'react-bootstrap';
import start from 'MainApp/common/app/start';
import Sidebar from 'IDEApp/client/components/Sidebar';
import Ide from 'IDEApp/client/components/Ide';
import createSidebarButtons from 'IDEApp/client/lib/createSidebarMenuButtons';

// methods
import 'IDEApp/methods/methods';


// Styles
import '../stylesheets/app.import.css';


@connect((state)=> state, null)
export default class App extends Component {

    static propTypes = {
        //children: PropTypes.object.isRequired,
        currentLocale: PropTypes.string.isRequired,
    };

    create(menu) {
        return createSidebarButtons(menu);
    }

    render() {
        const { ui, children, currentLocale, location } = this.props;
        return (
            <div >
                <Sidebar ui={ui} mainMenu={this.create(MainMenu)}/>
                <Ide />

            </div>
        )
    }

}

App = start(App);

export default connect(state => ({
    currentLocale: state.intl.currentLocale,
    ui: state.ui
}))(App);
