import { page } from '$app/stores';
import { derived } from 'svelte/store';

const formState = derived(page, ($page) => {
	return Object.fromEntries(
		Array.from($page.url.searchParams.entries()).map(([key, value]) => [key, value])
	)
});

export { formState };
