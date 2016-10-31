import React, { Component, PropTypes } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Box from './box/Box';
import BoxForm from './box/BoxForm';

import '../stylesheets/dashboard.less';

const MODAL_CREATION = "MODAL_CREATION";

export default class Dashboard extends Component {

    constructor() {
        super(...arguments);

        this.state = {}
    }

    close() {
        this.setState({ modal: false })
    }

    render() {
        let { workspaces } = this.props;
        return (
            <div>
                <Panel className="page-toolbar">
                    <div className="page-title pull-left">Dashboard</div>
                    <Button style={{ margin: 0 }} onClick={e => this.setState({ modal: MODAL_CREATION })} bsStyle="primary" bsSize="xsmall"
                            className="pull-right">Create Workspace
                    </Button>
                </Panel>
                <div className="container boxes-list">
                    {workspaces.map((box, index) => <Box key={index} box={box} />)}
                </div>
                <BoxForm onHide={this.close.bind(this)} close={this.close.bind(this)}
                         show={[MODAL_CREATION].includes(this.state.modal)} box={this.state.box || {}}/>
            </div>
        );

    }
}

Dashboard.propTypes = {
    workspaces: PropTypes.array.isRequired
}