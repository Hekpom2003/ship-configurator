import {AUTHORIZATION_SET_STATE, AUTHORIZATION_STORAGE_KEY} from '../constants/authorization';
import AJAX_PATH_ROOT from "../constants/ajaxPath";
import store from "../store";

const initialState = {
	auth: false,
	token: 'qwe',
	login: 'Login',
	isClient: false,
	isPassenger: false,
	pending: true
};

export default function authentication(state = initialState, action) {
	
	if (action.type === AUTHORIZATION_SET_STATE) {
		localStorage.setItem(AUTHORIZATION_STORAGE_KEY, JSON.stringify(action.payload));
		return action.payload;
	}
	return {...state};
}