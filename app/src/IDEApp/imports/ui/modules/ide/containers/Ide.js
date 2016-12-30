import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { graphql, compose as apolloCompose } from 'react-apollo';
import { push as routeTo } from 'react-router-redux';
import { WORKSPACE_LIST } from '../../application/queries';
import  SplitPane from 'react-split-pane';
import FileExplorerContainer from './FileExplorerContainer';
import PanelComponents from './PanelComponents';
import logger from 'cdm-logger';

import "../stylesheets/ide.less";

class Ide extends Component {
  render() {
    let { workspaces, params: { id } } = this.props;
    console.log(this.props);
    return (
      workspaces[id] ? (
          <div id="ide" className="workspace active logged workspace-folder workspace-other">
            <SplitPane split="vertical" minSize={150} maxSize={-600} defaultSize={406}>
              <FileExplorerContainer workspaceId={id}/>
              <PanelComponents workspaceId={id}/>
            </SplitPane>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="box-not-found">Box not found!</h1>
            <Link className="btn btn-primary btn-raised" to="/app/dashboard">Go to dashboard</Link>
          </div>
        )
    );
  }
}


export default apolloCompose(
  connect(null, null),
  graphql(WORKSPACE_LIST, {
    props: ({ ownProps, data: { workspace, loading } }) => {
      console.log('>>', workspace, loading);
      return ({
        loading, workspaces: workspace,
      })
    },
  }),
)(Ide);
