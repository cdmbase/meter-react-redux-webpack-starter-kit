import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import { bindActionCreators } from 'redux';
import ContextMenu from '../context-menu';
import TreeNode from './tree-node';
import { connect } from 'react-redux';
import { JOB_ACTION_CREATION, JOB_ACTION_RENAME, JOB_ACTION_REMOVE } from 'MainApp/common/box/action-types';
import * as JobsActions from 'MainApp/common/job/action-types';
import { file } from 'MainApp/common/box/boxes-actions';
import Loader from 'react-loader';
import { JOB_STATUS_IN_PROGRESS } from 'MainApp/common/job/action-types';

class TreeView extends Component {
    constructor(...options) {
        super(...options);

        this.state = {
            active: false
        };

        this.onClickNode = this.onClickNode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderNode = this.renderNode.bind(this);

        this.onContextAction = this.onContextAction.bind(this);
    }

    handleChange() {

    }

    renderNode(node) {
        return (
            <TreeNode onClick={this.onClickNode()} active={node == this.state.active} node={node}/>
        )
    }

    onClickNode() {
        return node => {
            let { box } = this.context;
            !!node.leaf && this.props.file.open(box._id, node.relativePath);
            !!node.leaf && this.props.file.activate(box._id, node.relativePath);
            !!node.leaf && this.props.file.cat(box._id, node.relativePath);
            this.setState({active: node})
        }
    }

    onContextAction(jobId, data) {
        this.jobId = jobId;
    }

    get job() {
        let { tasks } = this.props;
        let task = this.jobId && tasks.hasOwnProperty(this.jobId) ? tasks[this.jobId] : false;

        return task && task.status == JOB_STATUS_IN_PROGRESS ? task : false;

    }

    render() {
        let { tree, selected, tasks, job }  = this.props;
        let task = this.job;

        return (

            <div className="project-workspace workspace tree-view">
                <Loader loaded={job && job.status != JOB_STATUS_IN_PROGRESS}>
                    {selected && tree ?
                        (<Tree paddingLeft={20}
                               renderNode={this.renderNode}
                               isNodeCollapsed={false}
                               tree={tree}
                               onChange={this.handleChange}/>) : null }
                    {task ? (
                        [JOB_ACTION_CREATION, JOB_ACTION_RENAME].inclues(task.data.type) ? (
                            console.log(task)
                        ) : null) : null}
                    {task ? (
                        [JOB_ACTION_REMOVE].includes(task.data.type) ? (
                            console.log(task)
                        ) : null) : null}
                    <ContextMenu onAction={this.onContextAction}/>
                </Loader>
            </div>
        )
    }
}

TreeView.contextTypes = {
    box: React.PropTypes.object
};

const mapStateToProps = ({ jobs, boxes: { selected}, filesystem: { trees }}) => ({
    tree: trees[selected] || false,
    selected,
    tasks: jobs,
    job: jobs[selected]
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(JobsActions, dispatch),
    file: bindActionCreators(file, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);