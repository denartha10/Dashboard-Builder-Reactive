<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import componentRegistry from '$lib/components';
	import Icon from '@iconify/svelte';

	function dragStart(event: DragEvent) {
		const element: HTMLDivElement = event.target as HTMLDivElement;
		const componentString: string = element.dataset.component as string;
		event.dataTransfer?.setData('text/plain', componentString);
	}
</script>

<AccordionItem>
	<svelte:fragment slot="lead"><Icon icon="mdi:table" /></svelte:fragment>
	<svelte:fragment slot="summary">Components</svelte:fragment>
	<svelte:fragment slot="content">
		{#each Object.keys(componentRegistry) as componentType}
			<div
                on:dragstart={dragStart}
				class="card p-4 rounded-none hover:cursor-move"
				draggable="true"
				data-component={componentType}
			>
				{componentType}
			</div>
		{/each}
	</svelte:fragment>
</AccordionItem>
