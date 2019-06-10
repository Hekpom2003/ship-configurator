import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import ShipList from './components/ShipConfigurator/ShipList';
import ShipEdit from './components/ShipConfigurator/ShipEdit';

// import dataFromServer from './dataFromServer';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/ship-configurator/" component={ShipList} />
      <Route path="/ship-configurator/edit-ship/:shipId/" component={ShipEdit} />
      <Route path="/ship-configurator/cruise-edit/:shipId/" component={ShipList} />
    </Router>
  </Provider>,
  document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
