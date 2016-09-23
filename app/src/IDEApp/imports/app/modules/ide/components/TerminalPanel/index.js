import React from 'react';
import Tabs from '../../../../components/tabs';
import TerminalContainer from './terminal-container';


const TerminalPanel = () => {

    return (
        <div className="terminal-panel">
            <Tabs />
            <TerminalContainer />
        </div>
    )
};


export default TerminalPanel;