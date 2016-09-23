import React, { Component, PropTypes } from 'react';
import * as actions from '../../menu-types';
import { connect } from 'react-redux';
import ButtonGroup from '../../../../components/button-group';


const mapDispatchToProps = (dispatch) => ({
    onButtonsClick: (action) => {
        return dispatch(actions.menuClicked(action))
    }
});

export default  connect(null,mapDispatchToProps)(ButtonGroup);