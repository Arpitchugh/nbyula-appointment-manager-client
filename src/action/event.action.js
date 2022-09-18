import { eventsActions } from '../slices/event.slice';
import api from '../util/api.util';

export function createEvent(body) {
	return async () => {
		return await api.post('/events', body);
	};
}

export function getUserEvents() {
	return async dispatch => {
		const res = await api.get('/events');

		const formattedEvents = res.records.map(event => ({
			...event,
			start: new Date(event.start),
			end: new Date(event.end),
		}));
		dispatch(eventsActions.replaceUserEvents(formattedEvents));
		return res;
	};
}
