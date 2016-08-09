import React, { Component, PropTypes } from 'react';
import * as actions from '../../app/menu-actions';
import { connect } from 'react-redux';
import ButtonGroup from '../ButtonGroup';


const mapDispatchToProps = (dispatch) => ({
    onButtonsClick: (action) => {
        return dispatch(actions.menuClicked(action))
    }
});

export default  connect(null,mapDispatchToProps)(ButtonGroup);