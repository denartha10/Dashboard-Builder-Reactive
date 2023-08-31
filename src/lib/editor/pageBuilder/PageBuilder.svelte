<script lang="ts">
    import PageBuilderFloatingForm from './PageBuilderFloatingForm.svelte';
    import { pageBuilderComponentStore, componentStore } from '../builderStore';

    const handleDrop = (event: any) => {
        const componentString = event.dataTransfer.getData('text/plain');
        $componentStore =[
            ...$componentStore,
            {
                componentStringRepresentingConstructor: componentString,
                componentProps: {}
            }
        ];
    };
</script>

<div 
    class="border-2 border-dotted border-secondary-900 min-h-[32px]" 
    on:dragover|preventDefault
    on:drop|preventDefault={handleDrop}
>
    {#each $pageBuilderComponentStore as {component, index}}
        <PageBuilderFloatingForm {component} popupID={index} bind:props={$componentStore[index].componentProps}/>
        <br>
        <br>
    {/each}
</div>