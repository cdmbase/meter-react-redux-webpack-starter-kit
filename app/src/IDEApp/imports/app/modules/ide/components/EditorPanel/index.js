import React from 'react';
import EditorContainer from './editor-container';
import TipsContainer from '../tips-container';
import TabsBar from './tabs-bar';

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