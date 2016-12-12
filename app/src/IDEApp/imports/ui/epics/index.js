import { combineEpics } from 'redux-observable';
import epics from '../modules/application/epics';


export default combineEpics(...epics);
