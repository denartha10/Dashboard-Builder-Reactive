<script lang="ts">
	//accordionitem
	import {AccordionItem} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { standardFormFieldRegistry } from './formRegistry';
	import {
		formBuilderComponentStore,
		currentlySelectedForm,
		currentlySelectedFormInputs,
		componentStore
	} from '../builderStore';
	import FloatingUiAccordionFormItem from './FloatingUIAccordionFormItem.svelte';

	const handleFormSelect = (index: number) => {
		$currentlySelectedForm = index;
	};

	const handleDragStart = (event: any) => {
		const element: HTMLDivElement = event.target as HTMLDivElement;
		const componentString: string = element.getAttribute('data-fromFieldInfo') ?? '';
		event.dataTransfer.setData('text/plain', componentString);
	};
</script>

<h4 class="h4">Form</h4>

<AccordionItem>
	<!-- lead slot svelte:fragment -->
	<svelte:fragment slot="lead"><Icon icon="mdi:form-outliine" /></svelte:fragment>
	<!-- summary slot svelte:fragment with "Forms on current page" text -->
	<svelte:fragment slot="summary">Forms on current page</svelte:fragment>
	<!-- content slot svelte:fragment displaying formBuilderComponentStore as divs -->
	<svelte:fragment slot="content">
		{#if $formBuilderComponentStore.length > 0}
			{#each $formBuilderComponentStore as form}
				<div
					class="card p-4 rounded-non {$currentlySelectedForm === form.index
						? 'border-2 border-solid border-primary'
						: ''}"
					on:click={() => {
						handleFormSelect(form.index);
					}}
					on:keypress={() => {
						handleFormSelect(form.index);
					}}
				>
					Form at position {form.index + 1}
				</div>
			{/each}
		{:else}
			<h4 class="h4">Add a form in page builder to see here</h4>
		{/if}
	</svelte:fragment>
</AccordionItem>

<AccordionItem>
	<!-- lead slot svelte:fragment -->
	<svelte:fragment slot="lead"><Icon icon="mdi:input" /></svelte:fragment>
	<!-- summary slot svelte:fragment with "Forms on current page" text -->
	<svelte:fragment slot="summary">Inputs of selected form</svelte:fragment>
	<!-- content slot svelte:fragment displaying formBuilderComponentStore as divs -->
	<svelte:fragment slot="content">
		{#if $currentlySelectedFormInputs.length > 0}
            {#each $currentlySelectedFormInputs as _, i}
                <FloatingUiAccordionFormItem
                    bind:input={$componentStore[$currentlySelectedForm].componentProps.inputs[i]}
                    popupID={i}
                />
            {/each}
        {:else}
            <h4 class="h4">Select a form & add inputs to view</h4>
        {/if}
	</svelte:fragment>
</AccordionItem>


<br>
<h4 class="h4">Fields</h4>
<AccordionItem>
    <svelte:fragment slot="lead"><Icon icon="material-symbols:text-fields" /></svelte:fragment>
    <svelte:fragment slot="summary">Standard Fields</svelte:fragment>
    <svelte:fragment slot="content">
       {#each Object.keys(standardFormFieldRegistry) as standardField}
            <div 
                class="card p-4 rounded-none-hover:cursor-move"
                draggable="true"
                data-formFieldInfo={standardField}
                on:dragstart={handleDragStart}
            >
                {standardField}
            </div>
       {/each}
    </svelte:fragment>
</AccordionItem>