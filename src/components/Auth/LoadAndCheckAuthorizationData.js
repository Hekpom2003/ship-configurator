import React from 'react';
import {connect} from 'react-redux';
import {AUTHORIZATION_SET_STATE, AUTHORIZATION_STORAGE_KEY} from "../../constants/authorization";
import AJAX_PATH_ROOT from "../../constants/ajaxPath";
import store from "../../store";
import Preloader from '../Preloader';

class LoadAndCheckAuthorizationData extends React.Component {
	
	componentDidMount() {
		if (this.props.pending && localStorage.getItem(AUTHORIZATION_STORAGE_KEY) != null) {
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
										isPassenger: oData.privileges.passenger,
										pending: false
									},
									type: AUTHORIZATION_SET_STATE
								});
							} else {
								store.dispatch({
									payload: {
										auth: false,
										token: 'qwe',
										login: 'Login',
										isClient: false,
										isPassenger: false,
										pending: false
									},
									type: AUTHORIZATION_SET_STATE
								});
								console.error('ERROR AUTHORIZING', oData);
							}
						}, oError => {
							console.error(oError);
						});
				}
			} catch (e) {
			
			}
		}
	}
	
	render() {
		if(this.props.pending){
			return <Preloader/>
		}else{
			return this.props.children;
		}
	}
	
	static configureRedux(state) {
		return state.authentication;
	}
}

export default connect(LoadAndCheckAuthorizationData.configureRedux)(LoadAndCheckAuthorizationData);
