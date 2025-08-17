<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status}: {$page.error.message}</title>
</svelte:head>

<div class="error-container">
  <div class="error-card">
    <div class="error-status">{$page.status}</div>
    <h1>{$page.error.message}</h1>
    
    <p>Sorry, something went wrong. Please try again later.</p>
    
    <div class="actions">
      <a href="/" class="button">Go Home</a>
      <button class="button secondary" on:click={() => history.back()}>
        Go Back
      </button>
    </div>
  </div>
</div>

<style>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
  }
  
  .error-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
    max-width: 500px;
    width: 100%;
  }
  
  .error-status {
    font-size: 72px;
    font-weight: 700;
    color: #e74c3c;
    margin-bottom: 10px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    margin-bottom: 30px;
  }
  
  .actions {
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  
  .button {
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .button:not(.secondary) {
    background: #4a7dff;
    color: white;
    border: none;
  }
  
  .button.secondary {
    background: #f0f0f0;
    color: #333;
    border: none;
  }
</style>