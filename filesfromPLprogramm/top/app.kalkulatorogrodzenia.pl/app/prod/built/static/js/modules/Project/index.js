import panelReducer from './redux/panel/reducer';
import workspaceReducer from './redux/workspace/reducer';

import Project from './views/Project';
import Preview from './views/Preview';
import GraphicDetails from './views/GraphicDetails';
import Gamepad from './views/Gamepad';


export default {
	reducers: {
		panel: panelReducer,
		workspace: workspaceReducer,
	},
	views: [
		{ route: { path: 'project', component: Project } },
		{ route: { path: 'project/:id', component: Project } },
		{ route: { path: 'preview/:id/:token', component: Preview, auth: false } },
		{ route: { path: 'graphic-details', component: GraphicDetails, auth: false } },
		{ route: { path: 'gamepad', component: Gamepad } },
	],
};
