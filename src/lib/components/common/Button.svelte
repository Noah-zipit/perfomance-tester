<script>
  export let type = 'button';
  export let variant = 'primary'; // primary, secondary, outline
  export let disabled = false;
  export let fullWidth = false;
  export let size = 'medium'; // small, medium, large
</script>

<button 
  {type} 
  class={`btn btn-${variant} btn-${size} ${fullWidth ? 'full-width' : ''}`} 
  {disabled} 
  on:click
>
  <slot></slot>
</button>

<style>
  .btn {
    font-family: inherit;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-primary {
    background-color: #4a7dff;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #3a6df0;
  }
  
  .btn-secondary {
    background-color: #333;
    color: white;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background-color: #444;
  }
  
  .btn-outline {
    background-color: transparent;
    border: 1px solid #4a7dff;
    color: #4a7dff;
  }
  
  .btn-outline:hover:not(:disabled) {
    background-color: #f0f5ff;
  }
  
  .btn-small {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .btn-medium {
    padding: 10px 16px;
    font-size: 16px;
  }
  
  .btn-large {
    padding: 14px 20px;
    font-size: 18px;
  }
  
  .full-width {
    width: 100%;
  }
</style>