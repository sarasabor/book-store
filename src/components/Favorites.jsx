import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaEye, FaTrash, FaBookOpen, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

const Favorites = () => {
  const { favorites, removeFromFavorites, clearAllFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(new Set());

  const handleAddToCart = (book) => {
    addToCart(book);
    setAddedToCart(prev => new Set([...prev, book._id]));
    
    // Retirer l'indication après 2 secondes
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(book._id);
        return newSet;
      });
    }, 2000);
  };

  const handleAddAllToCart = () => {
    favorites.forEach(book => {
      addToCart(book);
    });
    setAddedToCart(new Set(favorites.map(book => book._id)));
    
    // Retirer l'indication après 3 secondes
    setTimeout(() => {
      setAddedToCart(new Set());
    }, 3000);
  };


  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='bg-white border-b border-slate-200'>
        <div className='container px-4 py-6 mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Link 
                to="/books" 
                className='flex items-center text-blue-600 transition-colors duration-300 hover:text-blue-700'
              >
                <FaArrowLeft className='mr-2' />
                Retour aux livres
              </Link>
            </div>
            
            {favorites.length > 0 && (
              <button 
                onClick={clearAllFavorites}
                className='px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-300 bg-red-50 rounded-lg hover:bg-red-100'
              >
                Vider la liste
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container px-4 py-12 mx-auto'>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-6'>
            <div className='p-4 bg-red-100 rounded-full'>
              <FaHeart className='text-4xl text-red-500' />
            </div>
          </div>
          <h1 className='mb-4 text-4xl font-bold text-slate-800'>Mes Favoris</h1>
          <div className='w-24 h-1 bg-red-500 mx-auto rounded-full mb-6'></div>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            {favorites.length > 0 
              ? `Vous avez ${favorites.length} livre${favorites.length > 1 ? 's' : ''} dans vos favoris`
              : 'Aucun livre dans vos favoris pour le moment'
            }
          </p>
        </div>

        {favorites.length === 0 ? (
          /* Empty State */
          <div className='text-center py-20'>
            <div className='max-w-md mx-auto p-12 bg-white shadow-lg rounded-2xl'>
              <div className='mb-6 text-6xl'>💔</div>
              <h3 className='mb-4 text-2xl font-bold text-slate-800'>Aucun favori</h3>
              <p className='mb-8 text-slate-600'>
                Vous n'avez pas encore ajouté de livres à vos favoris. 
                Explorez notre collection et ajoutez vos livres préférés !
              </p>
              <Link 
                to="/books"
                className='inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700'
              >
                <FaBookOpen className='mr-2' />
                Découvrir des livres
              </Link>
            </div>
          </div>
        ) : (
          /* Favorites Grid */
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {favorites.map((book, index) => (
              <div 
                key={book._id}
                className='p-6 bg-white shadow-lg rounded-2xl overflow-hidden group card-hover-effect animate-fade-in-up'
                style={{
                  animationDelay: `${index * 0.1}s`,
                  '--stagger-delay': index
                }}
              >
                {/* Image Container */}
                <div className='relative mb-6 overflow-hidden rounded-xl'>
                  <Link to={`/books/${book._id}`}>
                    <img 
                      src={book.img} 
                      alt={book.title}
                      className='w-full h-64 object-cover card-image-hover' 
                    />
                  </Link>
                  
                  {/* Overlay with Actions */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-4 left-4 right-4 flex justify-between items-center'>
                      <Link 
                        to={`/books/${book._id}`}
                        className='flex items-center px-3 py-2 text-sm font-semibold text-white transition-all duration-300 bg-white/90 rounded-lg hover:bg-white card-button-hover'
                      >
                        <FaEye className='mr-2' />
                        Voir
                      </Link>
                      <button 
                        onClick={() => removeFromFavorites(book._id)}
                        className='p-2 text-white transition-all duration-300 bg-red-500 rounded-full hover:bg-red-600 card-button-hover'
                      >
                        <FaTrash className='text-sm' />
                      </button>
                    </div>
                  </div>
                  
                  {/* Badge de réduction */}
                  {book.oldPrice && book.oldPrice > book.price && (
                    <div className='absolute px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full top-4 left-4'>
                      -{Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)}%
                    </div>
                  )}
                  
                  {/* Rating Stars */}
                  <div className='absolute flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full top-4 right-4'>
                    <FaStar className='text-sm text-yellow-400 mr-1' />
                    <span className='text-xs font-semibold'>4.8</span>
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className='mb-2 text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300' title={book.title}>
                    {book.title.length > 30 ? `${book.title.slice(0,30)}...` : book.title}
                  </h3>
                  
                  <p className='mb-4 text-sm font-medium text-slate-600'>par {book.author}</p>
                  
                  {/* Price Section */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex flex-col'>
                      <span className='text-xl font-bold text-emerald-600'>${book.price}</span>
                      {book.oldPrice && book.oldPrice > book.price && (
                        <span className='text-sm line-through text-slate-400'>${book.oldPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className='flex gap-2'>
                    <button 
                      onClick={() => handleAddToCart(book)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-white transition-colors duration-300 rounded-lg card-button-hover ${
                        addedToCart.has(book._id) 
                          ? 'bg-green-600 hover:bg-green-700 animate-card-bounce' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {addedToCart.has(book._id) ? (
                        <>
                          <FaCheck />
                          Ajouté !
                        </>
                      ) : (
                        <>
                          <FaShoppingCart />
                          Panier
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => removeFromFavorites(book._id)}
                      className='flex items-center justify-center p-2 text-red-600 transition-colors duration-300 bg-red-100 rounded-lg hover:bg-red-200 card-button-hover'
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {favorites.length > 0 && (
          <div className='mt-16 text-center'>
            <div className='max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white'>
              <h3 className='mb-4 text-2xl font-bold'>Prêt à acheter vos favoris ?</h3>
              <p className='mb-6 text-blue-100'>
                Vous avez {favorites.length} livre{favorites.length > 1 ? 's' : ''} dans vos favoris. 
                Ajoutez-les à votre panier pour les acheter !
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button 
                  onClick={handleAddAllToCart}
                  className='flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-600 transition-colors duration-300 bg-white rounded-lg hover:bg-blue-50'
                >
                  <FaShoppingCart />
                  Ajouter tout au panier
                </button>
                <Link 
                  to="/books"
                  className='flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-blue-600'
                >
                  <FaBookOpen />
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
