<script>
  import { userStore } from '$lib';
  import { goto } from '$app/navigation';

  const user = userStore.get();
  const notLoggedIn = userStore.isEmpty();

  if (notLoggedIn) goto('/sign-up');
</script>

<div class="container my-5">
  <h3 class="text-center">
    Profile
  </h3>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <p>Telegram ID: <code>{user.telegramID}</code></p>
      <p>Password: <code>{"*".repeat(user.password.length)}</code></p>
      <p>Created At: <code>{new Date(user.createdAt).toLocaleString()}</code></p>
    </div>
  </div>
</div>
