import React, {Component} from 'react';
import { connect } from 'react-redux';
import { EditorPanel } from '../components/EditorPanel'
import { file } from '../actions/editor-action'
import { fs } from '../actions/fs-action'
import logger from 'cdm-logger';


const mapStateToProps = ({ editor, workspaces: { files, list, trees, settings }}, { workspaceId } ) => ({
    workspaceId,
    files: files.list[workspaceId] || {},
    contents: files.content[workspaceId],
    active: (editor[workspaceId] || {}).active,
    opened: ((editor[workspaceId] || {}).opened || []).map(id => (files.list[workspaceId] || {})[id] || false).filter(file => !!file ) || []
});

const mergeProps = ({files, ...restStateProps}, dispatchProps, {workspaceId}) => ({
    ...restStateProps,
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

export default connect(mapStateToProps, {...file, ...fs }, mergeProps)(EditorPanel);