import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


class RouteForUsersWithRole extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let {component: Component, role, mode, authentication, ...rest} = this.props;
		
		return (
			<Route
				{...rest}
				render={props => {
					
					// unauthorized role. You need be unauthorized to see this,
					if (role === 'unauthorized') {
						if (authentication.auth) {
							if (mode === 'redirect') {
								return (
									<div>
										Вы должны выйти из системы, чтобы просматривать эту страницу!
									</div>
								);
							} else {
								return (null);
							}
						} else {
							return (<Component {...props} />);
						}
					}
					// client role. The one, who own ships.
					else if (role === 'client') {
						console.log('RCC');
						if (authentication.auth && authentication.isClient) {
							return (<Component {...props} />);
						} else {
							if (mode === 'redirect') {
								return (
									<Redirect to={{
										pathname: '/user-account/login/',
										state: {
											referrer: document.location.pathname,
											requiredRole: role
										}
									}}/>
								);
							} else {
								return null;
							}
						}
					}
					// passenger role. The one, who wanna trip.
					else if (role === 'passenger') {
						if (authentication.auth && authentication.isPassenger) {
							return (<Component {...props} />);
						} else {
							if (mode === 'redirect') {
								return (
									<Redirect to={{
										pathname: '/user-account/login/',
										state: {
											referrer: document.location.pathname,
											requiredRole: role
										}
									}}/>
								);
							} else {
								return (null);
							}
						}
					} else {
						return (<div style={{color: 'red', fontWeight: 'bold'}}>
							MISCONFIG!!!
						</div>);
					}
				}}
			/>
		);
	}
	
	static configureRedux(state) {
		return {
			authentication: state.authentication
		};
	}
}


export default connect(RouteForUsersWithRole.configureRedux)(RouteForUsersWithRole);