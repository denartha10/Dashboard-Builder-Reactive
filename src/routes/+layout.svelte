<script lang="ts">
	//Global Imports
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	//Flash Message Imports
	import { getFlash } from 'sveltekit-flash-message/client';

	//Floating UI Imports
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	//Skeleton Imports

	import {
		LightSwitch,
		storePopup,
		AppShell,
		AppBar,
		Drawer,
		drawerStore,
		type DrawerSettings,
		toastStore,
		Toast
	} from '@skeletonlabs/skeleton';

	//Iconify Imports
	import Icon from '@iconify/svelte';

	//Svelte + Kit Imports
	import { page } from '$app/stores';

	//My Imports
	import Navigation from '$lib/navigation/Navigation.svelte';
	import CreateProjectForm from '$lib/projects/CreateProjectForm.svelte';
	import UpdateProjectForm from '$lib/projects/UpdateProjectForm.svelte';

	const flash = getFlash(page);

	flash.subscribe(($flash) => {
		if (!$flash) return;

		$flash.type === 'error'
			? toastStore.trigger({ message: $flash.message, background: 'variant-filled-error' })
			: toastStore.trigger({ message: $flash.message, background: 'variant-filled-success' });

		flash.set(undefined);
	});

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const drawerSettings: DrawerSettings = {
		id: 'navigation-drawer',
		width: 'lg:w-64',
		position: 'left'
	};

	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}

	$: classlessSidebar = $page.url.pathname.includes('/pagebuilder/') ? 'w-0' : 'w-0 lg:w-64';
	$: hiddenHamburger = $page.url.pathname.includes('/pagebuilder/') ? '' : 'lg:hidden';
	$: user = $page?.data?.user ? $page.data.user : false;
</script>

<!-- Singletons -->
<Toast position='t'/>

<!-- Singletons -->
<Drawer>
	{#if $drawerStore.id === 'navigation-drawer'}
		<h2 class="p-4 h2">Navigation</h2>
		<hr />
		<Navigation />
	{:else if $drawerStore.id === 'create-project-drawer'}
		<h2 class="p-4 h2">Make a Project</h2>
		<hr />
		<CreateProjectForm createProjectForm={$drawerStore.meta.createProjectForm} />
	{:else if $drawerStore.id === 'update-project-drawer'}
		<h2 class="p-4 h2">Edit {$drawerStore.meta.project.name}</h2>
		<hr />
		<UpdateProjectForm
			updateProjectForm={$drawerStore.meta.updateProjectForm}
			selectedProject={$drawerStore.meta.project}
		/>
	{/if}
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 {classlessSidebar}">
	<!--Header of page-->
	<svelte:fragment slot="header">
		<!-- App Bar (Nav Bar) -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 {hiddenHamburger}" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>

					<!-- Irish for "Visual Boards" is Bord Fís which sounds like bored fish-->
					<strong class="text-xl uppercase"
						>Bored Fish <span class="inline-flex items-baseline"><Icon icon="carbon:fish" /></span
						></strong
					>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
				{#if user}
					<strong class="text-xl">{typeof user !== 'boolean' ? user.username : ''}</strong>
					<form action="/logout" method="POST">
						<button type="submit" class="btn variant-filled">Logout</button>
					</form>
				{:else}
					<a class="btn variant-ghost-surface" href="/loginorregister"> Login </a>
					<a class="btn variant-ghost-surface" href="/loginorregister"> Register </a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Left Sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
