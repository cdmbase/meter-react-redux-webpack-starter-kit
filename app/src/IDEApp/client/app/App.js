import React, { PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Component from 'react-pure-render/component';
import createSidebarMenu from '../lib/createSidebarMenu';
import createSidebarButtons from '../lib/createSidebarMenuButtons';
import {Grid, Row, Col} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import * as MainMenu from './MainMenu';
import Ide from '../components/Ide';
import start from '../../common/app/start';



// Styles
import '../stylesheets/main.less';



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
        console.log(this.props);

      //  const className = appReducer.ui.isSideMenuOpen ? 'margin-left-60' : 'margin-left-60';
        //<Sidebar ui={appReducer.ui} mainMenu={this.create(MainMenu)}/>
        //<Ide />
        return (<div >
                <header />
                {children}
                <footer />

            </div>
        )
    }

}

App = start(App);

export default connect(state => ({
    currentLocale: state.intl.currentLocale,
}))(App);
