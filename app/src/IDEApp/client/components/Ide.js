import React from 'react';
import FileExplorer from './FileExplorer';
import PanelComponents from './PanelComponents';

const Ide = () => {

    return (
        <div id="ide" className="workspace active logged workspace-folder workspace-other">
            <FileExplorer />
            <PanelComponents />
        </div>
    )
};


export default Ide;