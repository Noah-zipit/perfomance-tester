// src/lib/utils/hardware-detection.js
/**
 * Attempts to detect hardware information from the browser
 * Note: This is limited by browser capabilities and security restrictions
 */
export function detectHardware() {
  const hardware = {
    cpu: null,
    gpu: null,
    ram: null,
    browser: null
  };
  
  // Detect browser
  hardware.browser = detectBrowser();
  
  // Try to get GPU info
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      hardware.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
  }
  
  // Try to get memory info (only works in Chrome)
  if (navigator.deviceMemory) {
    hardware.ram = navigator.deviceMemory;
  }
  
  // CPU info is not directly accessible
  hardware.cpu = navigator.hardwareConcurrency ? 
    `${navigator.hardwareConcurrency} cores` : null;
  
  return hardware;
}

function detectBrowser() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  
  if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari';
  } else if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
    browser = 'Internet Explorer';
  } else if (ua.indexOf('Edge') > -1) {
    browser = 'Edge';
  }
  
  return browser;
}