import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push as routeTo } from 'react-router-redux';
import logger from 'cdm-logger';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import composeWithTracker from 'IDEApp/imports/common/helpers/composeWithTracker';

import { Boxes } from '../../../../api/collections';

import { box as boxAction } from '../actions/box-action';
import { bindActionCreators } from 'redux';
import  Dashboard  from '../components/Dashboard'
import { compose, withReducer, lifecycle } from 'recompose'
import { sync as syncBoxes } from '../actions/box-action';


const mapStateToProps = ({ workspaces: { list }}) => ({
    workspaces: Object.keys(list).map(id => list[id]),
});

const mapDispatchToActions = dispatch => bindActionCreators({routeTo, ...boxAction, syncBoxes}, dispatch);


const enhance = compose(
    connect(mapStateToProps, mapDispatchToActions),
    lifecycle({
        componentDidMount: function() {
            logger.debug("Component mounted", this.props);
            Tracker.autorun(() => {
                if(Meteor.subscribe('boxes.list').ready())
                this.props.syncBoxes()
            })
        },
        componentWillUnMount: function() {

        }
    })
)

const loadBoxes = (props, onData) => {
    if(Meteor.subscribe('boxes.list').ready()){
        const boxes = Boxes.find().fetch();
        logger.debug("Boxes data udpated", props);
    }
};

export default enhance(Dashboard)