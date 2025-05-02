const config = {
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'FURIA Chat Experience',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0'
  }
}; 
export default config;