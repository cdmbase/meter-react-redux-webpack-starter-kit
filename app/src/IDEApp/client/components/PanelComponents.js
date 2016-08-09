import React from 'react';
import EditorPanel from './EditorPanel';
import TerminalPanel from './TerminalPanel';

const PanelComponents = () => {

    return (
        <div className="panel-components raised-medium" style={{left: "406px"}}>
            <EditorPanel />
            <TerminalPanel />
        </div>
    )
};


export default PanelComponents;