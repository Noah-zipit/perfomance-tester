// src/routes/api/predict/+server.js
import { predictGamePerformance } from '$lib/services/api.js';

export async function POST({ request }) {
  try {
    const { specs, game } = await request.json();
    
    if (!specs || !game) {
      return new Response('Missing specs or game information', { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
    
    const prediction = await predictGamePerformance(specs, game);
    
    // If prediction is an object, stringify it
    const responseText = typeof prediction === 'object' 
      ? JSON.stringify(prediction) 
      : prediction;
    
    return new Response(responseText, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Error in predict endpoint:', error);
    
    return new Response(`Error: ${error.message}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}