<script lang="ts">
	//Skeleton Store imports
	import { drawerStore } from '@skeletonlabs/skeleton';

	//Svelte + Kit Imports
	import { page } from '$app/stores';

	//Iconify Imports
	import Icon from '@iconify/svelte';

	function drawerClose(): void {
		drawerStore.close();
	}

	const NavgigationItems = Object.freeze([
		{
			name: 'Homepage',
			href: '/',
			icon: 'mdi:home'
		},
		{
			name: 'Contact',
			href: '/contact',
			icon: 'mdi:email'
		},
		{
			name: 'Dashboard Builder',
			href: '/pagebuilder',
			icon: 'mdi:page-layout-sidebar-left'
		}
	]);

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav p-4">
	<ul>
		{#each NavgigationItems as { name, href, icon }}
			<li>
				<a {href} class={classesActive(href)} on:click={drawerClose}>
					<Icon {icon} class="w-4 h-4 mr-2" />
					<span class="flex-auto">{name}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
