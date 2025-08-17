<script>
  export let prediction = '';
  export let game = '';
  export let specs = {};
  
  function extractFpsInfo(text) {
    const lowMatch = text.match(/low.*?(\d+).*?fps/i);
    const medMatch = text.match(/medium.*?(\d+).*?fps/i);
    const highMatch = text.match(/high.*?(\d+).*?fps/i);
    
    return {
      low: lowMatch ? parseInt(lowMatch[1]) : null,
      medium: medMatch ? parseInt(medMatch[1]) : null,
      high: highMatch ? parseInt(highMatch[1]) : null
    };
  }
  
  $: fpsData = extractFpsInfo(prediction);
  $: canRun = prediction.toLowerCase().includes('can run') || 
              !prediction.toLowerCase().includes('cannot run');
</script>

<div class="prediction-card">
  <div class="card-header" class:can-run={canRun} class:cannot-run={!canRun}>
    <h2>{canRun ? 'Your PC can run this game' : 'Your PC may struggle with this game'}</h2>
  </div>
  
  <div class="game-specs">
    <div class="game-name">
      <strong>Game:</strong> {game}
    </div>
    <div class="pc-specs">
      <strong>System:</strong> {specs.cpu} / {specs.gpu} / {specs.ram}GB RAM / {specs.storage}
    </div>
  </div>
  
  {#if fpsData.low !== null || fpsData.medium !== null || fpsData.high !== null}
    <div class="fps-graph">
      <div class="fps-bars">
        {#if fpsData.low !== null}
          <div class="fps-bar">
            <div class="bar-fill" style="height: {Math.min(fpsData.low, 100)}%"></div>
            <div class="bar-value">{fpsData.low} FPS</div>
            <div class="bar-label">Low</div>
          </div>
        {/if}
        
        {#if fpsData.medium !== null}
          <div class="fps-bar">
            <div class="bar-fill" style="height: {Math.min(fpsData.medium, 100)}%"></div>
            <div class="bar-value">{fpsData.medium} FPS</div>
            <div class="bar-label">Medium</div>
          </div>
        {/if}
        
        {#if fpsData.high !== null}
          <div class="fps-bar">
            <div class="bar-fill" style="height: {Math.min(fpsData.high, 100)}%"></div>
            <div class="bar-value">{fpsData.high} FPS</div>
            <div class="bar-label">High</div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
  
  <div class="prediction-text">
    {#each prediction.split('\n') as line}
      <p>{line}</p>
    {/each}
  </div>
</div>

<style>
  .prediction-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    padding: 15px 20px;
    color: white;
    text-align: center;
  }
  
  .can-run {
    background: linear-gradient(90deg, #2ecc71, #27ae60);
  }
  
  .cannot-run {
    background: linear-gradient(90deg, #e74c3c, #c0392b);
  }
  
  .game-specs {
    background: #f5f7fa;
    padding: 15px 20px;
    font-size: 15px;
  }
  
  .game-name, .pc-specs {
    margin-bottom: 5px;
  }
  
  .fps-graph {
    padding: 20px;
    background: #fcfcfc;
  }
  
  .fps-bars {
    display: flex;
    justify-content: space-around;
    height: 150px;
    align-items: flex-end;
  }
  
  .fps-bar {
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  
  .bar-fill {
    width: 60%;
    background: linear-gradient(to top, #4a7dff, #5f3dc4);
    border-radius: 3px 3px 0 0;
  }
  
  .bar-value {
    margin-top: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .bar-label {
    margin-top: 5px;
    color: #666;
  }
  
  .prediction-text {
    padding: 20px;
    line-height: 1.6;
  }
  
  .prediction-text p {
    margin-bottom: 10px;
  }
</style>