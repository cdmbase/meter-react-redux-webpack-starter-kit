import React, { Component, PropTypes } from 'react';
import FileExplorer from './FileExplorer';
import PanelComponents from './PanelComponents';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { select, box } from 'MainApp/common/box/boxes-actions';
import { JOB_STATUS_IN_PROGRESS, JOB_STATUS_REJECTED, JOB_STATUS_DONE } from 'MainApp/common/job/action-types';


const fsActions = (dispatch) => (event) => {
    console.log(event);
    dispatch(event);
};

class Ide extends Component {
    componentDidMount() {
        this.props.select(this.props.params.id);
        this.props.fsLoad(this.props.params.id);
    }

    getChildContext() {
        return {box: this.props.selected};
    }

    render() {

        let { selected, job = false } = this.props;
        return (
            selected ? (
                <div id="ide" className="workspace active logged workspace-folder workspace-other">
                    <FileExplorer />
                    <PanelComponents />
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="box-not-found">Box not found!</h1>
                    <Link className="btn btn-primary btn-raised" to="/dashboard">Go to dashboard</Link>
                </div>
            )
        );
    }
}

Ide.childContextTypes = {
    box: React.PropTypes.object
};


const mapStateToProps = ({jobs, boxes: {list, selected}}) => ({
    boxes: Object.keys(list).map(id => list[id], selected),
    job: jobs[selected],
    selected: list[selected],
});
const mapDispatchToProps = dispatch => ({
    fsActions: fsActions(dispatch),
    ...bindActionCreators({select, ...box}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ide));
