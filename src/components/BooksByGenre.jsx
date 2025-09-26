import axios from 'axios';
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { buildApiUrl, REQUEST_CONFIG } from '../config/config';
import { FaHeart, FaShoppingCart, FaStar, FaEye, FaArrowLeft } from 'react-icons/fa';

const BooksByGenre = () => {
    const { user } = useContext(AuthContext);
    const { genre } = useParams();
    const [ books, setBooks ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToCart } = useCart();

    const fetchBooksByGenre = useCallback(async() => {
        setLoading(true);
        setError(null);
        try {
            // Create headers object conditionally
            const headers = {};
            if (user && user.token) {
                headers['Authorization'] = `Bearer ${user.token}`;
            }

            const response = await axios.get(buildApiUrl(`/books/genre/${genre}`), {
                headers,
                timeout: REQUEST_CONFIG.TIMEOUT
            });
            const data = await response.data;
            const { booksByGenre } = data;

            setBooks(booksByGenre);
        } catch (error) {
            console.error('Error While Fetching Books', error);
            setError(error.response?.data?.message || 'Failed to fetch books by genre');
        } finally {
            setLoading(false);
        }
    }, [user, genre]);

    useEffect(() => {
        // Fetch books by genre regardless of user authentication status
        fetchBooksByGenre();
    }, [fetchBooksByGenre]);

  return (
    <div className='bg-slate-50 min-h-screen py-12'>
      <div className='container mx-auto px-[2rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] xl:px-[6rem]'>
        {/* Header */}
        <div className='mb-12'>
          <Link 
            to="/books" 
            className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-300'
          >
            <FaArrowLeft className='mr-2' />
            Retour aux livres
          </Link>
          
          <div className='text-center'>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4 capitalize'>
              Livres {genre}
            </h1>
            <div className='w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6'></div>
            <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
              Découvrez notre sélection de livres dans la catégorie {genre}
            </p>
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">Chargement des livres...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-center">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <p className="text-red-800 font-medium mb-4">{error}</p>
            <button 
              onClick={fetchBooksByGenre}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && books && books.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {books.map((book, index) => (
                  <div key={book._id}
                    className='bg-white rounded-2xl shadow-lg overflow-hidden group card-hover-effect animate-fade-in-up'
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      '--stagger-delay': index
                    }}
                  >
                {/* Image Container */}
                <div className='relative overflow-hidden'>
                  <Link to={`/books/${book._id}`}>
                    <img 
                      src={book.img} 
                      alt={book.title}
                      className='h-[400px] w-full object-cover card-image-hover' 
                    />
                  </Link>
                  
                  {/* Overlay with Actions */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-4 left-4 right-4 flex justify-between items-center'>
                      <Link 
                        to={`/books/${book._id}`}
                        className='bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center card-button-hover'
                      >
                        <FaEye className='mr-2' />
                        Voir Détails
                      </Link>
                      <button 
                        onClick={() => toggleFavorite(book)}
                        className={`p-3 rounded-full transition-all duration-300 card-button-hover ${
                          isFavorite(book._id) 
                            ? 'bg-red-500 text-white animate-card-pulse' 
                            : 'bg-white/90 hover:bg-white text-slate-800'
                        }`}
                      >
                        <FaHeart className={isFavorite(book._id) ? 'animate-card-bounce' : ''} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Badge de réduction */}
                  {book.oldPrice && book.oldPrice > book.price && (
                    <div className='absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold'>
                      -{Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)}%
                    </div>
                  )}
                  
                  {/* Rating Stars */}
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center'>
                    <FaStar className='text-yellow-400 text-sm mr-1' />
                    <span className='text-xs font-semibold'>4.8</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className='p-6'>
                  <h2 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300' title={book.title}>
                    {book.title.length > 25 ? `${book.title.slice(0,25)}...` : book.title}
                  </h2>
                  
                  <p className='text-slate-600 text-sm mb-4 font-medium'>par {book.author}</p>
                  
                  {/* Price Section */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex flex-col'>
                      <span className='text-2xl font-bold text-emerald-600'>${book.price}</span>
                      {book.oldPrice && book.oldPrice > book.price && (
                        <span className='line-through text-slate-400 text-sm'>${book.oldPrice}</span>
                      )}
                    </div>
                        <button 
                          onClick={() => addToCart(book)}
                          className='bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 card-button-hover group-hover:animate-card-bounce'
                        >
                          <FaShoppingCart />
                        </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className='flex gap-2'>
                    <button 
                      onClick={() => addToCart(book)}
                      className='flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300 text-sm card-button-hover'
                    >
                      Ajouter au Panier
                    </button>
                    <button 
                      onClick={() => toggleFavorite(book)}
                      className='bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors duration-300 card-button-hover'
                    >
                      <FaHeart className={isFavorite(book._id) ? 'text-red-500 animate-card-pulse' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ): !loading && !error && (
          <div className="text-center py-20">
            <div className='bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto'>
              <div className='text-6xl mb-4'>📚</div>
              <h3 className='text-2xl font-bold text-slate-800 mb-4'>Aucun livre trouvé</h3>
              <p className='text-slate-600 mb-6'>Aucun livre disponible pour la catégorie "{genre}".</p>
              <Link 
                to="/books"
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300'
              >
                Voir tous les livres
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BooksByGenre