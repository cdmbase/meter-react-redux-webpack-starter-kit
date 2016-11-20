import * as actions from './ui-actions';
import { Record } from 'immutable';

const InitialState = Record({
    isSideMenuOpen: false,
    isModalOpen: false
});

const initialState = new InitialState;

const uiReducer = (state = initialState, action) => {
    if (!(state instanceof InitialState)) return initialState;

    switch (action.type) {

        case actions.ON_SIDE_MENU_CHANGE: {
            const {isOpen} = action.payload;
            return state.set('isSideMenuOpen', !isOpen);
        }

        case actions.TOGGLE_SIDE_MENU:
            return state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen);

        case actions.ON_MODAL_CHANGE: {
            const {isOpen} = action.payload;
            return state.set('isModalOpen', !isOpen)
        }
        case actions.TOGGLE_MODAL:
            return state.update('isModalOpen', isModalOpen => !isModalOpen);
    }
    return state;
};

export default uiReducer;