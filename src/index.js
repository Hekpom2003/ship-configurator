import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ShipConfigurator from './Components/ShipConfigurator';
import dataFromServer from './dataFromServer';

ReactDOM.render(<ShipConfigurator data={dataFromServer}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
