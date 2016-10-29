import React, { Component } from 'react';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { Button, Grid, Panel, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from '../../ide/components/box';
import BoxForm from '../../ide/components/Form/box-form';

const MODAL_CREATION = "MODAL_CREATION";

class Dashboard extends Component {

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

Dashboard.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = ({ workspaces: { list }}) => ({
    workspaces: Object.keys(list).map(id => list[id])
});

const mapDispatchToActions = dispatch => bindActionCreators({push}, dispatch);

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard);
