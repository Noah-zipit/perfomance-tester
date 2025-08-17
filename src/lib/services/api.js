// src/lib/services/api.js
const API_URL = "https://ab-chatgpt4o.abrahamdw882.workers.dev/";

export async function predictGamePerformance(specs, game) {
  try {
    // Construct a natural language query with the specs and game
    const query = `Can a PC with these specifications run ${game}? And at what FPS? 
    CPU: ${specs.cpu}
    GPU: ${specs.gpu}
    RAM: ${specs.ram}GB
    Storage: ${specs.storage}
    Please provide expected FPS at low, medium, and high settings and any recommendations.`;
    
    // Encode the query for URL
    const encodedQuery = encodeURIComponent(query);
    
    // Make the request
    const response = await fetch(`${API_URL}?q=${encodedQuery}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Try to parse as JSON first
    try {
      const jsonResponse = await response.json();
      
      // Extract just the data field containing the prediction text
      if (jsonResponse.status === "success" && jsonResponse.data) {
        return jsonResponse.data;
      } else if (typeof jsonResponse === 'string') {
        // Sometimes the API might return a JSON-encoded string
        return jsonResponse;
      } else if (jsonResponse.text || jsonResponse.content || jsonResponse.message) {
        // Check for other common JSON response formats
        return jsonResponse.text || jsonResponse.content || jsonResponse.message;
      } else {
        // If we can't find a specific text field, stringify the whole response
        return JSON.stringify(jsonResponse);
      }
    } catch (jsonError) {
      // If JSON parsing fails, treat it as plain text
      console.warn('Failed to parse JSON, treating as text:', jsonError);
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export function saveResult(specs, game, result) {
  try {
    const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    history.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      specs,
      game,
      result
    });
    
    // Limit history to 20 items
    if (history.length > 20) {
      history.pop();
    }
    
    localStorage.setItem('predictionHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save result:', error);
  }
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('predictionHistory') || '[]');
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem('predictionHistory');
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
}

export function getPrediction(id) {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
}