import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { JOB_ACTION_REMOVE } from '../../../action-types'

export default class RemoveModule extends Component {

    onCloseModal() {
        return e => {
            let {onHide} = this.props;
            onHide && onHide();
        }
    }

    onSave() {
        return e => {
            let {options: { action, module }, unlink} = this.props;
            unlink(module.relativePath, module.type);
            this.onCloseModal()(e);
        }
    }

    render() {
        let { options: {action,module}, unlink} = this.props;

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