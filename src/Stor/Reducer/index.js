import isLogged from "./IsLoggedIn";
import {combineReducers} from 'redux';
import rowsNames from './rowsOfNames';
import listOfUsers from './listOfUsers';
const allReducers = combineReducers({
    isLogged:isLogged,
    rowsNames:rowsNames,
    listOfUsers:listOfUsers,
});
export default allReducers;