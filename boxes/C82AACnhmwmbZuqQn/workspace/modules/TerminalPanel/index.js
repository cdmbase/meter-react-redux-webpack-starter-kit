import React from 'react';
import Tabs from '../Tabs';
import TerminalContainer from './TerminalContainer';


const TerminalPanel = () => {

    return (
        <div className="terminal-panel">
            <Tabs />
            <TerminalContainer />
        </div>
    )
};


export default TerminalPanel;