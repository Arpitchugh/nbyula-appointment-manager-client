import api from '../util/api.util';

export function postSignup(values) {
	return async () => {
		return await api.post('/auth/signup', values);
	};
}
