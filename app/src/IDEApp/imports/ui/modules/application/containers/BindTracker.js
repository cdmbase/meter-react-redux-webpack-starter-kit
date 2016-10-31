import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tracker } from 'meteor/tracker';
import { bindActionCreators } from 'redux';
import { sync as syncBoxes } from '../actions/box-action';


class BindTracker extends Component {
    get tracker() {
        Tracker.autorun(() => {
            this.props.syncBoxes()
        })
    }

    componentDidMount() {
        this.tracker;
    }

    render() {
        return (
            <div className="abstract-flex-wrapper">
                {this.props.children}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( { syncBoxes }, dispatch);

export default connect(undefined, mapDispatchToProps)(BindTracker);