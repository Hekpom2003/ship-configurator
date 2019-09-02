import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import WrongRoleError from './WrongRoleError';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
	render() {
		if (!this.props.authentication.auth) {
			return (
				<div>
					<LoginForm/>
				</div>
			);
		} else {
			
			let targetUrl = '/';
			if (typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.referrer === 'string')
				targetUrl = this.props.location.state.referrer;
			
			// already authorised. Why there?
			if (typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.requiredRole !== "undefined") {
				
				switch (this.props.location.state.requiredRole) {
					case 'client':
						if (this.props.authentication.isClient) {
							return <Redirect to={targetUrl}/>
						} else {
							return <WrongRoleError/>;
						}
					
					case 'passenger':
						if (this.props.authentication.isPassenger) {
							return <Redirect to={targetUrl}/>
						} else {
							return <WrongRoleError/>;
						}
					
					// any role
					default:
						return <Redirect to={targetUrl}/>
				}
				
				
			} else {
				return (
					<Redirect to={targetUrl}/>
				);
			}
		}
		
	}
	
	static configureRedux(state) {
		return {
			authentication: state.authentication
		};
	}
}

export default connect(LoginPage.configureRedux)(LoginPage);