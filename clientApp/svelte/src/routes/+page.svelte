<script>
  import { page } from '$app/stores';

  const name = $page.url.searchParams.get('name');
</script>

{#if name}
  <h1 class="text-muted my-4 mx-2">Hello, {name}!</h1>
{:else}
  <h1 class="my-4 mx-2 text-center text-info">:Hello world:</h1>
{/if}
