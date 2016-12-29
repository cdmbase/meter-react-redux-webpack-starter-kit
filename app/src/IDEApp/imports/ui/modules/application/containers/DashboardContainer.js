import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose as apolloCompose } from 'react-apollo';
import { push as routeTo } from 'react-router-redux';
import { WORKSPACE_LIST, CREATE_WORKSPACE } from '../queries';
import logger from 'cdm-logger';

import { box as boxAction } from '../actions/box-action';
import Dashboard from '../components/Dashboard';
import { compose, lifecycle } from 'recompose';

const mapDispatchToActions = { routeTo, ...boxAction };

export default apolloCompose(
  connect(null, mapDispatchToActions),
  graphql(WORKSPACE_LIST, {
    // TODO: poll will be replaced with subscription
    options: { pollInterval: 10000 },
    props: ({ data: { workspace, loading } }) => ({
      loading, workspaces: workspace,
    }),
  }),
)(Dashboard);
