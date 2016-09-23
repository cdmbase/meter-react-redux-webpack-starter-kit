import React, { Component } from 'react';

class BoxContainer extends Component {
    render() {
        return (
            <div className="box-container">
                {this.props.children}
            </div>
        )
    }
}


export default BoxContainer;