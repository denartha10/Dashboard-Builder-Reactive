<script context="module" lang="ts">
	import { z } from 'zod';

	// registerSchema an object with a username, password, confirmPassword. uses a refine on the confirmPassword to make sure it matches the password
	export const registerSchema = z
		.object({
			username: z.string(),
			email: z.string().email(),
			password: z.string().min(8).max(50),
			confirmPassword: z.string().min(8).max(50)
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword']
		});
</script>

<script lang="ts">
	//Module imports
	import * as flashModule from 'sveltekit-flash-message/client';
	import { superForm } from 'sveltekit-superforms/client';

	//Module type imports
	import type { SuperValidated } from 'sveltekit-superforms';

	//Imported form object from load function
	export let registerForm: SuperValidated<typeof registerSchema>;

	//Superform Stores
	const { form, errors, constraints, message } = superForm(registerForm, {
		taintedMessage: null,
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<div class="card p-4 flex justify-center items-center w-fit">
	<!--Register Form-->
	<form action="?/register" method="POST">
		<!--Username field-->
		<label class="label">
			<span>Username</span>
			<input
				class="input {$errors.username || $message ? 'input-error' : undefined}"
				type="text"
				name="username"
				bind:value={$form.username}
				{...$constraints.username}
			/>
		</label>

		<!--Email field-->
		<label class="label">
			<span>Email</span>
			<input
				class="input {$errors.email || $message ? 'input-error' : undefined}"
				type="email"
				name="email"
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>

		<!--Password field-->
		<label class="label">
			<span>Password</span>
			<input
				class="input {$errors.password || $message ? 'input-error' : undefined}"
				type="password"
				name="password"
				bind:value={$form.password}
				{...$constraints.password}
			/>
		</label>

		<!--Confirm Password field-->
		<label class="label">
			<span>Confirm Password</span>
			<input
				class="input {$errors.confirmPassword || $message ? 'input-error' : undefined}"
				type="password"
				name="confirmPassword"
				bind:value={$form.confirmPassword}
				{...$constraints.confirmPassword}
			/>
		</label>

		<br />

		<!--Submit button-->
		<button type="submit" class="btn variant-filled">Register</button>
	</form>
</div>
