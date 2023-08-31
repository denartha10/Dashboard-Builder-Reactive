<script context="module" lang="ts">
	import { z } from 'zod';

	// update project schema is the same as create project schema but with an id of positive int and a public of boolean
	export const updateProjectSchema = z.object({
		id: z.string().nonempty(),
		name: z.string().min(4).max(50),
		datasourceurl: z.string().url(),
		description: z.string().max(100),
		collaborators: z.array(z.string()),
		public: z.boolean()
	});
</script>

<script lang="ts">
	//Module imports
	import * as flashModule from 'sveltekit-flash-message/client';
	import { superForm } from 'sveltekit-superforms/client';

	//Skeleton Imports
	import { InputChip, SlideToggle } from '@skeletonlabs/skeleton';

	//Svelte + Kit Imports
	import { page } from '$app/stores';

	//Module type imports
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { Project } from './project';
	import Icon from '@iconify/svelte';

	export let updateProjectForm: SuperValidated<typeof updateProjectSchema>;
	export let selectedProject: Project;

	//Superform Stores
	const { form, errors, constraints, enhance } = superForm(updateProjectForm, {
		taintedMessage: null,
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});

	//Reactive statements
	// White list of users to be used in the input chip
	$: userWhitelist = ($page.data.userList || []).filter(
		(u) => u !== ($page.data.user as App.User).username
	);

	//Form initialization
	$: form.set({
		id: selectedProject.id,
		name: selectedProject.name,
		datasourceurl: selectedProject.datasourceurl,
		description: selectedProject.description,
		collaborators: selectedProject.collaborators,
		public: selectedProject.public
	});
</script>

<div class="p-10">
	<form action="?/updateProject" method="post" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />
		<label class="label">
			<span>Title</span>
			<input
				class="input {$errors.name ? 'input-error' : ''}"
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
					class={$errors.datasourceurl ? 'input-error' : ''}
					type="url"
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
				class="textarea {$errors.description ? 'input-error' : ''}"
				rows="4"
				placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				name="description"
				bind:value={$form.description}
				{...$constraints.description}
			/>
		</label>
		<br />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span>Collaborators</span>
			<InputChip
				name="collaborators"
				whitelist={userWhitelist}
				bind:value={$form.collaborators}
				class={$errors.collaborators ? 'input-error' : ''}
			/>
		</label>
		<br />
		<!-- svelte-ignore a11y-label-has-associated-control -->

		<SlideToggle
			name="public"
			bind:checked={$form.public}
			class={$errors.public ? 'input-error' : ''}
			>{$form.public
				? 'Public : All platforms users will see this'
				: 'Private : Only you and your collaborator will see this'}</SlideToggle
		>
		<br />
		<br />
		<input class="btn variant-filled hover:cursor-pointer" type="submit" value="Save" />
	</form>

	<br />
	<br />

	<aside class="alert variant-ghost-error">
		<!-- Icon -->
		<div><Icon icon="ic:baseline-warning" /></div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3">Danger Zone!</h3>
			<p>
				Click to delete project. This action can not be undone, all of your project data will be
				gone
			</p>
		</div>
		<div class="alert-actions">
			<form action="?/deleteProject" method="post">
				<input type="hidden" name="id" value={selectedProject.id}>
				<button type="submit" class="btn variant-filled">Delete</button>
			</form>
		</div>
	</aside>
</div>
