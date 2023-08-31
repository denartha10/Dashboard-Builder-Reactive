import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userList = await locals.pb
		.collection('users')
		.getFullList<App.User>({
			fields: 'username'
		})
		.then((recordList) => structuredClone(recordList).map((u) => u.username));
	
	
	return {
		user: locals.user,
		userList
	};
};
