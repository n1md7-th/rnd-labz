<script>
  import { userStore } from '$lib';
  import { goto } from '$app/navigation';

  let telegramID = '';
  let password = '';
  let token = '';
  let showToken = false;

  const handleSignUp = () => {
    token = crypto.randomUUID();
    userStore.set({
      password,
      token,
      telegramID,
      createdAt: new Date(),
    });
    showToken = true;
  };

  const handleOk = () => goto('/sign-in');
</script>

<div class="container my-5">
  <h3 class="text-center">
    Sign up
  </h3>
  <div class="row justify-content-center">
    <div class="col-md-6">
      {#if !showToken}
        <form on:submit|preventDefault={handleSignUp}>
          <div class="form-group">
            <label for="telegramID">Telegram ID</label>
            <input type="text" class="form-control" id="telegramID" bind:value={telegramID} autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" bind:value={password} autocomplete="off" required>
          </div>
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
      {:else}
        <div class="alert alert-success mt-3" role="alert">
          Your token: <code>{token}</code>
          <br>
          Copy and save it somewhere safe.
        </div>
        <button on:click={handleOk} class="btn btn-success">OK</button>
      {/if}
    </div>
  </div>
</div>

