<script>
  // Props
  export let selectedSpecs = {
    cpu: '',
    gpu: '',
    ram: 8,
    storage: 'SSD'
  };
  
  // State
  let activeComponent = 'overview';
  
  // Handle component selection
  function selectComponent(component) {
    activeComponent = component;
  }
</script>

<div class="pc-viewer">
  <div class="pc-image-container">
    <!-- Simulated PC image using CSS background -->
    <div class="pc-image">
      <!-- Clickable areas -->
      <div 
        class="clickable-area cpu-area {activeComponent === 'cpu' ? 'active' : ''}" 
        on:click={() => selectComponent('cpu')}
        aria-label="CPU"
      >
        <div class="component-label">CPU</div>
      </div>
      
      <div 
        class="clickable-area gpu-area {activeComponent === 'gpu' ? 'active' : ''}" 
        on:click={() => selectComponent('gpu')}
        aria-label="GPU"
      >
        <div class="component-label">GPU</div>
      </div>
      
      <div 
        class="clickable-area ram-area {activeComponent === 'ram' ? 'active' : ''}" 
        on:click={() => selectComponent('ram')}
        aria-label="RAM"
      >
        <div class="component-label">RAM</div>
      </div>
      
      <div 
        class="clickable-area storage-area {activeComponent === 'storage' ? 'active' : ''}" 
        on:click={() => selectComponent('storage')}
        aria-label="Storage"
      >
        <div class="component-label">Storage</div>
      </div>
    </div>
  </div>
  
  <div class="component-info-box">
    {#if activeComponent === 'overview'}
      <h3>PC Overview</h3>
      <p>Click on a component to view details about how it affects game performance.</p>
    {:else if activeComponent === 'cpu'}
      <h3>CPU: {selectedSpecs.cpu || 'Not specified'}</h3>
      <p>The CPU (Central Processing Unit) is the brain of your computer and handles game logic, physics calculations, and AI. A more powerful CPU allows for:</p>
      <ul>
        <li>Higher framerates in CPU-intensive games</li>
        <li>Better performance in open-world games</li>
        <li>Smoother gameplay with many objects on screen</li>
      </ul>
    {:else if activeComponent === 'gpu'}
      <h3>GPU: {selectedSpecs.gpu || 'Not specified'}</h3>
      <p>The GPU (Graphics Processing Unit) renders game visuals and is typically the most important component for gaming performance. A stronger GPU enables:</p>
      <ul>
        <li>Higher resolution (1080p, 1440p, 4K)</li>
        <li>Better graphics settings and visual effects</li>
        <li>Higher and more stable framerates</li>
      </ul>
    {:else if activeComponent === 'ram'}
      <h3>RAM: {selectedSpecs.ram}GB</h3>
      <p>RAM (Random Access Memory) provides temporary storage for game data being actively used. More RAM allows:</p>
      <ul>
        <li>Running more applications alongside your game</li>
        <li>Faster loading in open-world games</li>
        <li>Reduced stuttering when moving through game worlds</li>
      </ul>
    {:else if activeComponent === 'storage'}
      <h3>Storage: {selectedSpecs.storage}</h3>
      <p>{selectedSpecs.storage === 'SSD' 
        ? 'SSDs (Solid State Drives) provide much faster load times than traditional HDDs. This means:' 
        : 'HDDs (Hard Disk Drives) offer large storage capacity at lower cost, but with slower speeds:'}</p>
      <ul>
        {#if selectedSpecs.storage === 'SSD'}
          <li>Significantly faster game loading times</li>
          <li>Quicker texture streaming in open worlds</li>
          <li>Reduced hitching when new assets are loaded</li>
        {:else}
          <li>Longer loading screens</li>
          <li>Possible texture pop-in during gameplay</li>
          <li>More affordable storage for large game libraries</li>
        {/if}
      </ul>
    {/if}
  </div>
  
  <div class="component-selector">
    <button 
      class="component-button {activeComponent === 'overview' ? 'active' : ''}" 
      on:click={() => selectComponent('overview')}
    >
      Overview
    </button>
    <button 
      class="component-button {activeComponent === 'cpu' ? 'active' : ''}" 
      on:click={() => selectComponent('cpu')}
    >
      CPU
      {#if selectedSpecs.cpu}
        <span class="spec-info">{selectedSpecs.cpu}</span>
      {/if}
    </button>
    <button 
      class="component-button {activeComponent === 'gpu' ? 'active' : ''}" 
      on:click={() => selectComponent('gpu')}
    >
      GPU
      {#if selectedSpecs.gpu}
        <span class="spec-info">{selectedSpecs.gpu}</span>
      {/if}
    </button>
    <button 
      class="component-button {activeComponent === 'ram' ? 'active' : ''}" 
      on:click={() => selectComponent('ram')}
    >
      RAM
      {#if selectedSpecs.ram}
        <span class="spec-info">{selectedSpecs.ram}GB</span>
      {/if}
    </button>
    <button 
      class="component-button {activeComponent === 'storage' ? 'active' : ''}" 
      on:click={() => selectComponent('storage')}
    >
      Storage
      {#if selectedSpecs.storage}
        <span class="spec-info">{selectedSpecs.storage}</span>
      {/if}
    </button>
  </div>
</div>

<style>
  .pc-viewer {
    background: rgba(18, 24, 38, 0.7);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.2);
  }
  
  .pc-image-container {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, rgba(26, 34, 54, 0.8), rgba(18, 24, 38, 0.8));
    border-radius: 8px;
    border: 1px solid rgba(77, 171, 245, 0.2);
    overflow: hidden;
    position: relative;
  }
  
  .pc-image {
    width: 100%;
    height: 100%;
    position: relative;
    /* Simulated PC case outline with CSS */
    background-image: radial-gradient(
      rgba(77, 171, 245, 0.1) 0%,
      rgba(18, 24, 38, 0) 70%
    );
    background-position: center;
    background-size: 80% 80%;
    box-shadow: inset 0 0 50px rgba(77, 171, 245, 0.2);
  }
  
  .pc-image::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 80%;
    border: 2px solid rgba(77, 171, 245, 0.3);
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.2);
  }
  
  .clickable-area {
    position: absolute;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .clickable-area:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .clickable-area.active {
    border: 2px solid white;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  
  .cpu-area {
    top: 25%;
    left: 25%;
    width: 15%;
    height: 15%;
    background: rgba(77, 171, 245, 0.3);
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.3);
  }
  
  .gpu-area {
    top: 60%;
    left: 20%;
    width: 60%;
    height: 12%;
    background: rgba(140, 90, 233, 0.3);
    box-shadow: 0 0 10px rgba(140, 90, 233, 0.3);
  }
  
  .ram-area {
    top: 25%;
    right: 25%;
    width: 15%;
    height: 30%;
    background: rgba(0, 204, 136, 0.3);
    box-shadow: 0 0 10px rgba(0, 204, 136, 0.3);
  }
  
  .storage-area {
    bottom: 15%;
    right: 15%;
    width: 15%;
    height: 10%;
    background: rgba(255, 85, 85, 0.3);
    box-shadow: 0 0 10px rgba(255, 85, 85, 0.3);
  }
  
  .component-label {
    color: white;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }
  
  .component-info-box {
    margin: 20px 0;
    padding: 20px;
    background: rgba(26, 34, 54, 0.8);
    border-radius: 8px;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .component-info-box h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: white;
    font-size: 1.2rem;
    border-bottom: 1px solid rgba(77, 171, 245, 0.3);
    padding-bottom: 10px;
  }
  
  .component-info-box p {
    color: white;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .component-info-box ul {
    color: #b0b0d0;
    padding-left: 20px;
  }
  
  .component-info-box li {
    margin-bottom: 8px;
  }
  
  .component-selector {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    padding: 10px;
    background: rgba(18, 24, 38, 0.5);
    border-radius: 8px;
    border: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .component-button {
    background: rgba(26, 34, 54, 0.8);
    color: white;
    border: 1px solid rgba(77, 171, 245, 0.2);
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 90px;
  }
  
  .component-button:hover {
    border-color: rgba(77, 171, 245, 0.5);
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.3);
  }
  
  .component-button.active {
    background: linear-gradient(45deg, rgba(77, 171, 245, 0.3), rgba(140, 90, 233, 0.3));
    border-color: rgba(77, 171, 245, 0.8);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.4);
  }
  
  .spec-info {
    font-size: 10px;
    margin-top: 5px;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    .pc-image-container {
      height: 250px;
    }
    
    .component-selector {
      overflow-x: auto;
      justify-content: flex-start;
      padding: 10px 5px;
    }
    
    .component-button {
      flex: 0 0 auto;
    }
  }
</style>