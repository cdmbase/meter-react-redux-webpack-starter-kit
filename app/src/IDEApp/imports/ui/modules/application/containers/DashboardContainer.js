import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push as routeTo} from 'react-router-redux';
import logger from 'cdm-logger';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {box as boxAction} from '../actions/box-action';
import {bindActionCreators} from 'redux';
import  Dashboard  from '../components/Dashboard'
import {compose, lifecycle} from 'recompose';
import R from 'ramda';
import {sync as syncBoxes} from '../actions/box-action';


const mapStateToProps = ({workspaces: {list}}) => ({
  workspaces: Object.keys(list).map(id => list[id]),
});

const mapDispatchToActions = {routeTo, ...boxAction, syncBoxes};


const enhance = R.compose(
  connect(mapStateToProps, mapDispatchToActions),

  lifecycle({
    componentDidMount: function () {
      logger.debug("Dashboard Component mounted");
      this.tracker = Tracker.autorun(() => {
        if (Meteor.subscribe('boxes.list').ready())
          this.props.syncBoxes()
      })
    },
    componentWillUnMount: function () {
      this.tracker.stop();
    }
  })
);


export default enhance(Dashboard)

