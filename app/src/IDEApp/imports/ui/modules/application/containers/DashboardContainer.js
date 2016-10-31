import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import  Dashboard  from '../components/Dashboard'

const mapStateToProps = ({ workspaces: { list }}) => ({
    workspaces: Object.keys(list).map(id => list[id])
});

const mapDispatchToActions = dispatch => bindActionCreators({push}, dispatch);

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard)

