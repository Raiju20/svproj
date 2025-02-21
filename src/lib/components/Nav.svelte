<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  const isActive = (path) => {
    return $page.url.pathname === `${base}${path}`;
  };
</script>

<nav>
  <a href="{base}/" class:active={isActive('/')}>home</a>
  <a href="{base}/about" class:active={isActive('/about')}>about</a>
</nav>

<style>
  nav {
    margin-bottom: 2rem;
  }
  .active {
    color: #ff3e00;
    font-weight: bold;
    border-bottom: 2px solid;
  }
</style>