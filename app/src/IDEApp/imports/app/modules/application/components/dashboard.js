import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Grid, Panel, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { load, sync, box } from '../../ide/actions/boxes-actions';
import { bindActionCreators } from 'redux';
import Box from '../../ide/components/box';
import BoxForm from '../../ide/components/Form/box-form';

const MODAL_CREATION = "MODAL_CREATION";

class Dashboard extends Component {

    constructor() {
        super(...arguments);
        this.state = {}
    }

    componentDidMount() {
        //this.props.sync();
        this.props.load();

    }

    render() {
        let { boxes } = this.props;
        let close = () =>  this.setState({ modal: false });
        return (
            <div>
                <Panel className="page-toolbar">
                    <div className="page-title pull-left">Dashboard</div>
                    <Button onClick={e => this.setState({ modal: MODAL_CREATION })} bsStyle="primary" bsSize="xsmall"
                            className="pull-right">Create Workspace
                    </Button>
                </Panel>
                <div className="container boxes-list">
                    {boxes.map((box, index) => <Box key={index} box={box} />)}
                </div>
                <BoxForm onHide={close} close={ close}
                         show={[MODAL_CREATION].includes(this.state.modal)} box={this.state.box || {}}/>
            </div>
        );

    }

}

Dashboard.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = ({ boxes: { list, files }}) => ({
    boxes: Object.keys(list).map(id => list[id]),
    files
});

const mapDispatchToActions = dispatch => bindActionCreators({load, sync}, dispatch);

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard);
