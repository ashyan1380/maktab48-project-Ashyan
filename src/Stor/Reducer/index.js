import isLogged from "./IsLoggedIn";
import {combineReducers} from 'redux';
import rowsNames from './rowsOfNames'
const allReducers = combineReducers({
    isLogged:isLogged,
    rowsNames:rowsNames
});
export default allReducers;