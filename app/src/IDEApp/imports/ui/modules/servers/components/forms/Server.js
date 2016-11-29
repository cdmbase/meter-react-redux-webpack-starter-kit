import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';


export default class Server extends Component {
    constructor() {

        super(...arguments);

        this.state= {

        };
    }

    onSubmit() {
        return e => {
            e.preventDefault();
            let { onHide, options } = this.props;
            let { server = {} } = options || {};

            let data = {
                name: findDOMNode(this.refs.name).value,
                url: findDOMNode(this.refs.url).value,
            };

            if(server._id) {
                data._id = findDOMNode(this.refs._id).value;

                Meteor.call('server.update', data, (error, data) => {
                    if(error) {
                        this.setState(error);
                    } else {
                        onHide();
                    }
                })
            } else {
                Meteor.call('server.create', data, (error, data) => {
                    if(!!error) {
                        this.setState({ error })
                    } else {
                        onHide();
                    }
                })
            }

        };
    }

    render() {
        let { options, ...rest }  = this.props;
        let { onHide } = rest;
        let { server = {} } = options || {};

        let { error }  = this.state;
        return (
            <Modal {...rest}>
                <form onSubmit={this.onSubmit()}>
                    <Modal.Header>
                        <Modal.Title>Server</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { error && (<Alert bsStyle="danger">Check your data!</Alert>)}
                        { !!server._id && (
                            <FormGroup>
                                <ControlLabel>Server Id:</ControlLabel>
                                <FormControl ref="_id" disabled={true} defaultValue={ server._id } type="text" required />
                            </FormGroup>
                        )}
                        <FormGroup>
                            <ControlLabel>Server Name: </ControlLabel>
                            <FormControl ref="name" defaultValue={ server.name } type="text" required />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>URL: <sup>*</sup></ControlLabel>
                            <FormControl ref="url" defaultValue={ server.url } type="text" required />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="pull-left">
                            <Button type="button" onClick={e => onHide() }>Cancel</Button>
                            {
                              server._id && (
                                <Button type="button" onClick={e => { onHide(); Meteor.call('server.remove', server._id) }} bsStyle="danger">Remove</Button>
                              )
                            }
                        </div>
                        <Button type="submit" bsStyle="primary">Save</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}