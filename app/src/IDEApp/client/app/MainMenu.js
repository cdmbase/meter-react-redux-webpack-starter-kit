import * as actions from './menu-actions';


export default {
    name: 'Main menu',
    title: 'Manage Projects Controls',
    id: 'manage-projects-controls',
    menuItems: [
        {
            title: 'Start Project',
            id: 'start-project',
            action: actions.ON_DASHBOARD_CLICK,
            children: [],
            icon: 'icon-img-container',
            notificationCount: null
        },
        {
            title: 'Switch Project',
            id: 'switch-project',
            action: actions.ON_UI_ELEMENT_CLICK,
            icon: 'icon-img-container',
            notificationCount: null,
        }
    ]
}