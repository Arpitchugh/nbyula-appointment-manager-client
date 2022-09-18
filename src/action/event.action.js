import api from '../util/api.util';

export function createEvent(body) {
	return async () => {
		return await api.post('/events', body);
	};
}
