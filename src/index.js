import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ShipList from './components/ShipConfigurator/ShipList';
import ShipEdit from './components/ShipConfigurator/ShipEdit';
import RouteForUsersWithRole from './components/Auth/RouteForUsersWithRole';
import LoginPage from './components/Auth/LoginPage'
import LoadAndCheckAuthorizationData from './components/Auth/LoadAndCheckAuthorizationData';


import 'normalize.css';
import './common.scss';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import IndexForPassengers from './components/Pages/IndexForPassengers';
import IndexForUnauthorized from './components/Pages/IndexForUnauthorized';
import IndexForClients from './components/Pages/IndexForClients';

import Page404 from './components/Pages/Page404/Page404';

// import dataFromServer from './dataFromServer';

ReactDOM.render(
	<Provider store={store}>
		<LoadAndCheckAuthorizationData>
			<BrowserRouter>
				<Header auth={store.getState().authentication}/>
				<Navigation/>
				
				
				<Switch>
					
					{/*<IsAuth>
					{siteMap.map(item=>{
						if (item.group === user.group){
							return <Route path={item.path} component={item.component}/>
						}
					})}
				</IsAuth>*/}
					
					
					<Route path="/ship-configurator/">
						<RouteForUsersWithRole role="client" mode="redirect" exact path={'/ship-configurator/'} component={ShipList}/>
						<RouteForUsersWithRole role="client" mode="redirect" path="/ship-configurator/edit-ship/:shipId/" component={ShipEdit}/>
						<RouteForUsersWithRole role="client" mode="redirect" path="/ship-configurator/cruise-edit/:shipId/"
						                       component={ShipList}/>
					</Route>
					
					<Route path="/user-account/">
						<RouteForUsersWithRole role="passenger" mode="redirect" exact path={'/user-account/'} component={IndexForPassengers}/>
						<Route path="/user-account/login/" component={LoginPage}/>
					</Route>
					
					<Route exact path='/'>
						<RouteForUsersWithRole role="client" mode="hide-dont-redirect" component={IndexForClients}/>
						<RouteForUsersWithRole role="passenger" mode="hide-dont-redirect" component={IndexForPassengers}/>
						<RouteForUsersWithRole role="unauthorized" mode="hide-dont-redirect" component={IndexForUnauthorized}/>
					</Route>
					
					
					<Route component={Page404}/>
				</Switch>
			
			</BrowserRouter>
		</LoadAndCheckAuthorizationData>
	</Provider>,
	document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
