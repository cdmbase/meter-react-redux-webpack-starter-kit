import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push as routeTo } from 'react-router-redux';
import { box as boxAction } from '../actions/box-action';
import { bindActionCreators } from 'redux';
import  Dashboard  from '../components/Dashboard'
// import { compose, withReducer } from 'recompose'
import {composeWithTracker, composeAll } from 'react-komposer'

const mapStateToProps = ({ workspaces: { list }}) => ({
    workspaces: Object.keys(list).map(id => list[id]),
});

const mapDispatchToActions = dispatch => bindActionCreators({routeTo, ...boxAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard)

