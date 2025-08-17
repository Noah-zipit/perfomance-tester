<script>
  export let selectedGame = '';
</script>

<div class="game-selector">
  <label for="gameInput">Game Title</label>
  <input 
    id="gameInput" 
    bind:value={selectedGame} 
    placeholder="Enter game name (e.g. Cyberpunk 2077)"
  >
</div>

<style>
  .game-selector {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid rgba(77, 171, 245, 0.3);
    font-size: 16px;
    background: rgba(26, 34, 54, 0.8);
    color: white;
    box-shadow: 0 0 5px rgba(77, 171, 245, 0.2);
  }
  
  input:focus {
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
</style>