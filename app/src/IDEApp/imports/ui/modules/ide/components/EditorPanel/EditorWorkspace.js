import React, {Component, PropTypes } from 'react';
import ControlsBar from '../../../../components/ControlsBar';
import AceEditorArea from './editor/AceEditorArea';

const EditorWorkspace = (props) => {
        return (
            <div className="editor-workspace">
                <ControlsBar />
                <AceEditorArea {...props} />
            </div>
        )
}

export default EditorWorkspace;