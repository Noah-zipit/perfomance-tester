<!-- src/routes/about/+page.svelte -->
<script>
  // Nothing to import for now
</script>

<svelte:head>
  <title>About - Game Performance Predictor</title>
</svelte:head>

<div class="about-page">
  <div class="hero">
    <div class="container">
      <h1>About Game Performance Predictor</h1>
      <p class="lead">Helping gamers make informed decisions about game performance on their systems</p>
    </div>
  </div>
  
  <div class="container">
    <section class="about-section">
      <h2>What We Do</h2>
      <p>
        Game Performance Predictor uses advanced AI to analyze your computer's hardware specifications
        and provide accurate predictions about how well specific games will run on your system.
        Our service saves you time and helps you avoid purchasing games that won't run well on your PC.
      </p>
    </section>
    
    <section class="about-section">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Enter Your Specs</h3>
          <p>Provide details about your CPU, GPU, RAM, and storage type.</p>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <h3>Select a Game</h3>
          <p>Tell us which game you're interested in playing.</p>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <h3>Get Prediction</h3>
          <p>Our AI analyzes your hardware against the game's requirements to predict performance.</p>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <h3>Make Informed Decisions</h3>
          <p>Use our FPS predictions and recommendations to optimize your gaming experience.</p>
        </div>
      </div>
    </section>
    
    <section class="about-section">
      <h2>Technology</h2>
      <p>
        Game Performance Predictor is built using modern web technologies including Svelte for the
        frontend and AI-powered analysis through our prediction API. The system considers a wide range
        of factors including game engine requirements, hardware benchmarks, and real-world performance data.
      </p>
    </section>
  </div>
</div>

<style>
  .about-page {
    padding-bottom: 40px;
  }
  
  .hero {
    background: linear-gradient(135deg, #4a7dff, #5f3dc4);
    color: white;
    padding: 60px 0;
    margin-bottom: 40px;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .lead {
    font-size: 1.2rem;
    margin-top: 10px;
  }
  
  .about-section {
    margin-bottom: 40px;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
    position: relative;
    padding-bottom: 10px;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: #4a7dff;
  }
  
  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }
  
  .step {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    position: relative;
  }
  
  .step-number {
    position: absolute;
    top: -15px;
    left: 20px;
    width: 30px;
    height: 30px;
    background: #4a7dff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #444;
  }
</style>