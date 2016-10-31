import React, {Component} from 'react'
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

export default class FileConflict extends Component {
    onUpdate(status, content) {
        return e => {
            const {onLoad, onDontLoad} = this.props;

            if (status) {
                onLoad && onLoad(content.new)
            } else {
                onDontLoad && onDontLoad(content.false)
            }

            this.props.onHide();
        }
    }

    render() {
        let {content} = this.props;

        return (
            <Modal {...this.props}>
                <Modal.Header>File has been update on disk.</Modal.Header>
                <Modal.Footer>
                    <Button onClick={this.onUpdate(false, content)} bsStyle="danger">{`Don't load`}</Button>
                    <Button onClick={this.onUpdate(true, content)} bsStyle="primary">Load from Disk</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}