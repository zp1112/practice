import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './provider';
import { createStore } from 'redux'
import './index.css';
// import App from './App';
import asyncComponent from './asyncComponent';
import testStore from './testStore';
import registerServiceWorker from './registerServiceWorker';
import watch from './mvvm/watcher';

const App = asyncComponent(() => import('./App'));
if (process.env.NOED_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}
const store = createStore(testStore);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
