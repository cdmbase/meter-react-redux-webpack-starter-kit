import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {Grid, Row, Col} from 'react-bootstrap';
import start from '../../common/app/start';
import Header from './layouts/Header';
import Footer from './layouts/Footer';



// Styles
import '../stylesheets/initial.less';



@connect((state)=> state, null)
class Main extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired,
        currentLocale: PropTypes.string.isRequired,
    };
    render() {
        const { appReducer, children, currentLocale, location } = this.props;

        return (
            <div >
                <Header />
                {children}
                <Footer />

            </div>
        )
    }

}

Main = start(Main);

export default connect(state => ({
    currentLocale: state.intl.currentLocale,
}))(Main);
