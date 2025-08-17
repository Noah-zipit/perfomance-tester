import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: vercel()
    // Remove the runtime configuration entirely
    // Let Vercel choose the appropriate Node.js version
  }
};

export default config;
