<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { componentStore } from '../builderStore';
	import { popup } from '@skeletonlabs/skeleton';

	export let component: ConstructorOfATypedSvelteComponent;
	export let popupID: number;
	export let props: Record<string, any> = {};

	let instance: any;

	const editComponentPopup: PopupSettings = {
		event: 'click',
		target: `${popupID}`,
		placement: 'left'
	};

	const handlePropInput = () => {
		props = props;
	};

	function handleRemove(popupID: number) {
		$componentStore = $componentStore.filter((_, index) => index !== popupID);
	}
</script>

<div use:popup={editComponentPopup}>
	<svelte:component this={component} {...props} bind:this={instance} />
</div>

<div class="card p-4 shadow-xl z-50" data-popup={`${popupID}`}>
	<h4 class="h4">props</h4>
	<br />
	{#each Object.keys(instance?.$$?.props ?? {}) as prop}
		<label class="label">
			<span>{prop}</span>
			<input
				type="text"
				class="input"
				name={prop}
				bind:value={props[prop]}
				on:input={handlePropInput}
			/>
		</label>
		<br />
	{/each}
	<br />
	<button class="btn variant-outline-error" on:click|preventDefault={() => handleRemove(popupID)}>
		Remove
	</button>
</div>
