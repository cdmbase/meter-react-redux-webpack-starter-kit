import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarButtons from './SidebarButtons';
import '../../stylesheets/sidebar.less';

const Sidebar = ({ui, mainMenu}) => {

        const minimenu = ui.isSideMenuOpen ? 'sidebar mini-menu' : 'sidebar mini-menu';

        return (
            <div className="sidebar" id="sidebar">
                    <SidebarButtons menus={mainMenu} />
            </div>
        )
};

Sidebar.propTypes = {
    ui: PropTypes.object.isRequired
};

export default Sidebar;
