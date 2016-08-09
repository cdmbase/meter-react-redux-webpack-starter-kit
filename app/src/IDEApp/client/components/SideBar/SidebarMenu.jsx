import React, { PropTypes, Component } from 'react';


export default class SidebarMenu extends Component {

    static PropTypes = {
        menu: PropTypes.object.isRequired
    };



    render() {
        const menu = this.props.menu;

        return (
            <div >
                <span className="menu-text">{ menu.title() } </span>
            </div>
        )
    }
}