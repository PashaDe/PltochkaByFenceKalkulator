import modules from 'modules/index';


class Modules {
	constructor() {
		this.reducers = [];
		this.views = [];

		this.init();
	}

	init = () => {
		modules.forEach((module) => {
			if (module.reducers) {
				this.reducers = {
					...this.reducers,
					...module.reducers,
				};
			}

			if (module.views) {
				this.view(module.views, module.base || '');
			}
		});
	}

	view = (source, base) => {
		source.forEach((view) => {
			const basePath = (view.route?.parent !== undefined) ? view.route.parent : base;
			const routePath = (view.route?.path !== undefined) ? view.route.path : '';

			const parent = `/${basePath}/`.replace(/\/+/g, '/');
			const path = `/${basePath}/${routePath}/`.replace(/\/+/g, '/');
			const component = view.route?.component;
			const auth = view.route?.auth;

			this.views.push({
				parent,
				path,
				component,
				auth,

				name: view.name || false,
				menu: view.menu || {},
				data: view.data || {},
			});

			if (view.childs) {
				this.view(view.childs, path);
			}
		});
	}

	generateRoutes = () => {
		const output = [];

		this.views.forEach((view) => {
			if (view.component) {
				output.push({
					path: view.path,
					component: view.component,
					auth: view.auth,
				});
			}
		});

		return output;
	}

	generateMenu = (type, parent = '/') => this.menu(type, parent)

	menu = (type, parent, depth = 1) => {
		const output = [];

		this.views.forEach((view) => {
			if (!parent || view.parent === parent) {
				const viewName = view.name || '';

				if (view.menu?.type && view.menu.type.includes(type)) {
					output.push({
						depth,
						link: (view.component) ? view.path : false,
						name: (view.menu?.name !== undefined) ? view.menu.name : viewName,
						data: view.data,
						childs: (view.parent !== view.path) ? this.menu(type, view.path, depth + 1) : undefined,
					});
				}
			}
		});

		return (output.length) ? output : undefined;
	}
}


export default Modules;