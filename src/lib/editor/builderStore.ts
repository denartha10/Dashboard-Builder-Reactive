import { writable, derived } from 'svelte/store';

import type ComponentType  from '$lib/components/component';
import componentRegistry from '$lib/components';

// Global boolean to prevents wiping the store when the page is reloaded
const shouldUpdateComponentStore = writable<{ projectID: string; stale: boolean }>({
	projectID: '',
	stale: true
});

// This store is  written to with project data from the database when the editor navigates to a new project to allow client side editing
// It is a writable store of an array of ComponentType
const componentStore = writable<ComponentType[]>([]);

//This derived store allows the components to remain dumb as they do not need to perform transformation from json to Component Instance themselves
//It is a derived store from componentStore and returns an array of Component Instances
// Called pageBuilderComponentStore
const pageBuilderComponentStore = derived(componentStore, ($componentStore) => {
	return $componentStore
		.map((componentEntry, index) => ({
			component: componentRegistry[componentEntry.componentStringRepresentingConstructor],
			props: componentEntry.componentProps,
			index: index
		}))
		.filter((derivedComponentEntry) => derivedComponentEntry.component !== undefined);
});

const formBuilderComponentStore = derived(componentStore, ($componentStore) => {
    return $componentStore
        .map((componentEntry, index) => ({...componentEntry, index: index}))
        .filter((componentEntryAfterIndex) => componentEntryAfterIndex.componentStringRepresentingConstructor === 'Form')
        .map((filteredComponentEntry) => ({
            component: componentRegistry[filteredComponentEntry.componentStringRepresentingConstructor],
            props: filteredComponentEntry.componentProps,
            index: filteredComponentEntry.index
        }));
});

const currentlySelectedForm = writable<number>(-1);

const currentlySelectedFormInputs = derived([componentStore, currentlySelectedForm], ([$componentStore, $currentlySelectedForm]) => {
    return $currentlySelectedForm >= 0
        ? $componentStore[$currentlySelectedForm].componentProps.inputs ?? []
        : [];
});

export {
    componentStore,
    pageBuilderComponentStore,
    shouldUpdateComponentStore,
    formBuilderComponentStore,
    currentlySelectedForm,
    currentlySelectedFormInputs
}