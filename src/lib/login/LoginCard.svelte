<script context="module" lang="ts">
	//Zod imports
	import { z } from 'zod';

	// loginSchema an object with a username and password
	export const loginSchema = z.object({
		username: z.string(),
		password: z.string().min(8).max(50)
	});
</script>

<script lang="ts">
	//Module imports
	import * as flashModule from 'sveltekit-flash-message/client';
	import { superForm } from 'sveltekit-superforms/client';

	//Module type imports
	import type { SuperValidated } from 'sveltekit-superforms';

	//Imported form object from load function
	export let loginForm: SuperValidated<typeof loginSchema>;

	//Superform Stores
	const { form, errors, constraints, message } = superForm(loginForm, {
		taintedMessage: null,
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<div class="card p-4 flex justify-center items-center w-fit">
	<!--Login Form-->
	<form action="?/login" method="POST">
		<!--Username field-->
		<label class="label">
			<span>Username</span>
			<input
				class="input {$errors.username || $message ? 'input-error' : undefined}"
				type="text"
				name="username"
				placeholder="username"
				bind:value={$form.username}
				{...$constraints.username}
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

		<br />

		<!--Submit button-->
		<button type="submit" class="btn variant-filled">Login</button>
	</form>
</div>
