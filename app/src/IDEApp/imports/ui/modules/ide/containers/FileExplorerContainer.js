import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { file } from '../actions/editor-action'
import { fs } from '../actions/fs-action'
import { FileExplorer} from '../components/FileExplorer';


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

const mergeProps = (stateProps, dispatchProps, { workspaceId }) => ({
    ...stateProps,
    file: {
        open: (id) =>  dispatchProps.open(workspaceId, id),
        close: (id) => dispatchProps.close(workspaceId, id),
        activate: (id) => dispatchProps.activate(workspaceId, id)
    },
    fs: {
        info: () => dispatchProps.info(workspaceId),
        ls: (path) => dispatchProps.ls(workspaceId, path),
        cat: (path) => dispatchProps.cat(workspaceId, path),
        mkdir: (path, name) => dispatchProps.mkdir(workspaceId, path, name),
        touch: (path, name) => dispatchProps.touch(workspaceId, path, name),
        unlink: (path, type) => dispatchProps.unlink(workspaceId, path, type),
        rename: (path, name) => dispatchProps.rename(workspaceId, path, name),
        update: (path, content) => dispatchProps.update(workspaceId, path, content)
    }
});

export default connect(mapStateToProps, {...file, ...fs }, mergeProps)(FileExplorer)
