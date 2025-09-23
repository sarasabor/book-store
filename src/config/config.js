// Configuration centralisée pour les URLs et constantes
const config = {
  // URLs de l'API
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  
  // URLs de production (à utiliser en déploiement)
  PRODUCTION_API_URL: 'https://book-store-api-9hck.onrender.com',
  
  // URLs du frontend
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
  
  // Environnement
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  
  // Endpoints API
  ENDPOINTS: {
    BOOKS: '/books',
    AUTH: {
      LOGIN: '/login',
      REGISTER: '/register',
      PROFILE: '/profile'
    },
    CONTACT: '/api/contact'
  },
  
  // Configuration des requêtes
  REQUEST_CONFIG: {
    TIMEOUT: 10000, // 10 secondes
    RETRY_ATTEMPTS: 3
  }
};

// Fonction pour obtenir l'URL de base selon l'environnement
export const getBaseURL = () => {
  return config.ENVIRONMENT === 'production' 
    ? config.PRODUCTION_API_URL 
    : config.API_BASE_URL;
};

// Fonction pour construire les URLs complètes
export const buildApiUrl = (endpoint) => {
  return `${getBaseURL()}${endpoint}`;
};

export default config;
