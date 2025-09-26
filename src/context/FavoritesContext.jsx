import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem('bookstore-favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('bookstore-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites(prev => {
      // Vérifier si le livre n'est pas déjà dans les favoris
      const isAlreadyFavorite = prev.some(fav => fav._id === book._id);
      if (isAlreadyFavorite) {
        return prev; // Ne pas ajouter de doublon
      }
      return [...prev, book];
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(prev => prev.filter(book => book._id !== bookId));
  };

  const toggleFavorite = (book) => {
    const isFavorite = favorites.some(fav => fav._id === book._id);
    if (isFavorite) {
      removeFromFavorites(book._id);
    } else {
      addToFavorites(book);
    }
  };

  const isFavorite = (bookId) => {
    return favorites.some(fav => fav._id === bookId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    getFavoritesCount
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
