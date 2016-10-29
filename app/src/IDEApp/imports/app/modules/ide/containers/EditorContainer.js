import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditorWorkspace, TabsBar } from '../components/EditorPanel'
import { file } from '../actions/editor-action'
import { fs } from '../actions/fs-action'


const EditorContainer = ({active, opened, workspace, tree , contents, actions: {file, fs }, workspaceId}) => {


    return (
        workspace ? (
        <div className="editor-panel raised">
            <EditorWorkspace actions={fs} contents={contents} selected={active} workspaceId={workspaceId} />
            <TabsBar actions={file} active={active} opened={opened}  workspaceId={workspaceId} />
        </div>
        ) : null
    )
};


const mapStateToProps = ({ editor, workspaces: { files, list, trees, settings }}, { workspaceId } ) => ({
    workspaceId,
    workspace: list[workspaceId],
    tree: trees.list[workspaceId],
    settings: settings[workspaceId],
    files: Object.keys(files.list[workspaceId] || {}).map(id => list[workspaceId]),
    contents: files.content[workspaceId],
    active: (editor[workspaceId] || {}).active,
    opened: ((editor[workspaceId] || {}).opened || []).map(id => (files[workspaceId] || {})[id] || false).filter(file => !!file ) || []
});

const mapDispatchToProps = dispatch => ({
    actions: {
        file: bindActionCreators(file, dispatch),
        fs: bindActionCreators(fs, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)