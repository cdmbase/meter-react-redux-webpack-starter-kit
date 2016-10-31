import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { file } from '../actions/editor-action'
import { fs } from '../actions/fs-action'
import { ProjectHeader, ProjectFiles } from '../components/FileExplorer';


const FileExplorerContainer = ({ opened, actions, tree, workspaceId }) => {


    return (
        <div className="file-explorer" id="file-explorer" >
            <ProjectHeader />
            <ProjectFiles opened={opened} actions={actions} tree={tree} workspaceId={workspaceId} />
        </div>

    )
}

const mapStateToProps = ({ editor, workspaces: { files, list, trees, settings }}, { workspaceId } ) => ({
    tree: trees.list[workspaceId],
    opened: ((editor[workspaceId] || {}).opened || []).map(id => (files[workspaceId] || {})[id] || false).filter(file => !!file ) || []
});

const mapDispatchToProps = dispatch => ({
    actions: {
        file: bindActionCreators(file, dispatch),
        fs: bindActionCreators(fs, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorerContainer)
