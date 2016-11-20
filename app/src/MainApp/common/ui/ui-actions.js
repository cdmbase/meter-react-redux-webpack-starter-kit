export const ON_MODAL_CHANGE = 'ON_MODAL_CHANGE';
export const ON_SIDE_MENU_CHANGE = 'ON_SIDE_MENU_CHANGE';
export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const onSideMenuChange =(isOpen) => ({
    type: ON_SIDE_MENU_CHANGE,
    payload: {isOpen}
});

export const toggleSideMenu = () => ({
    type: TOGGLE_SIDE_MENU
});

export const onModalChange = (isOpen) => ({
    type: ON_MODAL_CHANGE,
    payload: {isOpen}
});

export const toggleModal = () => ({
    type: TOGGLE_MODAL
});


