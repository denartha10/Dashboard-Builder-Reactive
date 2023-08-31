<script context="module" lang="ts">
	import { z } from 'zod';

	// create project schema an object with title of min 4 and max 50 and a datasourceurl of type url
	export const createProjectSchema = z.object({
		name: z.string().min(4).max(50).default(''),
		datasourceurl: z.string().url(),
		description: z
			.string()
			.max(100)
			.default('Lorem ipsum dolor sit amet consectetur adipisicing elit'),
		collaborators: z.array(z.string())
	});
</script>

<script lang="ts">
	//Module imports
	import * as flashModule from 'sveltekit-flash-message/client';
	import { superForm } from 'sveltekit-superforms/client';

	//Skeleton Imports
	import { InputChip } from '@skeletonlabs/skeleton';

	//Svelte + Kit Imports
	import { page } from '$app/stores';

	//Module type imports
	import type { SuperValidated } from 'sveltekit-superforms';

	//Reactive statements
	$: userWhitelist = ($page.data.userList || []).filter(
		(u) => u !== ($page.data.user as App.User).username
	);

	export let createProjectForm: SuperValidated<typeof createProjectSchema>;

	//Superform Stores
	const { form, errors, constraints, message, enhance } = superForm(createProjectForm, {
		taintedMessage: null,
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<div class="p-10">
	<form action="?/createProject" method="post" use:enhance>
		<label class="label">
			<span>Title</span>
			<input
				class="input"
				type="text"
				placeholder="Input"
				name="name"
				bind:value={$form.name}
				{...$constraints.name}
			/>
		</label>
		<br />
		<label class="label">
			<span>Datasource URL</span>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">https://</div>
				<input
					class={$errors.datasourceurl || $message ? 'input-error' : ''}
					type="search"
					placeholder="Datasource"
					name="datasourceurl"
					bind:value={$form.datasourceurl}
					{...$constraints.datasourceurl}
				/>
			</div>
		</label>
		<br />
		<label class="label">
			<span>Description</span>
			<textarea
				class="textarea {$errors.description || $message ? 'input-error' : ''}"
				rows="4"
				placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				name="description"
				bind:value={$form.description}
				{...$constraints.description}
			/>
		</label>
		<br />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span>Collaborators</span>
			<InputChip
				name="collaborators"
				whitelist={userWhitelist}
				bind:value={$form.collaborators}
				class={$errors.collaborators || $message ? 'input-error' : ''}
			/>
		</label>
		<br />
		<input class="btn variant-filled hover:cursor-pointer" type="submit" value="Create" />
	</form>
</div>
