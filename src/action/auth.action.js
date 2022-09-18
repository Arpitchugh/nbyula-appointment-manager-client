import api from '../util/api.util';
import { userActions } from '../slices/user.slice';

export function postSignup(body) {
	return async () => {
		return await api.post('/auth/signup', body);
	};
}

export function getVerifyAccount(pathParams) {
	return async () => {
		return await api.get(
			`/auth/verify/${pathParams.email}/${pathParams.verificationCode}`
		);
	};
}

export function postForgotPassword(body) {
	return async () => {
		return await api.post('/auth/forgotpassword', body);
	};
}

export function patchResetPassword(pathParams, body) {
	return async () => {
		return await api.patch(
			`/auth/resetpassword/${pathParams.email}/${pathParams.passwordResetCode}`,
			body
		);
	};
}

export function getCurrentUser() {
	return async dispatch => {
		try {
			const accessToken = localStorage.getItem('access_token');

			const res = await api.get('/auth/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			// if (res.user) {
			// 	dispatch(userActions.replaceUser({ user: res.user, isLoggedIn: true }));
			// } else {
			// 	dispatch(userActions.replaceUser({ user: null, isLoggedIn: false }));
			// }

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err);
		}
	};
}

export function getLogoutUser() {
	return async () => {
		try {
			const res = await api.get('/auth/logout');

			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err);
		}
	};
}
