<script lang="ts">
	import Topbar from '$lib/components/topbar.svelte';

	import favicon from '$lib/assets/favicon.webp';
	import Bottombar from '$lib/components/bottombar.svelte';
	import { page } from '$app/stores';
  let curr = $derived($page.url.toString().split("/").slice(3))
	let { children } = $props();
</script>

<svelte:head>
  <title > Andrey Golovin  {curr.join(" / ")}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Topbar />
<div class="container-centered">
  {@render children()}
</div>

<style lang="scss">
	@import '../styles/style.scss';
</style>
