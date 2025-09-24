// Configuration simplifiée pour éviter les problèmes d'import - Final deployment fix
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
export const PRODUCTION_API_URL = process.env.REACT_APP_API_URL || 'https://nice-sammy-sarasabor-6a46d8d9.koyeb.app';
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'development';

export const ENDPOINTS = {
  BOOKS: '/books',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile'
  },
  CONTACT: '/api/contact'
};

export const REQUEST_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Fonction pour obtenir l'URL de base selon l'environnement
export const getBaseURL = () => {
  return ENVIRONMENT === 'production' 
    ? PRODUCTION_API_URL 
    : API_BASE_URL;
};

// Fonction pour construire les URLs complètes
export const buildApiUrl = (endpoint) => {
  return `${getBaseURL()}${endpoint}`;
};

// Configuration complète pour compatibilité
const config = {
  API_BASE_URL,
  PRODUCTION_API_URL,
  FRONTEND_URL,
  ENVIRONMENT,
  ENDPOINTS,
  REQUEST_CONFIG
};

export { config };
export default config;