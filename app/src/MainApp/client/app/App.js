import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MainMenu from './MainMenu';
import Helmet from 'react-helmet';
import {Grid, Row, Col} from 'react-bootstrap';
import start from '../../common/app/start';
import Header from './layouts/Header';
import Footer from './layouts/Footer';


// Styles
import '../stylesheets/app.import.css';


@connect((state)=> state, null)
export default class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired,
        currentLocale: PropTypes.string.isRequired,
    };

    create(menu) {
        return createSidebarButtons(menu);
    }

    render() {
        const { appReducer, children, currentLocale, location } = this.props;
        return (
            <div >
                <Sidebar ui={appReducer.ui} mainMenu={this.create(MainMenu)}/>
                <Ide />

            </div>
        )
    }

}

App = start(App);

export default connect(state => ({
    currentLocale: state.intl.currentLocale,
}))(App);
