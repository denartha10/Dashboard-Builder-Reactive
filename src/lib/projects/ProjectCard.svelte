<script lang="ts">
	//Svelte event dispatcher
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ update: { project: Project } }>();

	// Type Imports
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { Project } from '$lib/projects/project.d.ts';

	// Skeleton Imports
	import { popup } from '@skeletonlabs/skeleton';

	// Svelte Imports
	import Icon from '@iconify/svelte';

	export let project: Project;

	// Settings Popup
	const settingsPopup: PopupSettings = {
		event: 'hover',
		target: 'settingsPopup',
		placement: 'bottom'
	};

	// Edit Popup
	const editPopup: PopupSettings = {
		event: 'hover',
		target: 'editPopup',
		placement: 'bottom'
	};

	// Edit Event
	function update(): void {
		dispatch('update', { project });
	}
</script>

<!--Project Card-->
<div class="card variant-filled-primary overflow-hidden">
	<header>
		{#if project.image}
			<div class="w-full aspect-[27/9] overflow-hidden">
				<img src={project.image} alt="Post" class="object-fit" />
			</div>
		{:else}
			<div class="bg-white w-full aspect-[27/9]" />
		{/if}
		<div class="p-4">
			<h3 class="h3">{project.name}</h3>
		</div>
	</header>

	<!--Main Content-->
	<section class="p-4">The main content of the card</section>

	<footer class="p-4 flex justify-start items-center space-x-4">
		<!-- Settings Button -->
		<button
			type="button"
			class="btn-icon btn-icon-lg variant-filled"
			use:popup={settingsPopup}
			on:click={update}
			><Icon icon="material-symbols:settings" />
		</button>

		<!-- Edit Button -->
		<a
			type="button"
			class="btn-icon btn-icon-lg variant-filled"
			use:popup={editPopup}
			href={'/pagebuilder/' + project.id}
		>
			<Icon icon="mdi:pencil" />
		</a>
	</footer>
</div>

<!-- Settings Popup -->
<div class="card p-4 shadow-xl z-50" data-popup="settingsPopup">
	<div><p>Project Settings</p></div>
	<div class="arrow bg-surface-100-800-token" />
</div>

<!-- Edit Popup -->
<div class="card p-4 shadow-xl z-50" data-popup="editPopup">
	<div><p>Edit Project</p></div>
	<div class="arrow bg-surface-100-800-token" />
</div>
