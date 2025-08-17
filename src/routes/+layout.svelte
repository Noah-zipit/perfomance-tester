<script>
  import '../app.css';
  import Header from '$lib/components/common/Header.svelte';
  import Footer from '$lib/components/common/Footer.svelte';
</script>

<div class="app">
  <Header />
  
  <div class="content">
    <slot></slot>
  </div>
  
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
    flex: 1;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
  }
</style>