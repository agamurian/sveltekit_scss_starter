<script>
  let lastScrollTop = 0;
  let hideNav = $state(false)
  let marginTop = $state(0)
	import { menu } from '$lib/content/common';
	import { page } from '$app/stores';
  import { onMount } from 'svelte';

  function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
    console.log("t")
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light'
    );
  }

  onMount(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark-theme');
    }
  });
</script>

<svelte:window
	on:scroll={() => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop) {
			hideNav = true;
		} else hideNav = false;
    lastScrollTop = scrollTop;
    if(hideNav){
      marginTop = -100;
    }else{
      marginTop = 0;
    }
	}}
  />

  <div class="uptop" />
<div class="nav top" style="margin-top: {marginTop}px">
  <div class="left">
    <ul>

			{#each menu as item}
				<a class="menuitem" class:active-route={item.href == $page.route.id} href={item.href}
       ><nobr>{item['en']}</nobr></a
				>
			{/each}
    </ul>
    </div>

  <div class="center">
    <!--
    <div class="cards">
      <hr/>
      <div class="blockcard">
      <h1>Search</h1>
      <hr/>
        <h4>
          Sidenote:
        </h4>
        <p>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words are the truncation of dolorem ipsum. Lorem ipsum's purpose is to permit a page layout to be designed, independently of the copy that will subsequently populate it, or to demonstrate various fonts of a typeface without meaningful text that could be distracting
        </p>
      <hr/>
        <h4>
          Sidenote:
        </h4>
        <p>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words are the truncation of dolorem ipsum. Lorem ipsum's purpose is to permit a page layout to be designed, independently of the copy that will subsequently populate it, or to demonstrate various fonts of a typeface without meaningful text that could be distracting
        </p>
        </div>
    </div>
    -->
  </div>
  <div class="right">
    <ul>
      <li>
        <a href="javascript:if(window.print)window.print()">print</a>
      </li>
      <li>
        <a href="#" onclick={(e) => { e.preventDefault(); toggleTheme(); }}>theme</a>
      </li>
    </ul>
    </div>
  <div class="overdrop"><a href="/">projects</a> > <a href="/">current title</a> > <a href="/">svelte</a>
      <!--
    <div class="cards">
      <div class="blockcard">
        <h4>
          Sidenote:
        </h4>
        <p>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words are the truncation of dolorem ipsum. Lorem ipsum's purpose is to permit a page layout to be designed, independently of the copy that will subsequently populate it, or to demonstrate various fonts of a typeface without meaningful text that could be distracting
        </p>
        </div>
    </div>
      -->
  </div>
</div>
