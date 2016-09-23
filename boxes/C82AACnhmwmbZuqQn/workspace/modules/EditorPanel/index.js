import React from 'react';
import EditorContainer from './EditorContainer';
import TipsContainer from '../TipsContainer';
import TabsBar from '../TabsBar';

const EditorPanel = () => {

    return (
        <div className="editor-panel raised">
            <EditorContainer />
            <TabsBar />
            <TipsContainer />
        </div>
    )
};


export default EditorPanel;