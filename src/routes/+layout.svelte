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
  <a href="{base}/junk" class:active={isActive('/junk')}>junk</a>
  <a href="{base}/onetable" class:active={isActive('/onetable')}>onetable</a>
  <a href="{base}/jointables" class:active={isActive('/jointables')}>jointables</a>
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