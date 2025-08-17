// src/lib/utils/formatter.js
/**
 * Format a date string into a more readable format
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString(undefined, options);
}

/**
 * Format hardware specs into a readable string
 */
export function formatSpecs(specs) {
  if (!specs) return 'No specs available';
  
  const parts = [];
  
  if (specs.cpu) parts.push(specs.cpu);
  if (specs.gpu) parts.push(specs.gpu);
  if (specs.ram) parts.push(`${specs.ram}GB RAM`);
  if (specs.storage) parts.push(specs.storage);
  
  return parts.join(' / ');
}

/**
 * Extract a summary from prediction text
 */
export function extractSummary(text, maxLength = 100) {
  if (!text) return '';
  
  // Try to find a sentence that contains "run" or "fps"
  const sentences = text.split(/\.\s+/);
  const relevantSentence = sentences.find(s => 
    s.toLowerCase().includes('run') || 
    s.toLowerCase().includes('fps')
  );
  
  if (relevantSentence) {
    return relevantSentence.length > maxLength 
      ? relevantSentence.substring(0, maxLength) + '...'
      : relevantSentence;
  }
  
  // Fallback to first sentence or substring
  return text.length > maxLength 
    ? text.substring(0, maxLength) + '...'
    : text;
}