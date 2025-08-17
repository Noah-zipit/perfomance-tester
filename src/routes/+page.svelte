<script>
  import { onMount } from 'svelte';
  import SpecsForm from '$lib/components/forms/SpecsForm.svelte';
  import GameSelector from '$lib/components/forms/GameSelector.svelte';
  import PerformanceMeter from '$lib/components/results/PerformanceMeter.svelte';
  import PCViewer from '$lib/components/viewer/PCViewer.svelte';
  import { saveResult } from '$lib/services/api.js';
  
  let userSpecs = {
    cpu: '',
    gpu: '',
    ram: 8,
    storage: 'SSD'
  };
  let selectedGame = '';
  let predictionText = null;
  let isLoading = false;
  let error = null;
  let showPCViewer = true; // Toggle this to control 3D viewer visibility
  
  // Handle prediction request
  async function getPrediction() {
    if (!userSpecs.cpu || !userSpecs.gpu || !selectedGame) {
      alert('Please fill in all required fields');
      return;
    }
    
    isLoading = true;
    error = null;
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specs: userSpecs,
          game: selectedGame
        })
      });
      
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      
      predictionText = await response.text();
      
      // Save to history
      saveResult(userSpecs, selectedGame, predictionText);
      
      // Scroll to results on mobile
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          const resultsContainer = document.querySelector('.results-container');
          if (resultsContainer) {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } catch (err) {
      console.error('Prediction failed:', err);
      error = "Sorry, we couldn't get a prediction at this time. Please try again later.";
      predictionText = null;
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Game Performance Predictor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</svelte:head>

<div class="main-container">
  <div class="hero">
    <h1>Game Performance Predictor</h1>
    <p class="subtitle">Check if your PC can run any game with AI-powered analysis</p>
  </div>
  
  <div class="input-container">
    <div class="specs-container">
      <h2>Your PC Specifications</h2>
      <SpecsForm bind:specs={userSpecs} />
    </div>
    
    <div class="game-container">
      <h2>Game Selection</h2>
      <GameSelector bind:selectedGame />
      
      <button 
        class="predict-button" 
        on:click={getPrediction} 
        disabled={isLoading || !userSpecs.cpu || !userSpecs.gpu || !selectedGame}
      >
        {#if isLoading}
          <span class="spinner"></span> Analyzing...
        {:else}
          Can I Run It?
        {/if}
      </button>
    </div>
  </div>
  
  {#if showPCViewer}
    <section class="pc-viewer-section">
      <h2>Interactive PC Viewer</h2>
      <p class="section-description">Explore your PC components in 2D and see how they affect game performance</p>
      
      <PCViewer selectedSpecs={userSpecs} />
    </section>
  {/if}
  
  {#if isLoading}
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Analyzing your hardware compatibility...</p>
      <p class="loading-note">This may take a few moments</p>
    </div>
  {/if}
  
  {#if error}
    <div class="error-container">
      <div class="error-icon">⚠</div>
      <p>{error}</p>
      <button class="retry-button" on:click={getPrediction}>Try Again</button>
    </div>
  {/if}
  
  {#if predictionText && !isLoading}
    <div class="results-container">
      <h2>Performance Prediction</h2>
      <div class="game-info">
        <div class="game-title">{selectedGame}</div>
        <div class="hardware-info">{userSpecs.cpu} / {userSpecs.gpu} / {userSpecs.ram}GB RAM</div>
      </div>
      
      <!-- Performance Meter Component -->
      <PerformanceMeter predictionText={predictionText} />
      
      <div class="prediction-text">
        {#each predictionText.split('\n') as line}
          <p>{line}</p>
        {/each}
      </div>
      
      <div class="actions">
        <a href="/history" class="history-link">View History</a>
        <button class="reset-button" on:click={() => predictionText = null}>
          New Prediction
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .main-container {
    padding: 20px;
    color: white;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .hero {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(26, 34, 54, 0.8), rgba(18, 24, 38, 0.8));
    border: 1px solid rgba(77, 171, 245, 0.2);
    box-shadow: 0 0 20px rgba(77, 171, 245, 0.2);
  }
  
  h1 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 15px;
    background: linear-gradient(90deg, #4dabf5, #8c5ae9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 15px rgba(77, 171, 245, 0.5);
  }
  
  .subtitle {
    color: #b0b0d0;
    font-size: 1.2rem;
  }
  
  h2 {
    color: white;
    margin-bottom: 20px;
    font-size: 1.5rem;
    position: relative;
    padding-bottom: 10px;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #4dabf5, #8c5ae9);
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.5);
  }
  
  .input-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .specs-container, .game-container {
    flex: 1;
    min-width: 300px;
    background: rgba(26, 34, 54, 0.8);
    padding: 25px;
    border-radius: 12px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.1);
    backdrop-filter: blur(10px);
  }
  
  .predict-button {
    margin-top: 25px;
    width: 100%;
    padding: 15px;
    background: linear-gradient(45deg, #4dabf5, #8c5ae9);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.3s;
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.3);
  }
  
  .predict-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(77, 171, 245, 0.4);
  }
  
  .predict-button:disabled {
    background: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  .pc-viewer-section {
    margin: 40px 0;
  }
  
  .section-description {
    color: #b0b0d0;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: rgba(26, 34, 54, 0.8);
    border-radius: 12px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.1);
    margin-bottom: 40px;
  }
  
  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(77, 171, 245, 0.2);
    border-radius: 50%;
    border-top-color: #4dabf5;
    animation: spin 1.5s linear infinite;
    margin-bottom: 20px;
    box-shadow: 0 0 20px rgba(77, 171, 245, 0.4);
  }
  
  .loading-note {
    color: #b0b0d0;
    font-size: 14px;
    margin-top: 10px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: rgba(244, 67, 54, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(244, 67, 54, 0.3);
    margin-bottom: 40px;
    text-align: center;
  }
  
  .error-icon {
    font-size: 40px;
    color: #f44336;
    margin-bottom: 15px;
  }
  
  .retry-button {
    margin-top: 20px;
    background: rgba(244, 67, 54, 0.2);
    color: white;
    border: 1px solid rgba(244, 67, 54, 0.4);
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .retry-button:hover {
    background: rgba(244, 67, 54, 0.4);
  }
  
  .results-container {
    margin-top: 30px;
    background: rgba(26, 34, 54, 0.8);
    padding: 30px;
    border-radius: 12px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 20px rgba(77, 171, 245, 0.15);
    backdrop-filter: blur(10px);
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .game-info {
    background: rgba(18, 24, 38, 0.5);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .game-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    color: white;
  }
  
  .hardware-info {
    color: #b0b0d0;
    font-size: 14px;
  }
  
  .prediction-text {
    line-height: 1.7;
    margin: 20px 0;
    color: white;
    background: rgba(18, 24, 38, 0.5);
    border-radius: 8px;
    padding: 20px;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .prediction-text p {
    margin-bottom: 10px;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .history-link {
    background: rgba(18, 24, 38, 0.7);
    color: white;
    border: 1px solid rgba(77, 171, 245, 0.3);
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s;
    display: inline-block;
  }
  
  .history-link:hover {
    background: rgba(26, 34, 54, 0.9);
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.3);
  }
  
  .reset-button {
    background: rgba(18, 24, 38, 0.7);
    color: white;
    border: 1px solid rgba(77, 171, 245, 0.3);
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .reset-button:hover {
    background: rgba(26, 34, 54, 0.9);
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.3);
  }
  
  @media (max-width: 768px) {
    .main-container {
      padding: 12px;
    }
    
    .input-container {
      flex-direction: column;
    }
    
    .hero {
      padding: 30px 15px;
      margin-bottom: 20px;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .specs-container, .game-container {
      padding: 15px;
      min-width: 100%;
    }
    
    .predict-button {
      margin-top: 15px;
      padding: 12px;
    }
    
    .results-container {
      padding: 15px;
      margin-top: 20px;
    }
    
    .prediction-text {
      padding: 15px;
      margin: 15px 0;
    }
    
    .actions {
      flex-direction: column;
      gap: 10px;
    }
    
    .history-link, .reset-button {
      width: 100%;
      text-align: center;
    }
    
    .pc-viewer-section {
      margin: 20px 0;
    }
  }
</style>
