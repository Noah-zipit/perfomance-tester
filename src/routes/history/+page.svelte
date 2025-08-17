<!-- src/routes/history/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getHistory, clearHistory } from '$lib/utils/storage.js';
  import { formatDate, formatSpecs, extractSummary } from '$lib/utils/formatter.js';
  
  let predictions = [];
  let isConfirmingDelete = false;
  
  onMount(() => {
    predictions = getHistory();
  });
  
  function confirmClearHistory() {
    isConfirmingDelete = true;
  }
  
  function cancelClearHistory() {
    isConfirmingDelete = false;
  }
  
  function handleClearHistory() {
    clearHistory();
    predictions = [];
    isConfirmingDelete = false;
  }
</script>

<svelte:head>
  <title>History - Game Performance Predictor</title>
</svelte:head>

<div class="history-page">
  <div class="container">
    <h1>Prediction History</h1>
    <p class="subtitle">View your past game performance predictions</p>
    
    {#if predictions.length === 0}
      <div class="empty-state">
        <p>You haven't made any predictions yet.</p>
        <a href="/" class="button">Make a Prediction</a>
      </div>
    {:else}
      <div class="actions">
        <button class="clear-button" on:click={confirmClearHistory}>
          Clear History
        </button>
      </div>
      
      <div class="predictions-list">
        {#each predictions as prediction (prediction.id)}
          <div class="prediction-item">
            <div class="prediction-header">
              <div class="game-title">{prediction.game}</div>
              <div class="prediction-date">{formatDate(prediction.timestamp)}</div>
            </div>
            
            <div class="prediction-specs">
              {formatSpecs(prediction.specs)}
            </div>
            
            <div class="prediction-summary">
              {extractSummary(prediction.result, 150)}
            </div>
            
            <div class="prediction-actions">
              <a href="/?id={prediction.id}" class="view-button">View Details</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
    
    {#if isConfirmingDelete}
      <div class="confirm-dialog">
        <div class="confirm-content">
          <h2>Clear All History?</h2>
          <p>This action cannot be undone. All prediction history will be permanently deleted.</p>
          
          <div class="confirm-actions">
            <button class="cancel-button" on:click={cancelClearHistory}>Cancel</button>
            <button class="delete-button" on:click={handleClearHistory}>Clear History</button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .history-page {
    padding: 40px 0;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  h1 {
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 30px;
  }
  
  .empty-state {
    text-align: center;
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .button {
    display: inline-block;
    margin-top: 20px;
    background: #4a7dff;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  
  .clear-button {
    background: transparent;
    color: #e74c3c;
    border: 1px solid #e74c3c;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .clear-button:hover {
    background: #e74c3c;
    color: white;
  }
  
  .predictions-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .prediction-item {
    background: white;
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  .prediction-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .game-title {
    font-weight: 600;
    font-size: 18px;
  }
  
  .prediction-date {
    color: #666;
    font-size: 14px;
  }
  
  .prediction-specs {
    font-size: 14px;
    color: #555;
    background: #f5f7fa;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .prediction-summary {
    color: #333;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .prediction-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .view-button {
    background: #f0f0f0;
    color: #333;
    text-decoration: none;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .view-button:hover {
    background: #e0e0e0;
  }
  
  .confirm-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .confirm-content {
    background: white;
    border-radius: 8px;
    padding: 25px;
    max-width: 400px;
    width: 100%;
  }
  
  .confirm-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: flex-end;
  }
  
  .cancel-button, .delete-button {
    padding: 10px 15px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    border: none;
  }
  
  .cancel-button {
    background: #f0f0f0;
    color: #333;
  }
  
  .delete-button {
    background: #e74c3c;
    color: white;
  }
</style>