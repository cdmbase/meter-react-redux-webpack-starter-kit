import * as actions from '../app/menu-actions';


const menuReducer = (state = {}, action) => {

    switch (action.type) {
        case actions.ON_CHARTS_CLICK:
            alert("Clicked on " + actions.ON_CHARTS_CLICK);
            return state;


        case actions.ON_DASHBOARD_CLICK:
            return state;

        case actions.ON_UI_ELEMENT_CLICK:
            return state;

    }

    return state;

};

export default menuReducer;