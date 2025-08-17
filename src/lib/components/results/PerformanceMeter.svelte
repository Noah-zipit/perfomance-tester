<script>
  // Props to receive from parent
  export let predictionText = "";
  
  // Default values
  let lowFps = 0;
  let mediumFps = 0;
  let highFps = 0;
  let performanceLevel = "unknown"; // "low", "medium", "high", "unknown"
  
  // Process the prediction text to extract FPS values
  $: {
    // Reset values
    lowFps = 0;
    mediumFps = 0;
    highFps = 0;
    performanceLevel = "unknown";
    
    // Extract FPS data using regex
    const lowMatch = predictionText.match(/low.*?(\d+).*?fps/i);
    const mediumMatch = predictionText.match(/medium.*?(\d+).*?fps/i);
    const highMatch = predictionText.match(/high.*?(\d+).*?fps/i);
    
    // Set values if found
    if (lowMatch) lowFps = parseInt(lowMatch[1]);
    if (mediumMatch) mediumFps = parseInt(mediumMatch[1]);
    if (highMatch) highFps = parseInt(highMatch[1]);
    
    // Determine overall performance level
    if (highFps >= 60) {
      performanceLevel = "high";
    } else if (mediumFps >= 30) {
      performanceLevel = "medium";
    } else if (lowFps > 0) {
      performanceLevel = "low";
    }
  }
  
  // Calculate performance percentage for meter fill
  $: performancePercentage = calculatePerformancePercentage();
  
  function calculatePerformancePercentage() {
    // Use medium FPS as the main indicator
    if (mediumFps <= 0) return 0;
    
    // Scale based on common FPS thresholds
    if (mediumFps <= 30) return Math.min(30, mediumFps);
    if (mediumFps <= 60) return 30 + ((mediumFps - 30) / 30) * 30;
    if (mediumFps <= 120) return 60 + ((mediumFps - 60) / 60) * 30;
    return 90 + ((mediumFps - 120) / 120) * 10; // Max 100%
  }
  
  // Function to get the right color based on FPS
  function getFpsColor(fps) {
    if (fps >= 60) return "var(--high-fps-color)";
    if (fps >= 30) return "var(--medium-fps-color)";
    if (fps > 0) return "var(--low-fps-color)";
    return "var(--unknown-fps-color)";
  }
</script>

<div class="performance-meter">
  <h3>Performance Analysis</h3>
  
  <div class="meter-container">
    <div class="meter-labels">
      <span>Unplayable</span>
      <span>Playable</span>
      <span>Smooth</span>
      <span>Excellent</span>
    </div>
    
    <div class="meter-bar">
      <div 
        class="meter-fill" 
        style="width: {performancePercentage}%; background: {getFpsColor(mediumFps)}"
      ></div>
      
      <div class="meter-markers">
        <div class="meter-marker" style="left: 30%">
          <div class="marker-line"></div>
          <div class="marker-label">30 FPS</div>
        </div>
        <div class="meter-marker" style="left: 60%">
          <div class="marker-line"></div>
          <div class="marker-label">60 FPS</div>
        </div>
        <div class="meter-marker" style="left: 90%">
          <div class="marker-line"></div>
          <div class="marker-label">120+ FPS</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="settings-fps">
    <div class="setting {lowFps > 0 ? 'has-data' : ''}">
      <div class="setting-name">Low:</div>
      <div class="setting-fps" style="color: {getFpsColor(lowFps)}">
        {lowFps > 0 ? `${lowFps} FPS` : 'No data'}
      </div>
    </div>
    
    <div class="setting {mediumFps > 0 ? 'has-data' : ''}">
      <div class="setting-name">Medium:</div>
      <div class="setting-fps" style="color: {getFpsColor(mediumFps)}">
        {mediumFps > 0 ? `${mediumFps} FPS` : 'No data'}
      </div>
    </div>
    
    <div class="setting {highFps > 0 ? 'has-data' : ''}">
      <div class="setting-name">High:</div>
      <div class="setting-fps" style="color: {getFpsColor(highFps)}">
        {highFps > 0 ? `${highFps} FPS` : 'No data'}
      </div>
    </div>
  </div>
  
  <div class="performance-summary">
    {#if performanceLevel === "high"}
      <div class="summary-icon high">✓</div>
      <div class="summary-text">This game should run excellently on your system.</div>
    {:else if performanceLevel === "medium"}
      <div class="summary-icon medium">✓</div>
      <div class="summary-text">This game should run well on medium settings.</div>
    {:else if performanceLevel === "low"}
      <div class="summary-icon low">⚠</div>
      <div class="summary-text">This game may run, but expect low performance.</div>
    {:else}
      <div class="summary-icon unknown">?</div>
      <div class="summary-text">Unable to determine performance.</div>
    {/if}
  </div>
</div>

<style>
  /* Custom properties for colors */
  :global(:root) {
    --high-fps-color: #4caf50;
    --medium-fps-color: #ff9800;
    --low-fps-color: #f44336;
    --unknown-fps-color: #9e9e9e;
  }
  
  .performance-meter {
    background: rgba(18, 24, 38, 0.7);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 25px;
    border: 1px solid rgba(77, 171, 245, 0.2);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.1);
  }
  
  h3 {
    color: white;
    margin-bottom: 15px;
    font-size: 1.2rem;
    text-align: center;
  }
  
  .meter-container {
    margin-bottom: 20px;
  }
  
  .meter-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    color: #b0b0d0;
    font-size: 12px;
  }
  
  .meter-bar {
    height: 20px;
    background: rgba(30, 40, 60, 0.5);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(77, 171, 245, 0.3);
    margin-bottom: 15px;
  }
  
  .meter-fill {
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(90deg, var(--low-fps-color), var(--medium-fps-color), var(--high-fps-color));
    transition: width 1s ease-out;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
  
  .meter-markers {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    pointer-events: none;
  }
  
  .meter-marker {
    position: absolute;
    top: 0;
    bottom: 0;
  }
  
  .marker-line {
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 0;
  }
  
  .marker-label {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #b0b0d0;
    font-size: 12px;
    margin-top: 5px;
  }
  
  .settings-fps {
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    margin-bottom: 20px;
  }
  
  .setting {
    text-align: center;
    padding: 10px 15px;
    background: rgba(30, 40, 60, 0.3);
    border-radius: 8px;
    min-width: 100px;
    border: 1px solid rgba(77, 171, 245, 0.1);
  }
  
  .setting.has-data {
    border-color: rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.1);
  }
  
  .setting-name {
    color: #b0b0d0;
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  .setting-fps {
    font-size: 18px;
    font-weight: bold;
  }
  
  .performance-summary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    gap: 15px;
    padding: 15px;
    background: rgba(30, 40, 60, 0.3);
    border-radius: 8px;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .summary-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
  }
  
  .summary-icon.high {
    background-color: rgba(76, 175, 80, 0.2);
    color: var(--high-fps-color);
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
    border: 1px solid rgba(76, 175, 80, 0.3);
  }
  
  .summary-icon.medium {
    background-color: rgba(255, 152, 0, 0.2);
    color: var(--medium-fps-color);
    box-shadow: 0 0 10px rgba(255, 152, 0, 0.3);
    border: 1px solid rgba(255, 152, 0, 0.3);
  }
  
  .summary-icon.low {
    background-color: rgba(244, 67, 54, 0.2);
    color: var(--low-fps-color);
    box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
    border: 1px solid rgba(244, 67, 54, 0.3);
  }
  
  .summary-icon.unknown {
    background-color: rgba(158, 158, 158, 0.2);
    color: var(--unknown-fps-color);
    box-shadow: 0 0 10px rgba(158, 158, 158, 0.3);
    border: 1px solid rgba(158, 158, 158, 0.3);
  }
  
  .summary-text {
    color: white;
    font-size: 16px;
  }
  
  /* Animation for the meter fill */
  @keyframes fillAnimation {
    from { width: 0; }
    to { width: var(--fill-width); }
  }
  
  /* Make responsive */
  @media (max-width: 768px) {
    .settings-fps {
      flex-direction: column;
      gap: 10px;
    }
    
    .setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: auto;
      width: 100%;
    }
    
    .performance-summary {
      flex-direction: column;
      text-align: center;
    }
  }
</style>