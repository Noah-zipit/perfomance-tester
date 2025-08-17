<script>
  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Game Performance Predictor</h3>
        <p>Check if your PC can run the latest games and predict performance with AI-powered analysis.</p>
      </div>
      
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/history">History</a></li>
          <li><a href="/dev">Developer</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© {currentYear} Game Performance Predictor. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 40px 0 20px;
    margin-top: 60px;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-bottom: 30px;
  }
  
  .footer-section {
    flex: 1;
    min-width: 200px;
  }
  
  .footer-section h3 {
    margin-bottom: 15px;
    font-size: 18px;
  }
  
  .footer-section ul {
    list-style: none;
  }
  
  .footer-section li {
    margin-bottom: 8px;
  }
  
  .footer-section a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .footer-section a:hover {
    color: white;
  }
  
  .footer-bottom {
    border-top: 1px solid #34495e;
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #95a5a6;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 20px;
    }
  }
</style>