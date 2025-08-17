<script>
  import { onMount } from 'svelte';
  
  let apiEndpoint = "";
  let apiResponse = "";
  let isLoading = false;
  
  // Example query for testing
  let testQuery = `Can a PC with these specifications run Cyberpunk 2077? And at what FPS? 
  CPU: Intel i7-10700K
  GPU: NVIDIA RTX 3070
  RAM: 16GB
  Storage: SSD
  Please provide expected FPS at low, medium, and high settings and any recommendations.`;
  
  onMount(() => {
    // Load endpoint from localStorage if available
    apiEndpoint = localStorage.getItem('apiEndpoint') || "https://ab-chatgpt4o.abrahamdw882.workers.dev/";
  });
  
  async function testAPI() {
    isLoading = true;
    apiResponse = "";
    
    try {
      // Save endpoint for future use
      localStorage.setItem('apiEndpoint', apiEndpoint);
      
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
</script>

<svelte:head>
  <title>Developer Dashboard - Game Performance Predictor</title>
</svelte:head>

<main class="developer-dashboard">
  <h1>Developer Dashboard</h1>
  
  <nav class="dev-nav">
    <a href="/dev" class="active">Overview</a>
    <a href="/dev/api-tester">API Tester</a>
    <a href="/dev/documentation">Documentation</a>
    <a href="/dev/settings">Settings</a>
  </nav>
  
  <!-- About Me Section -->
  <section class="about-me-section">
    <h2>About the Developer</h2>
    <div class="about-me-content">
      <div class="profile">
        <div class="profile-image">
          <!-- You can add your profile image here -->
          <div class="avatar-placeholder">
            <span>💀</span> <!-- Your initials -->
          </div>
        </div>
        <div class="profile-info">
          <h3>Noah</h3>
          <p class="bio">Full-stack developer passionate about building modern web applications and AI-powered tools.</p>
          <div class="social-links">
            <a href="https://instagram.com/was.ash.enough" target="_blank" class="social-link instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://github.com/noah-zipit" target="_blank" class="social-link github">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
      <div class="project-info">
        <h3>About This Project</h3>
        <p>Game Performance Predictor is a tool I created to help gamers determine if their PC can run specific games. It uses AI to analyze hardware specifications and provide performance predictions.</p>
        <p>This project was built with SvelteKit and leverages an AI API to generate accurate predictions.</p>
      </div>
    </div>
  </section>
  
  <section class="api-configuration">
    <h2>API Configuration</h2>
    <div class="form-group">
      <label for="apiEndpoint">API Endpoint</label>
      <input id="apiEndpoint" bind:value={apiEndpoint} placeholder="Enter API endpoint URL">
    </div>
    
    <div class="form-group">
      <label for="testQuery">Test Query</label>
      <textarea id="testQuery" bind:value={testQuery} rows="8"></textarea>
    </div>
    
    <button on:click={testAPI} disabled={isLoading} class="test-button">
      {isLoading ? 'Testing...' : 'Test API'}
    </button>
  </section>
  
  {#if apiResponse}
    <section class="api-response">
      <h2>API Response</h2>
      <pre>{apiResponse}</pre>
    </section>
  {/if}
  
  <section class="debug-info">
    <h2>Debug Information</h2>
    <div class="debug-card">
      <h3>Environment</h3>
      <p>Mode: {import.meta.env.MODE}</p>
      <p>Development: {import.meta.env.DEV ? 'Yes' : 'No'}</p>
    </div>
    
    <div class="links">
      <a href="/" class="back-link">← Back to Main App</a>
    </div>
  </section>
</main>

<style>
  .developer-dashboard {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .dev-nav {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(77, 171, 245, 0.3);
  }
  
  .dev-nav a {
    color: white;
    text-decoration: none;
    padding: 5px 0;
  }
  
  .dev-nav a.active {
    font-weight: bold;
    border-bottom: 2px solid #4a7dff;
  }
  
  .about-me-section {
    background: rgba(26, 34, 54, 0.8);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.2);
  }
  
  .about-me-content {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 20px;
  }
  
  .profile {
    display: flex;
    gap: 20px;
    flex: 1;
    min-width: 300px;
  }
  
  .profile-image {
    flex-shrink: 0;
  }
  
  .avatar-placeholder {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #4dabf5, #8c5ae9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    font-weight: bold;
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.4);
  }
  
  .profile-info {
    flex: 1;
  }
  
  .profile-info h3 {
    margin-bottom: 10px;
    color: white;
  }
  
  .bio {
    margin-bottom: 15px;
    color: #b0b0d0;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 30px;
    text-decoration: none;
    color: white;
    transition: all 0.3s;
  }
  
  .instagram {
    background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
    box-shadow: 0 0 10px rgba(225, 48, 108, 0.3);
  }
  
  .github {
    background: #24292e;
    box-shadow: 0 0 10px rgba(36, 41, 46, 0.3);
  }
  
  .social-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(77, 171, 245, 0.4);
  }
  
  .project-info {
    flex: 1;
    min-width: 300px;
  }
  
  .project-info h3 {
    margin-bottom: 15px;
    color: white;
  }
  
  .project-info p {
    margin-bottom: 15px;
    color: #b0b0d0;
    line-height: 1.6;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    background: rgba(26, 34, 54, 0.8);
    color: white;
  }
  
  textarea {
    font-family: monospace;
  }
  
  .test-button {
    background: linear-gradient(45deg, #4dabf5, #8c5ae9);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.3);
    transition: all 0.3s;
  }
  
  .test-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(77, 171, 245, 0.4);
  }
  
  .test-button:disabled {
    background: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  .api-configuration, .api-response, .debug-info {
    background: rgba(26, 34, 54, 0.8);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.2);
  }
  
  pre {
    background-color: rgba(18, 24, 38, 0.9);
    padding: 15px;
    overflow-x: auto;
    border-radius: 4px;
    white-space: pre-wrap;
    font-size: 14px;
    color: #e0e0ff;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .debug-card {
    background-color: rgba(18, 24, 38, 0.5);
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .links {
    margin-top: 30px;
  }
  
  .back-link {
    color: #4a7dff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s;
  }
  
  .back-link:hover {
    color: #8c5ae9;
    text-shadow: 0 0 5px rgba(77, 171, 245, 0.5);
  }
  
  @media (max-width: 768px) {
    .about-me-content {
      flex-direction: column;
    }
    
    .profile {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .social-links {
      justify-content: center;
    }
  }
</style>