import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import randomstring from 'randomstring';
import {findDOMNode} from 'react-dom';

import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {JOB_ACTION_CREATION, JOB_ACTION_RENAME} from '../../../action-types';
import {TARGET_DIR, TARGET_FILE} from '../../../action-types';
import {fs} from '../../../actions/fs-action';


class Module extends Component {
    onCloseModal() {
        return e => {
            let {triggerClose} = this.props;
            triggerClose && triggerClose(this.props.job);
        }
    }

    onSave() {
        return e => {
            let { workspace } = this.context;
            let { job } = this.props;
            let { data: {type, module, target} } = job;

            let name = findDOMNode(this.refs.name).value;

            if (type == JOB_ACTION_CREATION) {
                if (target == TARGET_DIR) {
                    this.props.fs.mkdir(workspace._id, module.relativePath, name);
                } else {
                    this.props.fs.touch(workspace._id, module.relativePath, name);
                }
            } else {
                this.props.fs.rename(workspace._id, module.relativePath, name);
            }
            this.onCloseModal()(e);
        }
    }

    render() {
        let { job } = this.props;
        let { data: { type, module } } = job;

        return (
            <Modal {...this.props}>
                <Modal.Header>{`${ type == JOB_ACTION_CREATION ? 'New file folder' : 'Rename'}`}</Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl defaultValue={type == JOB_ACTION_CREATION ? '' : module.module} type="text"
                                     ref="name"/>
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

Module.proptypes = {
    job: PropTypes.object.required
}

const mapDispatchToProps = dispatch => ({
    fs: bindActionCreators(fs, dispatch)
});

Module.contextTypes = {
    workspace: React.PropTypes.object
};


export default connect(undefined, mapDispatchToProps)(Module);