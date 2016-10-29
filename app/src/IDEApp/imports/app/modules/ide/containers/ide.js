import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import  SplitPane from 'react-split-pane';
import FileExplorerContainer from './FileExplorerContainer';
import PanelComponents from './PanelComponents';

import { select, box } from '../actions/box-action';

import "../stylesheets/ide.less";

class Ide extends Component {
    constructor() {
        super(...arguments);
    }

    render() {

        let { workspace, params: { id } } = this.props;
        return (
            workspace ? (
                <div id="ide" className="workspace active logged workspace-folder workspace-other">
                    <SplitPane split="vertical" minSize={150} maxSize={-600} defaultSize={406}>
                        <FileExplorerContainer workspaceId={id}/>
                        <PanelComponents workspace={workspace[id]} workspaceId={id} />
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



const mapStateToProps = ({jobs, editor, workspaces: {list, selected, settings, files, trees }}) => ({
    workspace: list,
});

export default connect(mapStateToProps, null)(Ide);
