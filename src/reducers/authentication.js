import {AUTHORIZATION_SET_STATE, AUTHORIZATION_STORAGE_KEY} from '../constants/authorization';
import AJAX_PATH_ROOT from "../constants/ajaxPath";
import store from "../store";

const initialState = {
	auth: false,
	token: 'qwe',
	login: 'Login',
	isClient: false,
	isPassenger: false
};

export default function authentication(state = initialState, action) {
	
	if (action.type === AUTHORIZATION_SET_STATE) {
		localStorage.setItem(AUTHORIZATION_STORAGE_KEY, JSON.stringify(action.payload));
		return action.payload;
	} else {
		if (!state.auth && localStorage.getItem(AUTHORIZATION_STORAGE_KEY) != null) {
			try {
				let oRestoredSession = JSON.parse(localStorage.getItem(AUTHORIZATION_STORAGE_KEY));
				
				if (oRestoredSession.auth) {
					//check authorization expiration
					let headers = new Headers();
					headers.append('Authorization', 'Bearer ' + oRestoredSession.token)
					
					// if user opened the browser after a while, checking his authorization
					fetch(AJAX_PATH_ROOT + '/user/', {
						headers
					}).then(resp => resp.json())
						.then(oData => {
							if (!oData.error) {
								store.dispatch({
									payload: {
										auth: oData.authorized,
										token: oData.authorize_with,
										login: oData.user_name,
										isClient: oData.privileges.client,
										isPassenger: oData.privileges.passenger
									},
									type: AUTHORIZATION_SET_STATE
								});
							} else {
								store.dispatch({
									payload: initialState,
									type: AUTHORIZATION_SET_STATE
								});
								console.error('ERROR AUTHORIZING', oData);
							}
						}, oError => {
							console.error(oError);
						});
				}
				
				return oRestoredSession;
			} catch (e) {
				return {...state};
			}
		}
	}
	return {...state};
}