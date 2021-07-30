import isLogged from "./IsLoggedIn";
import {combineReducers} from 'redux';
import rowsNames from './rowsOfNames';
import listOfUsers from './listOfUsers';
import cart from './cart';
import userInfoo from "./userInfo";
const allReducers = combineReducers({
    isLogged:isLogged,
    rowsNames:rowsNames,
    listOfUsers:listOfUsers,
    cart:cart,
    userInfoo:userInfoo,
});
export default allReducers;