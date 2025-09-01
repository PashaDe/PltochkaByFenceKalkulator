import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import container from 'redux/container';

import Page404 from 'views/Page404';


class RoutesList extends React.Component {
	element = (component, auth) => {
		if (this.auth(auth)) {
			if (!container?.user) {
				return this.redirect(auth);
			}
		}

		return component;
	}

	auth = (auth) => {
		if (auth === undefined) {
			return !!container.config.auth?.default;
		}

		return !!auth;
	}

	redirect = (auth) => {
		let path;

		if (typeof auth === 'string') {
			path = auth;
		} else {
			path = container.config.auth?.redirect || '/';
		}

		return () => (
			<Redirect to={path} />
		);
	}

	render() {
		return (
			<BrowserRouter basename={window.basepath}>
				<Switch>
					{container.routes.map((route) => (
						<Route
							exact
							path={route.path}
							component={this.element(route.component, route.auth)}
							key={route.path}
						/>
					))}

					<Route exact path="*" component={this.element(Page404, undefined)} />
				</Switch>
			</BrowserRouter>
		);
	}
}


export default RoutesList;
