import React, {Component} from 'react';
import {Terminal} from '../components/TerminalPanel';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleTerminal} from '../actions/box-action';
import {getServerUrl, getPort} from '../requests/fserver';

const TerminalContainer = (props) => {

    let toggle = (workspace, fn) => (status) => {
        return fn(workspace, status);
    };

    let getUrl = () => {
        const {workspace: {_id}} = props;
        return `${getServerUrl(_id)}:${getPort(_id)}/static/`
    };

    let { toggleTerminal, workspace: { _id }, editor: { terminal } } = props;
    let newProps = { terminal  , url: getUrl(), toggle: toggle(_id, toggleTerminal)};

    return (
        <div className="terminal-container">
            <Terminal {...newProps} />
        </div>
    )
};

const mapStateToProps = ({editor, workspaces: {selected, files: {list, content}}}) => ({
    editor: editor[selected] || {},
    list: list[selected] || {},
    content: content[selected] || {}
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({toggleTerminal}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TerminalContainer);