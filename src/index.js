import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShipList from './components/ShipConfigurator/ShipList';
import ShipEdit from './components/ShipConfigurator/ShipEdit';

import 'normalize.css';
import './common.scss';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Page404 from './components/Pages/Page404/Page404';

// import dataFromServer from './dataFromServer';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header/>
      <Navigation/>
      <Route path="/ship-configurator/">
        <Route exact path={'/'} component={ShipList}/>
        <Route path="edit-ship/:shipId/" component={ShipEdit}/>
        <Route path="/ship-configurator/cruise-edit/:shipId/" component={ShipList}/>
      </Route>
      {/*<Route component={Page404}/>*/}
    </Router>
  </Provider>,
  document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
