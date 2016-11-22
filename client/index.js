import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './containers/App'

import rootReducer from './reducers'

const store = createStore(
	rootReducer,
	compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

// retrieve news data on store initialization
import { getNews } from './actions/news'
store.dispatch(getNews());

import './theme/main.scss'

ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>,
	document.getElementById('root')
);