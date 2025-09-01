import env from './env';


export default {
	env,
	api: {
		url: (env === 'dev') ? 'https://joniec-kalkulator.lo/api/' : '/api/',
		withCredentials: (env === 'dev'),
	},
	auth: {
		default: true,
		redirect: '/login/',
	},
};