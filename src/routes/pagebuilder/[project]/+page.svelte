<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import FormBuilder from '$lib/editor/formBuilder/FormBuilder.svelte';
	let tabSet: string = 'dashboard';
</script>

<div class="grid grid-cols-12">
	<div class="col-span-3 p-10 overflow-auto">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead">H1</svelte:fragment>
				<svelte:fragment slot="summary">Headings</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="card p-4 rounded-none" draggable="true">H1</div>
					<div class="card p-4 rounded-none" draggable="true">H2</div>
					<div class="card p-4 rounded-none" draggable="true">H3</div>
					<div class="card p-4 rounded-none" draggable="true">H4</div>
					<div class="card p-4 rounded-none" draggable="true">H5</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Icon icon="mdi:table"/></svelte:fragment>
				<svelte:fragment slot="summary">Components</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="card p-4 rounded-none" draggable="true">Table</div>
					<div class="card p-4 rounded-none" draggable="true">Form</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><Icon icon="mdi:chart-line"/></svelte:fragment>
				<svelte:fragment slot="summary">Components</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="card p-4 rounded-none" draggable="true">Line Chart</div>
					<div class="card p-4 rounded-none" draggable="true">Bar Chart</div>
					<div class="card p-4 rounded-none" draggable="true">Pie Chart</div>
					<div class="card p-4 rounded-none" draggable="true">Scatter Chart</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>

	<div class="col-span-9">
		<TabGroup justify="justify-center">
			<Tab bind:group={tabSet} name="tab1" value={'dashboard'}>Dashboard</Tab>
			<Tab bind:group={tabSet} name="tab2" value={'charts'}>Charts</Tab>
			<Tab bind:group={tabSet} name="tab3" value={'forms'}>Forms</Tab>
			<svelte:fragment slot="panel">
				<div class="p-4">
					{#if tabSet === 'dashboard'}
						<div class="border-2 border-dotted">
							<h1 class="h1">Hello</h1>
						</div>
					{:else if tabSet === 'charts'}
						<!-- <LineChart/> -->
					{:else if tabSet === 'forms'}
						<FormBuilder/>
					{/if}
				</div>
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
