<script>
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="site-header">
  <div class="container">
    <div class="logo">
      <a href="/">
        <span class="logo-text">GamePerf</span>
      </a>
    </div>
    
    <button class="mobile-menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    
    <nav class="main-nav" class:active={isMenuOpen}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/dev" class="dev-link">Developer</a></li>
      </ul>
    </nav>
  </div>
</header>

<style>
  .site-header {
    background-color: rgba(18, 24, 38, 0.95);
    box-shadow: 0 0 15px rgba(77, 171, 245, 0.3);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(77, 171, 245, 0.2);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo a {
    text-decoration: none;
    font-weight: 700;
    font-size: 24px;
  }
  
  .logo-text {
    background: linear-gradient(90deg, #4dabf5, #8c5ae9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba(77, 171, 245, 0.5);
  }
  
  .main-nav ul {
    list-style: none;
    display: flex;
    gap: 25px;
    margin: 0;
    padding: 0;
  }
  
  .main-nav a {
    text-decoration: none;
    color: white;
    font-weight: 500;
    padding: 5px 0;
    position: relative;
    transition: color 0.3s;
  }
  
  .main-nav a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #4dabf5, #8c5ae9);
    transition: width 0.3s;
    box-shadow: 0 0 8px rgba(77, 171, 245, 0.8);
  }
  
  .main-nav a:hover {
    color: #ffffff;
  }
  
  .main-nav a:hover::after {
    width: 100%;
  }
  
  .dev-link {
    color: #8c5ae9 !important;
  }
  
  .mobile-menu-toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    flex-direction: column;
    gap: 5px;
  }
  
  .bar {
    display: block;
    width: 25px;
    height: 3px;
    background: white;
    transition: 0.3s;
  }
  
  @media (max-width: 768px) {
    .mobile-menu-toggle {
      display: flex;
    }
    
    .main-nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(18, 24, 38, 0.95);
      box-shadow: 0 5px 15px rgba(77, 171, 245, 0.2);
      padding: 20px;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }
    
    .main-nav.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .main-nav ul {
      flex-direction: column;
      gap: 15px;
    }
  }
</style>