import _ from 'lodash'
import { concatEventReducers } from '../../../../../../common/utils/concatEventReducers';
import { ACTION_TERMINAL_INIT, ACTION_TERMINAL_ADD, ACTION_TERMINAL_REMOVE, ACTION_TERMINAL_ACTIVATE_TAB } from '../action-types'

export const editor = concatEventReducers({
    [ACTION_TERMINAL_ADD] :  (state = {}, { workspace, id }) => {
        let terminal = state[workspace] || {};
        let { opened = [] } = terminal;

        !opened.includes(id) && opened.push[id];

        return { ...state, [workspace]: { ...terminal, opened:[...opened]}}
    },
    [ACTION_TERMINAL_REMOVE]: (State = {}, { workspace, id }) => {
      let terminal = state[workspace] || {};
      let { active = false }  = terminal;
      let { opened = [] } = terminal;

      if(active == id) {
          let index = opened.indexOf(id);
          active = opened[index - 1] ? opened[index - 1] : false;
      }
        _.remove(opened, id => id == id);
        return {...state, [workspace]:{ ...terminal, opened: [...opened], active} }
    },
    [ACTION_TERMINAL_INIT] : (state = {}, { workspace, id }) => {

    },
    [ACTION_TERMINAL_ACTIVATE_TAB]: (state = {}, { workspace, id }) => {
        let terminal = state[workspace] || {};
        return {...state , workspace: { ...terminal, active: id}}
    },
    default: (state, event) => state || {}
});
