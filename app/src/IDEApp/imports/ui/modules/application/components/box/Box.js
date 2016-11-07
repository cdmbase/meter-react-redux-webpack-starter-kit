import React, { Component, PropTypes } from 'react';
import { Panel, ButtonGroup, Button } from 'react-bootstrap';
import { WORKSPACE_STATUS_ACTIVE, WORKSPACE_STATUS_SHUTDOWN } from '../../action-types';


const langs = {
    'js': <i className="devicon-javascript-plain colored"/>,
    'ruby': <i className="devicon-ruby-plain colored"/>,
    'python': <i className="devicon-python-plain colored"/>,
    'go': <i className="devicon-go-line colored"/>,
};


export default class Box extends Component {

    render() {
        let { box, remove, start, shutdown , routeTo , ...rest } = this.props;
        return (
            <Panel {...rest} className="box-panel" bsStyle="primary">
                <div className="panel-content">
                    <div className="icon">{ langs[box.lang] }</div>
                    <div className="information">
                        <div className="box-name">{ box.name }
                            <span className="pull-right">
                                <i className={`indicator glyphicon glyphicon-certificate ${box.status == WORKSPACE_STATUS_ACTIVE ? 'active' : 'shutdown'}`}/>
                            </span>
                        </div>
                        <div className="box-description">{ box.description }</div>
                    </div>
                </div>
                <div className="panel-footer-menu">
                    <ButtonGroup justified className="">
                        {
                            box.status ==  WORKSPACE_STATUS_ACTIVE ? [
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => routeTo(`/app/box/${box._id}/editor`)} bsStyle="default">
                                    Editor</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => routeTo(`/app/box/${box._id}/settings`)} bsStyle="default">
                                    Settings</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => shutdown(box._id)} bsStyle="danger">
                                    Shutdown</Button>
                            ] : [
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => start(box._id)} bsStyle="default">Run workspace</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => routeTo(`/app/box/${box._id}/settings`)} bsStyle="default">
                                    Settings</Button>,
                                <Button key={Math.random()} className="btn-flat" bsSize="xsmall" href="javascript:void(0)"
                                        onClick={e => remove(box._id)} bsStyle="danger">Delete</Button>
                            ]
                        }
                    </ButtonGroup>
                </div>
            </Panel>
        );

    }
}

Box.propTypes = {
    box: PropTypes.object.isRequired,
    start: PropTypes.func.isRequired,
    shutdown: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    routeTo: PropTypes.func.isRequired,
};
