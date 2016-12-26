import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { push as routeTo } from 'react-router-redux';
import logger from 'cdm-logger';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import gql from 'graphql-tag';

import { box as boxAction } from '../actions/box-action';
import { bindActionCreators } from 'redux';
import Dashboard from '../components/Dashboard';
import { compose, lifecycle } from 'recompose';
import R from 'ramda';
import { sync as syncBoxes } from '../actions/box-action';


const mapStateToProps = ({ workspaces: { list } }) => ({
  workspaces: Object.keys(list).map(id => list[id]),
});
const WORKSPACE_LIST = gql`
  query workspaceList {
    workspace{
      _id
      name
      lang
      creator
      completed
      server {
        name
        status
      }
      info {
        container
        ports {
          socket
          application
        }
      }
      workspace
      status
    }
  }
`;
const mapDispatchToActions = { routeTo, ...boxAction, syncBoxes };
const withWorkspaceList = graphql(WORKSPACE_LIST, {
  props: ({ ownProps, data}) => ({ test : data }),
});
// const enhance = R.compose(
//   connect(mapStateToProps, mapDispatchToActions),
//   lifecycle({
//     componentDidMount() {
//       logger.debug('Dashboard Component mounted');
//       // this.tracker = Tracker.autorun(() => {
//       //   if (Meteor.subscribe('boxes.list').ready()) {
//       logger.debug('Props inside component mount', this.props);
//       //this.props.syncBoxes(this.props.workspaceList());
//           // this.props.syncBoxes();
//         // }
//       // });
//     },
//     componentWillUnMount() {
//       // this.tracker.stop();
//     },
//   }),
// );

const DashboardWithData = withWorkspaceList(Dashboard);
//export default enhance(Dashboard);

export default connect(mapStateToProps, mapDispatchToActions)(DashboardWithData);
