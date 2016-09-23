import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { JOB_ACTION_REMOVE } from '../../../action-types';


export default class ModuleRemove extends Component {
    onCloseModal() {
        return e => {
            let { triggerClose } = this.props;
            triggerClose && triggerClose(this.props.job);
        }
    }

    onSave() {
        return e => {
            let { box } = this.context;
            let { job } = this.props;
            let { data: { module }} = job;

            Meteor.call("fs.unlink", box._id, module.module);
            this.onCloseModal()(e);
        }
    }

    render() {
        let { job } = this.props;
        let { data: { type, module }} = job;
        return (
            <Modal {...this.props}>
                <Modal.Header>Remove</Modal.Header>
                <Modal.Body>
                    <p>Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onCloseModal()} bsStyle="danger">Cancel</Button>
                    <Button onClick={this.onSave()} bsStyle="primary">Remove</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

RemoveModule.contextTypes = {
    box: React.PropTypes.object
}