<script lang="ts">
    import {
        formBuilderComponentStore,
        componentStore,
        currentlySelectedForm
    } from '../builderStore';

    $: filteredFormList = $formBuilderComponentStore.filter(
        (form) => form.index !== $currentlySelectedForm
    )

    $: displayObject = filteredFormList.length > 0
        ? filteredFormList[0]
        : undefined;

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
    class="border-2 border-dotted border-secondary-900 min-h-screen"
    on:dragover|preventDefault
    on:drop|preventDefault={handleDrop}
>
    {#if displayObject !== undefined}
        <svelte:component this={displayObject.component} {...displayObject.props}/>
    {/if}
</div>