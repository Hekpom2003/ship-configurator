import React from 'react';
import {Link} from 'react-router-dom';
import store from '../../../store';
import AJAX_PATH_ROOT from '../../../constants/ajaxPath';
import {AUTHORIZATION_SET_STATE} from '../../../constants/authorization';
import base64 from 'base-64';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginField: '',
			passwordField: '',
			error: false
		};
	}
	
	onSubmitProcess(e) {
		e.preventDefault();
		e.stopPropagation();
		
		let headers = new Headers();
		headers.append('Authorization', 'Basic ' + base64.encode(this.state.loginField + ':' + this.state.passwordField));
		
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
					this.setState({error: true});
				}
			}, oError => {
				this.setState({
					error: true
				});
			});
		
	}
	
	render() {
		let errMess = this.state.error ? (<div className="authform-error">
			Ошибка авторизации!
		</div>) : (null);
		
		
		return (
			<div className="authform">
				{errMess}
				<form method="POST" onSubmit={e => this.onSubmitProcess(e)}>
					<div className="authform-fields">
						<input type="text" value={this.state.loginField}
						       onChange={e => this.setState({loginField: e.target.value})}
						/>
						
						<input type="password" value={this.state.passwordField}
						       onChange={e => this.setState({passwordField: e.target.value})}
						/>
					</div>
					<div className="authform-buttons">
						<Link to="/register/">Зарегистрироваться</Link>
						<Link to="/reset-password/">Забыл пароль</Link>
						<button>
							Авторизоваться
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default LoginForm;