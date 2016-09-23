import React from 'react';
import Editor from './Editor';
import ControlsBar from '../../../../components/controls-bar';

const EditorContainer = () => {

    return (
        <div className="editor-container">
            <ControlsBar />
            <Editor />
        </div>
    )
};

export default EditorContainer;