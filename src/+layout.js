// src/routes/+layout.js
// This file controls SSR and prerendering options for all routes

/**
 * Enable prerendering for static site generation
 * This will prerender all routes at build time
 */
export const prerender = true;

/**
 * Disable server-side rendering
 * The app will run entirely on the client
 */
export const ssr = false;

/**
 * Optional: Define a load function to provide data to all pages
 * This runs before the page loads
 */
export function load() {
  return {
    // You can return data that will be available to all pages
    appName: 'Game Performance Predictor',
    version: '0.1.0'
  };
}