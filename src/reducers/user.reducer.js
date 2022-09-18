/**
 * Accepts a array of all users as payload
 */
export function replaceAllUsers(state, action) {
	state.allUsers = action.payload;
}
