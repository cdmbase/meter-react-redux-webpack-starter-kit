import React from 'react';
import EditorPanel from '../components/EditorPanel';
import TerminalPanel from '../components/TerminalPanel';
import SplitPane from 'react-split-pane';

import "../stylesheets/panel-component/panel-component.less";

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