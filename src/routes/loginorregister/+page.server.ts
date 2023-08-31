// Type imports
import type { PageServerLoad, Actions } from './$types';

//SvelteKit imports
import { redirect } from '@sveltejs/kit';

//Superforms imports
import { message, superValidate } from 'sveltekit-superforms/server';

//My imports
import { safeAwait } from '$lib';
import { loginSchema } from '$lib/login/LoginCard.svelte';
import { registerSchema } from '$lib/register/RegisterCard.svelte';


//Load function for login and register
export const load: PageServerLoad = async ({ locals }) => {

	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

    return {
        loginForm: await superValidate(loginSchema),
        registerForm: await superValidate(registerSchema)
    };
};


//Actions including login and register
export const actions: Actions = {
    login: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return message(form, { type: 'error', message: 'Invalid form' });
        }

		const authAttempt = await safeAwait(
			locals.pb.collection('users').authWithPassword(form.data.username, form.data.password)
        );
        
		switch (authAttempt[1]) {
			case null:
				console.error(authAttempt[0]);
				return message(form, { type: 'error', message: 'Invalid username or password' });
			default:
				throw redirect(303, '/');
		}
    },
    
    register: async ({ locals, request }) => {
        const form = await superValidate(request, registerSchema);

        if (!form.valid) {
            return message(form, { type: 'error', message: 'Invalid form' });
        }

        const registerAttempt = await safeAwait(locals.pb.collection('users').create({
            username: form.data.username,
            email: form.data.email,
            password: form.data.password,
            passwordConfirm: form.data.confirmPassword
        }));

        switch (registerAttempt[1]) {
            case null:
                return message(form, { type: 'error', message: "Error registering" });
            default:
                throw redirect(303, '/loginorregister');
        }
	}
};
