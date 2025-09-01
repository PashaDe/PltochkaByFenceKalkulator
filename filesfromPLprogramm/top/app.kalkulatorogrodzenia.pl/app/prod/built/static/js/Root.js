import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import config from 'config';
import container from 'redux/container';
import store from 'redux/store';

import Http from 'classes/Http';

import Modules from 'Modules';
import Routes from 'Routes';


class Root extends React.Component {
	constructor() {
		super();

		this.init();

		this.state = {
			view: 'loading',
		};
	}

	componentDidMount() {
		Http.post('status/', {
			success: (response) => {
				if (response.lang) {
					container.lang = response.lang;
				} else {
					container.lang = null;
				}

				if (response.translations) {
					container.translations = response.translations;
				} else {
					container.translations = null;
				}

				if (response.user) {
					container.user = response.user;
				} else {
					container.user = null;
				}

				if (response.permissions) {
					container.permissions = response.permissions;
				} else {
					container.permissions = null;
				}

				if (response.dates) {
					container.dates = response.dates;
				} else {
					container.dates = null;
				}

				this.setState({ view: 'default' });
			},
		});
	}

	init = () => {
		const modules = new Modules();

		container.config = config;
		container.routes = modules.generateRoutes();

		store.replaceReducer(combineReducers(modules.reducers));
	}

	render() {
		switch (this.state.view) {
			case 'loading':
				return (
					<div />
				);

			default:
				return (
					<Provider store={store}>
						<Routes />
					</Provider>
				);
		}
	}
}


export default Root;