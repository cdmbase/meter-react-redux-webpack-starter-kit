import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, FormControl, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';


export default class BoxForm extends Component {
  constructor() {
    super(...arguments);

    this.state = {};
  }

  submit() {
    let { close, create } = this.props;
    return (e) => {
      e.preventDefault();
      this.setState({ error: false });
      const data = {
        name: findDOMNode(this.refs.name).value,
        lang: findDOMNode(this.refs.lang).value,
        description: findDOMNode(this.refs.description).value,
      };

        create(data, close);
    };
  }

  render() {
    let { box = {}, close, create, ...rest } = this.props;
    let { name = '', lang = '', description = '' } = box;
    const { error } = this.state;
    return (
            <Modal {...rest} >
                <form onSubmit={this.submit()} action="">
                    <Modal.Header closeButton>
                        <Modal.Title>Box</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error ? <Alert bsStyle="danger">Check your data!</Alert> : null}
                        <FormGroup>
                            <ControlLabel>Box Name:
                                <sup>*</sup>
                            </ControlLabel>
                            <FormControl ref="name" defaultValue={name} type="text" required />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Language:
                                <sup>*</sup>
                            </ControlLabel>
                            <FormControl ref="lang" defaultValue={lang} componentClass="select" required>
                                <option value="js">Javascript</option>
                                <option value="go">Go</option>
                                <option value="python">Python</option>
                                <option value="ruby">Ruby</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description:</ControlLabel>
                            <FormControl ref="description" defaultValue={description} componentClass="textarea" />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" bsStyle="primary">Save</Button>
                    </Modal.Footer>
                </form>
            </Modal>
    );
  }
}

BoxForm.propTypes = {
  show: React.PropTypes.bool,
};
