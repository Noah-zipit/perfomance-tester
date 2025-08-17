// src/lib/utils/storage.js
const HISTORY_KEY = 'predictionHistory';
const SETTINGS_KEY = 'appSettings';

/**
 * Save a prediction result to local storage
 */
export function saveResult(specs, game, result) {
  try {
    const history = getHistory();
    
    history.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      specs: { ...specs },
      game,
      result
    });
    
    // Limit history to 20 items
    if (history.length > 20) {
      history.pop();
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
}

/**
 * Get prediction history from local storage
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from storage:', error);
    return [];
  }
}

/**
 * Clear all prediction history
 */
export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

/**
 * Get a specific prediction by ID
 */
export function getPrediction(id) {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
}

/**
 * Save application settings
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

/**
 * Get application settings
 */
export function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : {
      apiEndpoint: 'https://ab-chatgpt4o.abrahamdw882.workers.dev/',
      theme: 'light',
      detailedMode: false
    };
  } catch (error) {
    console.error('Error reading settings:', error);
    return {
      apiEndpoint: 'https://ab-chatgpt4o.abrahamdw882.workers.dev/',
      theme: 'light',
      detailedMode: false
    };
  }
}