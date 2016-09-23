import React from 'react';
import EditorPanel from './EditorPanel';
import TerminalPanel from './TerminalPanel';

import "./../stylesheets/panel-component/panel-component.less";

const PanelComponents = () => {

    return (
        <div className="panel-components raised-medium" style={{left: "406px"}}>
            <EditorPanel />
            <TerminalPanel />
        </div>
    )
};


export default PanelComponents;