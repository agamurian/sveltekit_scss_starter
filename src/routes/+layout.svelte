<script lang="ts">
	import Topbar from '$lib/components/topbar.svelte';

	import favicon from '$lib/assets/favicon.svg';
	import Bottombar from '$lib/components/bottombar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Topbar />
{@render children()}

<style lang="scss">
	@import '../styles/style.scss';
</style>
