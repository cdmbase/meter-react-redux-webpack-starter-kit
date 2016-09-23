import React from 'react';
import EditorPanel from './EditorPanel';
import TerminalPanel from './TerminalPanel';
import SplitPane from 'react-split-pane';



const PanelComponents = () => {

    return (
        <div className="panel-components raised-medium">
            <SplitPane defaultSize="60%" minSize={300} maxSize={-200} split="horizontal">
                <EditorPanel />
                <TerminalPanel />
            </SplitPane>
        </div>
    )
};


export default PanelComponents;