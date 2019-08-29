import React from 'react';
import store from '../../store';
import {connect} from "react-redux";
import {BrowserRouter as Redirect} from 'react-router-dom';

class Authorize extends React.Component {
	constructor(params) {
		super(params);
		
	}
	
	componentDidMount() {
		console.log(this.props);
	}
	
	render() {
		
		// check trought required roles
		
		// unauthorized role. You need be unauthorized to see this,
		if (this.props.role === 'unauthorized') {
			if (this.props.authentication.auth) {
				if (this.props.mode === 'strict') {
					return (
						<div>
							Вы должны выйти из системы, чтобы просматривать эту страницу!
						</div>
					);
				} else {
					return (null);
				}
			} else {
				return this.props.children;
			}
		}
		// client role. The one, who own ships.
		else if (this.props.role === 'client') {
			if (this.props.authentication.auth && this.props.authentication.isClient) {
				return this.props.children;
			} else {
				if (this.props.mode === 'strict') {
					return (
						<Redirect to={{
							pathname: '/user-account/login/',
							state: {
								referrer: document.location.pathname,
								requiredRole: this.props.role
							}
						}}/>
					);
				} else {
					return (null);
				}
			}
		}
		// passenger role. The one, who wanna trip.
		else if (this.props.role === 'passenger') {
			if (this.props.authentication.auth && this.props.authentication.isPassenger) {
				return this.props.children;
			} else {
				if (this.props.mode === 'strict') {
					return (
						<Redirect to={{
							pathname: '/user-account/login/',
							state: {
								referrer: document.location.pathname,
								requiredRole: this.props.role
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
		
	}
	
	static ReformatCombineCollector(state) {
		return {
			authentication: state.authentication
		};
	}
}

export default connect(Authorize.ReformatCombineCollector)(Authorize);