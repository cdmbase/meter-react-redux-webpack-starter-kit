import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import start from '../../../common/app/start';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import AdminPage from '../../imports/ui/components/AdminPage';


class App extends Component {

  render() {
    const { ui, children } = this.props;
    return (
            <div >
                {this.props.children || <AdminPage /> }
            </div>
    );
  }

}

App.propTypes = {
  ui: React.PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default connect(state => ({
  ui: state.ui,
}))(App);
