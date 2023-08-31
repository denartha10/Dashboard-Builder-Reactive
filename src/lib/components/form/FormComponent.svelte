<script lang="ts">
	import type { standardFieldType } from '$lib/editor/formBuilder/forms';
	import { formState } from '$lib/projectStores';

	export let inputs: standardFieldType[] = [];
</script>

<div class="card p-10">
	<form method="GET">
		{#if inputs !== undefined && inputs.length > 0}
			{#each inputs as input, i}
				{#if input.type === 'checkbox'}
					<label class="flex items-center space-x-2">
						<input
							name={input.name ?? i}
							class="checkbox"
							type="checkbox"
							value={$formState[input.name ?? i] ?? ''}
						/>
						<p>{input.name ?? i}</p>
					</label>
				{:else if input.type === 'submit'}
					<input type="submit" class="btn variant-flled" value={input.name ?? 'fetch'} />
				{:else}
					<label class="label">
						<span class="capitalize">{input.name ?? i}</span>
						<input
							class="input"
							type={input.type}
							name={input.name ?? i}
							value={$formState[input.name ?? i] ?? ''}
							{...input.constraints}
						/>
					</label>
				{/if}
				<br />
			{/each}
		{:else}
			<h3 class="h3">Add form inputs in the form builder</h3>
		{/if}
	</form>
</div>
