<script>
  let { children } = $props();
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  const isActive = (path) => {
    return $page.url.pathname === `${base}${path}`;
  };
</script>

<nav>
  <a href="{base}/" class:active={isActive('/')}>home</a>
  <a href="{base}/accordion" class:active={isActive('/accordion')}>accordion</a>
  <a href="{base}/onetable" class:active={isActive('/onetable')}>onetable</a>
  <a href="{base}/jointables" class:active={isActive('/jointables')}>jointables</a>
  <a href="{base}/artistsal" class:active={isActive('/artistsal')}>artistsal</a>
  <a href="{base}/params" class:active={isActive('/params')}>params</a>
</nav>

<style>
  nav {
    margin-bottom: 2rem;
  }
  .active {
    color: #9900ff;
    font-weight: bold;
    border-bottom: 2px solid;
  }
</style>

{@render children()}