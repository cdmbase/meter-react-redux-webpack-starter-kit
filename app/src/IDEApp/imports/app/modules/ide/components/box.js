import React, { Component, PropTypes } from 'react';
import { Panel, ButtonGroup, Button } from 'react-bootstrap';
import { STATUS_ACTIVE, STATUS_SHUTDOWN } from '../action-types';


const langs = {
    'js': <i className="devicon-javascript-plain colored"/>,
    'ruby': <i className="devicon-ruby-plain colored"/>,
    'python': <i className="devicon-python-plain colored"/>,
    'go': <i className="devicon-go-line colored"/>,
};


export default class Box extends Component {
    remove(id) {
        return e => {
            Meteor.call('box.remove', id);
        }
    }

    go(to) {
        let { router } = this.context;
        return e => {
            router.push(to);
        }
    }

    render() {
        let { box } = this.props;
        return (
            <Panel {...this.props} className="box-panel" bsStyle="primary">
                <div className="panel-content">
                    <div className="icon">{ langs[box.lang] }</div>
                    <div className="information">
                        <div className="box-name">{ box.name }
                            <span className="pull-right">
                                <i className={`indicator glyphicon glyphicon-certificate ${box.status == STATUS_ACTIVE ? 'active' : 'shutdown'}`}/>
                            </span>
                        </div>
                        <div className="box-description">{ box.description }</div>
                    </div>
                </div>
                <div className="panel-footer-menu">
                    <ButtonGroup justified className="">
                        {
                            box.status == STATUS_ACTIVE ? [
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={this.go(`/app/box/${box._id}/editor`)} bsStyle="default">
                                    Editor</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={this.go(`/app/box/${box._id}/settings`)} bsStyle="default">
                                    Settings</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => Meteor.call('box.shutdown', box._id)} bsStyle="danger">
                                    Shutdown</Button>
                            ] : [
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={this.go(`/app/box/${box._id}/editor`)} bsStyle="default">Run workspace</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={this.go(`/app/box/${box._id}/settings`)} bsStyle="default">
                                    Settings</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={this.remove(box._id)} bsStyle="danger">Delete</Button>
                            ]
                        }
                    </ButtonGroup>
                </div>
            </Panel>
        );

    }
}

Box.propTypes = {
    box: PropTypes.object
};

Box.contextTypes = {
    router: PropTypes.object
};