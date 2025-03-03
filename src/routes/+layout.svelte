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
  <a href="{base}/about" class:active={isActive('/about')}>about</a>
  <a href="{base}/junk" class:active={isActive('/junk')}>junk</a>
  <a href="{base}/onetable" class:active={isActive('/onetable')}>onetable</a>
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