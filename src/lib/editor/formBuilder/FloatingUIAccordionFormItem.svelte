<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { standardFormFieldRegistry } from './formRegistry';
	import { componentStore, currentlySelectedForm } from '../builderStore';
	import type { standardFieldType } from './forms';
	import { popup } from '@skeletonlabs/skeleton';

	export let popupID: number;
	export let input: standardFieldType;

	const editInputPopup: PopupSettings = {
		event: 'click',
		target: `${popupID}`,
		placement: 'right'
	};

	const handleInputChange = () => {
		input = input;
	};

	const handleRemove = (popupID: number) => {
		$componentStore[$currentlySelectedForm].componentProps['inputs'] = $componentStore[
			$currentlySelectedForm
		].componentProps['inputs'].filter((_: any, i: number) => i !== popupID);
	};
</script>

<div class="card p-4 rounded-non" use:popup={editInputPopup}>
	{input.name ?? popupID}
</div>

<div class="card-p-4 shadow-xl z-50" data-popup={`${popupID}`}>
	<h4 class="h4">Props</h4>
	<label class="label">
		<span>Name</span>
		<input type="text" class="input" bind:value={input.name} on:input={handleInputChange} />
	</label>
	{#each standardFormFieldRegistry[input.type] ?? [] as constraint}
		<label for="">
			<span>{constraint}</span>
			<input type="text" class="input" bind:value={input.constraints[constraint]} />
		</label>
	{/each}
	<br />
	<button
		class="btn variant-outline-error"
		on:click|preventDefault={() => {
			handleRemove(popupID);
		}}>Remove</button
	>
</div>
