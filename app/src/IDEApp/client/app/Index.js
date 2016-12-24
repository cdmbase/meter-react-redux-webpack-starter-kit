import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Dashboard from '../../imports/ui/modules/application/containers/DashboardContainer';
// Styles
import '../stylesheets/main.less';

class App extends Component {
  create(menu) {
    return createSidebarButtons(menu);
  }

  render() {
    const { ui, children, currentLocale, location } = this.props;
    return (
      <div >
        {this.props.children || <Dashboard /> }
      </div>
    );
  }

}

export default connect(state => ({
  ui: state.ui,
}))(App);

