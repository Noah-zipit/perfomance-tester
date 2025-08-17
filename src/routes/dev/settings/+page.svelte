<!-- src/routes/dev/settings/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getSettings, saveSettings } from '$lib/utils/storage.js';
  
  let settings = {
    apiEndpoint: '',
    theme: 'light',
    detailedMode: false
  };
  
  let isSaved = false;
  
  onMount(() => {
    settings = getSettings();
  });
  
  function handleSave() {
    saveSettings(settings);
    isSaved = true;
    
    setTimeout(() => {
      isSaved = false;
    }, 3000);
  }
  
  function resetToDefaults() {
    settings = {
      apiEndpoint: 'https://ab-chatgpt4o.abrahamdw882.workers.dev/',
      theme: 'light',
      detailedMode: false
    };
  }
</script>

<svelte:head>
  <title>Settings - Developer Dashboard</title>
</svelte:head>

<div class="settings-page">
  <h1>Developer Settings</h1>
  <p class="description">Configure application settings for development and testing</p>
  
  <form on:submit|preventDefault={handleSave} class="settings-form">
    <div class="form-section">
      <h2>API Configuration</h2>
      
      <div class="form-group">
        <label for="apiEndpoint">API Endpoint URL</label>
        <input 
          id="apiEndpoint" 
          bind:value={settings.apiEndpoint} 
          placeholder="Enter API endpoint URL"
        >
      </div>
    </div>
    
    <div class="form-section">
      <h2>Display Settings</h2>
      
      <div class="form-group">
        <label for="theme">Theme</label>
        <select id="theme" bind:value={settings.theme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      
      <div class="form-group checkbox">
        <input type="checkbox" id="detailedMode" bind:checked={settings.detailedMode}>
        <label for="detailedMode">Detailed Mode (Show additional debug information)</label>
      </div>
    </div>
    
    <div class="actions">
      <button type="button" class="reset-button" on:click={resetToDefaults}>
        Reset to Defaults
      </button>
      
      <button type="submit" class="save-button">
        Save Settings
      </button>
    </div>
    
    {#if isSaved}
      <div class="save-notification">
        Settings saved successfully!
      </div>
    {/if}
  </form>
</div>

<style>
  .settings-page {
    max-width: 100%;
  }
  
  h1 {
    margin-bottom: 10px;
  }
  
  .description {
    color: #666;
    margin-bottom: 25px;
  }
  
  .settings-form {
    max-width: 600px;
  }
  
  .form-section {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group.checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .form-group.checkbox label {
    margin-bottom: 0;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  input[type="text"], 
  input[type="url"],
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .reset-button, .save-button {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    border: none;
  }
  
  .reset-button {
    background: #f0f0f0;
    color: #333;
  }
  
  .save-button {
    background: #4a7dff;
    color: white;
  }
  
  .save-notification {
    margin-top: 20px;
    padding: 12px;
    background: #d4edda;
    color: #155724;
    border-radius: 4px;
    text-align: center;
    animation: fadeIn 0.3s;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>