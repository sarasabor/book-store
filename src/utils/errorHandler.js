import React from 'react';
import { toast } from 'react-hot-toast';

// Composant pour afficher les erreurs de manière centralisée
export const ErrorDisplay = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Une erreur s'est produite
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                onClick={onRetry}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook pour la gestion des erreurs
export const useErrorHandler = () => {
  const showError = (error, customMessage = null) => {
    const message = customMessage || 
      error?.response?.data?.message || 
      error?.message || 
      'Une erreur inattendue s\'est produite';
    
    toast.error(message);
    console.error('Error:', error);
  };

  const showSuccess = (message) => {
    toast.success(message);
  };

  const showInfo = (message) => {
    toast(message, {
      icon: 'ℹ️',
    });
  };

  return { showError, showSuccess, showInfo };
};

// Fonction utilitaire pour gérer les erreurs d'API
export const handleApiError = (error) => {
  if (error.response) {
    // Erreur de réponse du serveur
    const status = error.response.status;
    const message = error.response.data?.message || 'Erreur du serveur';
    
    switch (status) {
      case 401:
        return 'Non autorisé. Veuillez vous reconnecter.';
      case 403:
        return 'Accès refusé.';
      case 404:
        return 'Ressource non trouvée.';
      case 500:
        return 'Erreur interne du serveur.';
      default:
        return message;
    }
  } else if (error.request) {
    // Erreur de réseau
    return 'Problème de connexion. Vérifiez votre connexion internet.';
  } else {
    // Autre erreur
    return error.message || 'Une erreur inattendue s\'est produite.';
  }
};

export default ErrorDisplay;
