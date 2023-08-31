<script lang="ts">
	import type { PageData } from './$types';
	import LoginCard from '$lib/login/LoginCard.svelte';
	import RegisterCard from '$lib/register/RegisterCard.svelte';

	export let data: PageData;
</script>

<div class="container p-10 flex justify-center items-center h-full">
	<div class="flex">
		<LoginCard loginForm={data.loginForm} />

		<span class="divider-vertical h-42 mx-6" />
		
		<RegisterCard registerForm={data.registerForm} />
	</div>
</div>
