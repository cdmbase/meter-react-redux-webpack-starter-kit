import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import  SplitPane from 'react-split-pane';
import FileExplorerContainer from './FileExplorerContainer';
import PanelComponents from './PanelComponents';
import logger from 'cdm-logger';

import "../stylesheets/ide.less";

class Ide extends Component {
    constructor() {
        super(...arguments);
    }

    render() {

        let { workspaceList, params: { id } } = this.props;
        logger.debug("[Ide] workspace id is :", id)

        return (
            workspaceList[id] ? (
                <div id="ide" className="workspace active logged workspace-folder workspace-other">
                    <SplitPane split="vertical" minSize={150} maxSize={-600} defaultSize={406}>
                        <FileExplorerContainer workspaceId={id}/>
                        <PanelComponents workspaceId={id} />
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

const mapStateToProps = ({ workspaces: {list }} ) => ({
    workspaceList : list,
})

export default connect(mapStateToProps, null)(Ide);
