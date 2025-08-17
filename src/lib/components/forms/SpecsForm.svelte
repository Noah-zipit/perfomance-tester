<script>
  export let specs = {
    cpu: '',
    gpu: '',
    ram: 8,
    storage: 'SSD'
  };
</script>

<div class="specs-form">
  <div class="form-group">
    <label for="cpu">CPU Model</label>
    <input id="cpu" bind:value={specs.cpu} placeholder="e.g. Intel i7-10700K">
  </div>
  
  <div class="form-group">
    <label for="gpu">GPU Model</label>
    <input id="gpu" bind:value={specs.gpu} placeholder="e.g. NVIDIA RTX 3070">
  </div>
  
  <div class="form-group">
    <label for="ram">RAM (GB)</label>
    <input id="ram" type="number" bind:value={specs.ram} min="1" max="128">
  </div>
  
  <div class="form-group">
    <label for="storage">Storage Type</label>
    <select id="storage" bind:value={specs.storage}>
      <option value="SSD">SSD</option>
      <option value="HDD">HDD</option>
    </select>
  </div>
</div>

<style>
  .specs-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  input, select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    font-size: 16px;
    background: rgba(26, 34, 54, 0.8);
    color: white;
    box-shadow: 0 0 5px rgba(77, 171, 245, 0.2);
  }
  
  input:focus, select:focus {
    border-color: #4dabf5;
    box-shadow: 0 0 10px rgba(77, 171, 245, 0.4);
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  label {
    font-weight: 500;
    color: white;
  }
  
  /* Style for select dropdown options */
  select option {
    background-color: #1a2236;
    color: white;
  }
</style>