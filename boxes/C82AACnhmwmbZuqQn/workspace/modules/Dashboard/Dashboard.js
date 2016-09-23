import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Grid, Panel, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { load, sync, box } from 'MainApp/common/box/boxes-actions';
import Boxes from 'IDEApp/collections/boxes';
import { bindActionCreators } from 'redux'


class Dashboard extends Component {

    goTo(url) {
        return e => {
            this.props.push(url);
        }
    }

    comonentDidMount() {
        this.props.sync();
        this.props.load();

    }

    render() {
        let { boxes } = this.props;
        let chunks = _.chunk(boxes, 4);
        return (
            <Grid fluid>
                <h1>
                    Dashboard <Button
                    bsStyle="primary"
                    className="btn-raised"
                    onClick={ e => this.props.load() }
                    bsSize="xsmall">
                    Load </Button>
                </h1>
                { chunks.map((row, rowId) => (
                    <Row key={rowId}>
                        { row.map((box, index) => (
                            <Col md={3} key={index}>
                                <Panel>
                                    <div className="box-name">{box.name} | { box._id} </div>
                                    <div>
                                        <Button bsStyle="primary" onClick={this.goTo(`/app/box/${box._id}/settings`)}
                                                bsSize="xsmall">
                                            <span>Settings</span>
                                        </Button>
                                        <Button bsStyle="primary" onClick={this.goTo(`/app/box/${box._id}/editor`)}
                                                bsSize="xsmall">
                                            <span>Editor</span>
                                        </Button>
                                        <Button className="btn-raised" bsStyle="danger"
                                                onClick={ e => Meteor.call("boxRemove", box._id)} bsSize="xsmall">
                                            <span>Remove</span>
                                        </Button>
                                    </div>
                                </Panel>
                            </Col>
                        ))}
                    </Row>
                ))}
            </Grid>
        );
    }
}

const mapStateToProps = ({ boxes: { list, files }}) => ({
    boxes: Object.keys(list).map(id => list[id]),
    files
});

const mapDispatchToActions = dispatch => bindActionCreators({load, push, sync, ...box}, dispatch);

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard);
