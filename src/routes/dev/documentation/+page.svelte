<!-- src/routes/dev/documentation/+page.svelte -->
<script>
  // No script needed for now
</script>

<svelte:head>
  <title>Documentation - Developer Dashboard</title>
</svelte:head>

<div class="documentation">
  <h1>Project Documentation</h1>
  
  <section class="doc-section">
    <h2>Project Overview</h2>
    <p>
      Game Performance Predictor is a web application built with Svelte that allows users to
      check if their PC can run specific games and predict the expected performance.
      The application uses an external AI API to generate predictions based on hardware specifications
      and game requirements.
    </p>
  </section>
  
  <section class="doc-section">
    <h2>Architecture</h2>
    
    <h3>Frontend</h3>
    <ul>
      <li><strong>Framework:</strong> SvelteKit</li>
      <li><strong>Styling:</strong> CSS (no external libraries)</li>
      <li><strong>State Management:</strong> Built-in Svelte stores and local storage</li>
    </ul>
    
    <h3>Backend</h3>
    <ul>
      <li><strong>API Integration:</strong> External AI API for performance predictions</li>
      <li><strong>Data Storage:</strong> Browser localStorage for history and settings</li>
    </ul>
  </section>
  
  <section class="doc-section">
    <h2>API Usage</h2>
    <p>
      The application uses an external AI API to generate performance predictions.
      Requests are sent with a natural language query containing the user's hardware
      specifications and the game they want to check.
    </p>
    
    <h3>Request Format</h3>
    <pre><code>GET https://ab-chatgpt4o.abrahamdw882.workers.dev/?q=Can%20a%20PC%20with...</code></pre>
    
    <h3>Example Query</h3>
    <pre><code>Can a PC with these specifications run [GAME]? And at what FPS? 
CPU: [CPU_MODEL]
GPU: [GPU_MODEL]
RAM: [RAM_SIZE]GB
Storage: [STORAGE_TYPE]
Please provide expected FPS at low, medium, and high settings and any recommendations.</code></pre>
  </section>
  
  <section class="doc-section">
    <h2>Project Structure</h2>
    <pre><code>game-performance-predictor/
├── src/
│   ├── lib/              # Components and utilities
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # API service functions
│   │   └── utils/        # Helper functions
│   ├── routes/           # SvelteKit routes/pages
│   └── app.css           # Global styles
├── static/               # Static assets
└── tests/                # Test files</code></pre>
  </section>
  
  <section class="doc-section">
    <h2>Local Development</h2>
    <p>To set up the project for local development:</p>
    
    <ol>
      <li>Clone the repository</li>
      <li>Run <code>npm install</code> to install dependencies</li>
      <li>Create a <code>.env</code> file based on <code>.env.example</code></li>
      <li>Run <code>npm run dev</code> to start the development server</li>
    </ol>
  </section>
</div>

<style>
  .documentation {
    max-width: 100%;
  }
  
  h1 {
    margin-bottom: 30px;
  }
  
  .doc-section {
    margin-bottom: 40px;
  }
  
  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }
  
  h3 {
    margin: 20px 0 10px;
    font-size: 1.2rem;
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  ul, ol {
    margin-bottom: 15px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  pre {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 15px 0;
  }
  
  code {
    font-family: monospace;
    font-size: 14px;
  }
</style>