import axios from 'axios';
import qs from 'qs';

import container from 'redux/container';


class Http {
	constructor(method, url, options) {
		const defaults = {
			external: false,
			params: {},
			data: {},
			success: () => {},
			cancelled: () => {
				// console.log('Cancelled!');
			},
			error: (error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			},
			cancel: false,
		};

		const args = { ...defaults, ...options };

		let uri = (!args.external) ? `${container.config.api?.url}${url}` : url;
		const params = (args.params) ? qs.stringify(args.params) : '';

		if (params) {
			uri += (uri.indexOf('?') === -1) ? `?${params}` : `&${params}`;
		}

		axios({
			method,
			url: uri,
			data: (method === 'post' && args.data) ? qs.stringify(args.data) : {},
			headers: (method === 'post') ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {},
			cancelToken: (args.cancel) ? new axios.CancelToken(args.cancel) : undefined,
			withCredentials: (!args.external) ? container.config.api?.withCredentials : false,
		}).then((response) => {
			switch (response.status) {
				case 200:
					if (response.data._auth_denied_) {
						container.user = null;
						window.location.replace('/');
					}

					args.success(response.data);
					break;

				case 401:
					container.user = null;
					window.location.replace('/');
					break;

				default:
			}
		}).catch((error) => {
			if (axios.isCancel(error)) {
				args.cancelled(error);
			} else {
				args.error(error);
			}
		});
	}

	static get(url, args) {
		return new Http('get', url, args);
	}

	static post(url, args) {
		return new Http('post', url, args);
	}
}


export default Http;