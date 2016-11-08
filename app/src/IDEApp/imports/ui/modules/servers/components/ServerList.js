import _ from 'lodash';
import React, {Component} from 'react';
import {Grid, Col, Row, Panel, Button} from 'react-bootstrap';
import ServerElement from './Server';
import ServerForm from './forms/Server';


const MODAL_SERVER = 'MODAL_SERVER';

export default class ServerList extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            modal: false
        };
    }


    render() {
        let {servers}  = this.props;
        let rows = _.chunk(servers, 3);
        let {modal} = this.state;

        return (
            <div>
                <Panel className="page-toolbar">
                    <div className="page-title pull-left">Servers</div>
                    <Button style={{ margin: 0 }}
                            onClick={ e => this.setState({ modal : { type: MODAL_SERVER , options: {} }})}
                            bsStyle="primary" bsSize="xsmall" className="pull-right">Create Server</Button>
                </Panel>
                <Grid fluid>
                    { rows.map((servers, i) => (
                        <Row key={i}>
                            {servers.map((server, colId) => (
                                <Col md={4} key={colId} >
                                    <ServerElement onClick={e => this.setState({ modal: { type: MODAL_SERVER, options: { server }}})} server={server} />
                                </Col>
                            ))}
                        </Row>
                    ))}
                </Grid>

                { !!modal && (
                    <ServerForm onHide={ e => this.setState({ modal: false })} show={ modal.type == MODAL_SERVER } options={modal.options || {}} />
                )}
            </div>
        );
    }
}



