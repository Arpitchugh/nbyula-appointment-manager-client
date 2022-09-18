import { userActions } from '../slices/user.slice';
import api from '../util/api.util';

export function getAllUsers() {
	return async dispatch => {
		const res = await api.get('/users');
		console.log('====================================');
		console.log(res);
		console.log('====================================');
		dispatch(userActions.replaceAllUsers(res.records));
		return res;
	};
}
