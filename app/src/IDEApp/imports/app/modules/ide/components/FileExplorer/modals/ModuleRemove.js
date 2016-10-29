import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { JOB_ACTION_REMOVE } from '../../../action-types';
import { fs } from '../../../actions/fs-action';


class ModuleRemove extends Component {
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
            let { data: { module, target }} = job;

            this.props.actions.unlink(workspace._id, module.relativePath, module.type);
            this.onCloseModal()(e);
        }
    }

    render() {
        let { job = {} } = this.props;
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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(fs, dispatch)
});
ModuleRemove.contextTypes = {
    workspace: React.PropTypes.object
};

export default connect(undefined, mapDispatchToProps)(ModuleRemove);

