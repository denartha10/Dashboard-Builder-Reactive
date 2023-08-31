<script lang="ts">
	// Type Imports
	import type { Project } from '$lib/projects/project.d.ts';

	// Component Imports
	import ProjectCard from '$lib/projects/ProjectCard.svelte';
	import Icon from '@iconify/svelte';

	// Svelte Imports
	import { page } from '$app/stores';

	// Skeleton Imports
	import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

	export let data;

	const createProjectDrawerSettings: DrawerSettings = {
		id: 'create-project-drawer',
		position: 'right',
		meta: { createProjectForm: $page.data.createProjectForm ?? false },
		width: 'w-4/5 lg:w-1/2'
	};

	const editProjectDrawerSettings: DrawerSettings = {
		id: 'update-project-drawer',
		position: 'right',
		width: 'w-4/5 lg:w-1/2'
	};

	function drawerOpen(): void {
		drawerStore.open(createProjectDrawerSettings);
	}

	function handleUpdateProject(event: CustomEvent<{ project: Project }>): void {
		drawerStore.open({
			...editProjectDrawerSettings,
			meta: {
				project: event.detail.project,
				createProjectForm: $page.data.createProjectForm ?? false
			}
		});
	}
</script>

{#if data.projectList.length < 1}
	<div class="p-10 justify-center items-center flex flex-col gap-6 h-full">
		<p class="text-center">No projects found</p>
		<button
			type="button"
			class="btn-icon btn-icon-xl variant-ghost-primary"
			on:click={drawerOpen}
			on:keydown={drawerOpen}
		>
			<Icon icon="mdi:plus" />
		</button>
		<p>Add a new one</p>
	</div>
{:else}
	<div class="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each data.projectList as project}
			<ProjectCard
				{project}
				on:update={(event) => {
					handleUpdateProject(event);
				}}
			/>
		{/each}
		<div
			class="card card-hover variant-ringed h-full hover:cursor-pointer"
			on:click={drawerOpen}
			on:keydown={drawerOpen}
		>
			<div class="p-10 justify-center items-center flex h-full">
				<Icon icon="mdi:plus" class="text-3xl" />
			</div>
		</div>
	</div>
{/if}
