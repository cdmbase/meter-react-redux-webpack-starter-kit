import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import {JOB_ACTION_CREATION, JOB_ACTION_RENAME} from '../../../action-types'
import {TARGET_DIR, TARGET_FILE} from '../../../action-types'
import logger from 'cdm-logger'

export default class Module extends Component {

    onCloseModal() {
        return e => {
            let {onHide} = this.props;
            onHide && onHide();
        }
    }

    onSave() {
        return e => {
            let {options, type}  = this.props;
            let {module, target, action} = options;

            let name = findDOMNode(this.refs.name).value;
            logger.debug("[Module Modal] ", {module, target, action});

            if (action == JOB_ACTION_CREATION) {
                if (target == TARGET_DIR) {
                    this.props.mkdir(module.relativePath, name);
                } else {
                    this.props.touch(module.relativePath, name);
                }
            } else {
                this.props.rename(module.relativePath, name);
            }
            this.onCloseModal()(e);
        }
    }

    render() {
        let {options: {action, type, module}, mkdir, touch, rename} = this.props;
        return (
            <Modal {...this.props}>
                <Modal.Header>{`${action == JOB_ACTION_CREATION ? 'New file/folder' : 'Rename'}`}</Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl defaultValue={ action == JOB_ACTION_CREATION? '' : module.name} type="text" ref="name"/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onCloseModal()} bsStyle="danger">Cancel</Button>
                    <Button onClick={this.onSave()} bsStyle="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}