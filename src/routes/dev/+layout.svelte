<!-- src/routes/dev/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  
  const navItems = [
    { path: '/dev', label: 'Overview' },
    { path: '/dev/api-tester', label: 'API Tester' },
    { path: '/dev/documentation', label: 'Documentation' },
    { path: '/dev/settings', label: 'Settings' }
  ];
</script>

<div class="dev-layout">
  <header class="dev-header">
    <div class="header-content">
      <h1>Developer Dashboard</h1>
      <a href="/" class="back-link">← Back to App</a>
    </div>
  </header>
  
  <div class="dev-container">
    <aside class="dev-sidebar">
      <nav>
        <ul>
          {#each navItems as item}
            <li class:active={$page.url.pathname === item.path}>
              <a href={item.path}>{item.label}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>
    
    <main class="dev-content">
      <slot></slot>
    </main>
  </div>
</div>

<style>
  .dev-layout {
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  
  .dev-header {
    background-color: #2c3e50;
    color: white;
    padding: 15px 20px;
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .back-link {
    color: #ecf0f1;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.2s;
  }
  
  .back-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .dev-container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    gap: 20px;
  }
  
  .dev-sidebar {
    width: 220px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    flex-shrink: 0;
  }
  
  .dev-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .dev-sidebar li {
    margin-bottom: 5px;
  }
  
  .dev-sidebar a {
    display: block;
    padding: 10px;
    border-radius: 4px;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .dev-sidebar li.active a {
    background-color: #4a7dff;
    color: white;
    font-weight: 500;
  }
  
  .dev-sidebar a:hover:not(:where(.active a)) {
    background-color: #f0f0f0;
  }
  
  .dev-content {
    flex: 1;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    .dev-container {
      flex-direction: column;
    }
    
    .dev-sidebar {
      width: 100%;
    }
  }
</style>