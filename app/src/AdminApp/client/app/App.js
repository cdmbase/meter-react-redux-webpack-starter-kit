import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import start from '../../../common/app/start';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import AdminPage from '../../imports/ui/components/AdminPage';


class App extends Component {

  render() {
    const { ui, children, currentLocale, location } = this.props;
    return (
            <div >
                {this.props.children || <AdminPage /> }
            </div>
    );
  }

}
App = start(App);

export default connect(state => ({
  ui: state.ui,
}))(App);
