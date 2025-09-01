import Register from './views/Register';
import Activate from './views/Activate';
import Login from './views/Login';
import Logout from './views/Logout';
import ResetPassword from './views/ResetPassword';
import Extend from './views/Extend';
import ChangePassword from './views/Account/ChangePassword';


export default {
	views: [
		{ route: { path: 'register', component: Register, auth: false } },
		{ route: { path: 'activate/:code', component: Activate, auth: false } },
		{ route: { path: 'login', component: Login, auth: false } },
		{ route: { path: 'logout', component: Logout, auth: true } },
		{ route: { path: 'reset-password/:code?', component: ResetPassword, auth: false } },
		{ route: { path: 'extend', component: Extend, auth: false } },
		{
			route: { path: 'account' },
			childs: [
				{ route: { path: 'change-password', component: ChangePassword, auth: true } },
			],
		},
	],
};