import React, {Component} from 'react';
import {TerminalPanel} from '../components/TerminalPanel';
import {connect} from 'react-redux';
import {toggleTerminal, term} from '../actions/terminal-action';
import {getServerUrl, getPort} from '../../../../api/requests/fserver/fserver-api';


const mapStateToProps = ({editor}, {workspaceId}) => ({
    terminal: (editor[workspaceId] || {}).terminal
});


const mergeProps = (stateProps, dispatchProps, {workspaceId}) => ({
    ...stateProps,
    toggle: (status)  => dispatchProps.toggleTerminal(workspaceId, status),
    init: () => dispatchProps.init(workspaceId),
    url: getUrl(workspaceId)
});

const getUrl = (_id) => {
    return `${getServerUrl(_id)}:${getPort(_id)}/static/`
};

export default connect(mapStateToProps, { toggleTerminal, ...term }, mergeProps)(TerminalPanel)