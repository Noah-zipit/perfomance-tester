<!-- src/routes/dev/api-tester/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getSettings, saveSettings } from '$lib/utils/storage.js';
  
  let apiEndpoint = "";
  let testQuery = "";
  let apiResponse = "";
  let isLoading = false;
  
  // Example templates
  const templates = [
    {
      name: "Basic Test",
      query: `Can a PC with these specifications run Cyberpunk 2077? And at what FPS? 
CPU: Intel i7-10700K
GPU: NVIDIA RTX 3070
RAM: 16GB
Storage: SSD
Please provide expected FPS at low, medium, and high settings and any recommendations.`
    },
    {
      name: "Low-end PC Test",
      query: `Can a PC with these specifications run Fortnite? And at what FPS? 
CPU: Intel i3-6100
GPU: NVIDIA GTX 1050
RAM: 8GB
Storage: HDD
Please provide expected FPS at low, medium, and high settings and any recommendations.`
    }
  ];
  
  onMount(() => {
    const settings = getSettings();
    apiEndpoint = settings.apiEndpoint;
    testQuery = templates[0].query;
  });
  
  async function testAPI() {
    isLoading = true;
    apiResponse = "";
    
    try {
      // Save endpoint for future use
      const settings = getSettings();
      settings.apiEndpoint = apiEndpoint;
      saveSettings(settings);
      
      const encodedQuery = encodeURIComponent(testQuery);
      const response = await fetch(`${apiEndpoint}?q=${encodedQuery}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      apiResponse = await response.text();
    } catch (error) {
      apiResponse = `Error: ${error.message}`;
    } finally {
      isLoading = false;
    }
  }
  
  function loadTemplate(template) {
    testQuery = template.query;
  }
</script>

<svelte:head>
  <title>API Tester - Developer Dashboard</title>
</svelte:head>

<div class="api-tester">
  <h1>API Tester</h1>
  <p class="description">Test the performance prediction API with different queries</p>
  
  <div class="form-section">
    <div class="form-group">
      <label for="apiEndpoint">API Endpoint</label>
      <input id="apiEndpoint" bind:value={apiEndpoint} placeholder="Enter API endpoint URL">
    </div>
    
    <div class="templates">
      <h3>Templates</h3>
      <div class="template-buttons">
        {#each templates as template}
          <button on:click={() => loadTemplate(template)} class="template-button">
            {template.name}
          </button>
        {/each}
      </div>
    </div>
    
    <div class="form-group">
      <label for="testQuery">Test Query</label>
      <textarea id="testQuery" bind:value={testQuery} rows="10"></textarea>
    </div>
    
    <button on:click={testAPI} disabled={isLoading || !apiEndpoint || !testQuery} class="test-button">
      {isLoading ? 'Testing...' : 'Send Request'}
    </button>
  </div>
  
  {#if isLoading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Waiting for API response...</p>
    </div>
  {/if}
  
  {#if apiResponse && !isLoading}
    <div class="response-section">
      <h2>API Response</h2>
      <div class="response-meta">
        <div>Status: <span class="status success">Success</span></div>
        <div>Length: {apiResponse.length} characters</div>
      </div>
      <pre class="response-content">{apiResponse}</pre>
    </div>
  {/if}
</div>

<style>
  .api-tester {
    max-width: 100%;
  }
  
  h1 {
    margin-bottom: 10px;
  }
  
  .description {
    color: #666;
    margin-bottom: 25px;
  }
  
  .form-section {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
  }
  
  textarea {
    font-family: monospace;
  }
  
  .test-button {
    background: #4a7dff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .test-button:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
  }
  
  .templates {
    margin-bottom: 20px;
  }
  
  .template-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .template-button {
    background: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .template-button:hover {
    background: #e0e0e0;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 8px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #4a7dff;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 15px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .response-section {
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
    overflow: hidden;
  }
  
  .response-section h2 {
    padding: 15px 20px;
    margin: 0;
    background: #f5f5f5;
    border-bottom: 1px solid #eee;
  }
  
  .response-meta {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: #fafafa;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  
  .status {
    font-weight: 600;
  }
  
  .status.success {
    color: #27ae60;
  }
  
  .response-content {
    padding: 20px;
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
  }
</style>