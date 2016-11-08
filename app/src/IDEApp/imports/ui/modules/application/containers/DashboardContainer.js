import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push as routeTo } from 'react-router-redux';
import logger from 'cdm-logger';
import { box as boxAction } from '../actions/box-action';
import { bindActionCreators } from 'redux';
import  Dashboard  from '../components/Dashboard'
import { compose, withReducer, lifecycle } from 'recompose'
import { sync as syncBoxes } from '../actions/box-action';


const mapStateToProps = ({ workspaces: { list }}) => ({
    workspaces: Object.keys(list).map(id => list[id]),
});

const mapDispatchToActions = dispatch => bindActionCreators({routeTo, ...boxAction, syncBoxes}, dispatch);

//export default connect(mapStateToProps, mapDispatchToActions)(Dashboard)

const enhance = compose(
    connect(mapStateToProps, mapDispatchToActions),
    lifecycle({
        componentDidMount: function() {
            logger.debug("Component mounted");
            this.props.syncBoxes()
        }
    })
)

export default enhance(Dashboard)