// Type import
import type { RequestHandler } from './$types';

// SvelteKit imports
import { redirect } from '@sveltejs/kit';

// Logout handler
export const POST: RequestHandler = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;
	throw redirect(303, '/');
};
