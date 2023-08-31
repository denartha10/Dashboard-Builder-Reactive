<script context="module">
    import {z} from 'zod';

    export const saveComponentSchema = z.object({
        components: z.object({
            componentStringRepresentingConstructor: z.string(),
            componentProps: z.record(z.any())
        })
        .array()
    })
</script>

<script lang="ts">
    //Component Store
    import {componentStore} from '$lib/editor/builderStore';

    //Module Imports
    import * as flashModule from 'sveltekit-flash-message/client';
    import {superForm} from 'sveltekit-superforms/client';

    //Module type imports
    import type {SuperValidated} from 'sveltekit-superforms';

    //imported form object from load function
    export let saveComponentForm: SuperValidated<typeof saveComponentSchema>;

    const {form, constraints, enhance} = superForm(saveComponentForm, {
        dataType: 'json',
        taintedMessage: null,
        flashMessage: {
            module: flashModule
        },
        syncFlashMessage: true
    });

    $: $form.components = $componentStore;
</script>

<form action="?/saveComponents" method="POST">
    <input 
        type="text"
        name="components"
        bind:value={$form.components}
        {...$constraints.components}
    />
    <input type="submit" value="Save Project" class="btn variant-filled" />
</form>