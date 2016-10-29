import React, {Component, PropTypes } from 'react';
import ControlsBar from '../../../../components/ControlsBar';
import AceEditorArea from './editor/AceEditorArea';


export default class EditorWorkspace extends Component {

    render() {
        const { fs, contents, active, workspaceId } = this.props;

        return (
            <div className="editor-workspace">
                <ControlsBar />
                <AceEditorArea actions={fs} contents={contents} selected={active} workspaceId={workspaceId} />
            </div>
        )
    }
}