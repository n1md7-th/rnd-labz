<script>
  import { userStore } from '$lib';
  import { goto } from '$app/navigation';

  let telegramID = '';
  let password = '';
  let token = '';
  let credentialsAreCorrect = false;
  let tokenValidationPassed = false;
  let wrongCredentials = false;
  let wrongToken = false;

  const handleLogin = () => {
    credentialsAreCorrect = userStore.credentialsAreCorrect({
      telegramID, password,
    });
    wrongCredentials = !credentialsAreCorrect;
  };

  const handleToken = () => {
    tokenValidationPassed = userStore.get().token === token;
    wrongToken = !tokenValidationPassed;
    if (credentialsAreCorrect && tokenValidationPassed) goto('/profile');
  };
</script>

<div class="container my-5">
  <h3 class="text-center">
    Sign in
  </h3>
  <div class="row justify-content-center">
    <div class="col-md-6">
      {#if wrongCredentials}
        <div class="alert alert-danger" role="alert">
          Wrong credentials
        </div>
      {/if}
      {#if wrongToken}
        <div class="alert alert-danger" role="alert">
          Wrong token
        </div>
      {/if}
      {#if !credentialsAreCorrect}
        <form on:submit|preventDefault={handleLogin}>
          <div class="form-group">
            <label for="telegramID">Telegram ID</label>
            <input type="text" class="form-control" id="telegramID" bind:value={telegramID} autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" bind:value={password} autocomplete="off" required>
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
      {:else}
        <form on:submit|preventDefault={handleToken}>
          <div class="form-group">
            <label for="token">Token</label>
            <input type="text" class="form-control" id="token" bind:value={token} autocomplete="off" required>
          </div>
          <button type="submit" class="btn btn-primary">Verify</button>
        </form>
      {/if}
    </div>
  </div>
</div>
