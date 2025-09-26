import axios from 'axios'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { buildApiUrl, REQUEST_CONFIG } from '../config/config'
import { FaHeart, FaShoppingCart, FaStar, FaShare, FaBook, FaUser, FaCalendar, FaTag, FaEye, FaBookOpen } from 'react-icons/fa'

const GetBookById = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState('');
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const fetchBook = useCallback(async() => {
    setLoading(true); //* Start Loading
    try {
      // Create headers object conditionally
      const headers = {};
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await axios.get(buildApiUrl(`/books/${id}`), { 
        headers,
        timeout: REQUEST_CONFIG.TIMEOUT
      });
      const { data } = res;
      setBook(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [user, id]);

  useEffect(() => {
    // Fetch book regardless of user authentication status
      fetchBook();
  }, [fetchBook]);


  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    // Rediriger vers la page de paiement
    window.location.href = '/checkout';
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-slate-50'>
        <div className='p-12 text-center bg-white shadow-lg rounded-2xl'>
          <div className='w-16 h-16 mx-auto mb-6 border-b-4 border-blue-600 rounded-full animate-spin'></div>
          <h3 className='mb-2 text-xl font-semibold text-slate-800'>Chargement du livre...</h3>
          <p className='text-slate-600'>Veuillez patienter pendant que nous récupérons les détails</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-slate-50'>
        <div className='max-w-md p-12 text-center bg-white shadow-lg rounded-2xl'>
          <div className='mb-6 text-6xl text-red-500'>⚠️</div>
          <h3 className='mb-4 text-2xl font-bold text-slate-800'>Erreur de chargement</h3>
          <p className='mb-6 text-slate-600'>Impossible de charger les détails du livre.</p>
          <div className='flex justify-center gap-4'>
            <button 
              onClick={fetchBook}
              className='px-6 py-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700'
            >
              Réessayer
            </button>
            <Link 
              to="/books"
              className='px-6 py-3 font-semibold transition-colors duration-300 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700'
            >
              Retour aux livres
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-slate-50'>
        <div className='p-12 text-center bg-white shadow-lg rounded-2xl'>
          <div className='mb-6 text-6xl'>📚</div>
          <h3 className='mb-4 text-2xl font-bold text-slate-800'>Livre non trouvé</h3>
          <p className='mb-6 text-slate-600'>Le livre que vous recherchez n'existe pas.</p>
          <Link 
            to="/books"
            className='px-6 py-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700'
          >
            Voir tous les livres
          </Link>
        </div>
      </div>
    );
  }
    
  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Breadcrumb Navigation */}
      <div className='bg-white border-b border-slate-200'>
        <div className='container px-4 py-4 mx-auto'>
          <div className='flex items-center space-x-2 text-sm'>
            <Link to="/" className='text-blue-600 transition-colors duration-300 hover:text-blue-700'>
              Accueil
            </Link>
            <span className='text-slate-400'>/</span>
            <Link to="/books" className='text-blue-600 transition-colors duration-300 hover:text-blue-700'>
              Livres
            </Link>
            <span className='text-slate-400'>/</span>
            <span className='text-slate-600'>{book.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container px-4 py-12 mx-auto'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Image Section */}
          <div className='space-y-6'>
            <div className='relative group'>
        <img 
          src={book.img}
          alt={book.title}
                className='w-full h-[600px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500'
              />
              
              {/* Badge de réduction */}
              {book.oldPrice && book.oldPrice > book.price && (
                <div className='absolute px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-full top-6 left-6'>
                  -{Math.round(((book.oldPrice - book.price) / book.oldPrice) * 100)}%
                </div>
              )}
              
              {/* Actions overlay */}
              <div className='absolute flex flex-col gap-3 top-6 right-6'>
                <button 
                  onClick={() => toggleFavorite(book)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isFavorite(book._id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 hover:bg-white text-slate-800'
                  }`}
                >
                  <FaHeart className={isFavorite(book._id) ? 'animate-pulse' : ''} />
                </button>
                <button className='p-3 transition-all duration-300 rounded-full bg-white/90 hover:bg-white text-slate-800 backdrop-blur-sm'>
                  <FaShare />
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className='space-y-8'>
            {/* Header */}
            <div>
              <h1 className='mb-4 text-4xl font-bold leading-tight text-slate-800'>{book.title}</h1>
              <p className='mb-6 text-xl text-slate-600'>par <span className='font-semibold text-blue-600'>{book.author}</span></p>
              
              {/* Rating */}
              <div className='flex items-center gap-4 mb-6'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className='text-lg text-yellow-400' />
                  ))}
                  <span className='ml-2 font-medium text-slate-600'>4.8 (124 avis)</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className='p-6 bg-white shadow-lg rounded-2xl'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <span className='text-4xl font-bold text-emerald-600'>${book.price}</span>
                  {book.oldPrice && book.oldPrice > book.price && (
                    <span className='ml-4 text-2xl line-through text-slate-400'>${book.oldPrice}</span>
                  )}
                </div>
                <div className='text-right'>
                  <p className='text-sm text-slate-500'>En stock</p>
                  <p className='font-semibold text-emerald-600'>✓ Livraison gratuite</p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <label className='font-medium text-slate-700'>Quantité:</label>
                  <div className='flex items-center border rounded-lg border-slate-300'>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className='p-2 transition-colors duration-300 hover:bg-slate-100'
                    >
                      -
                    </button>
                    <span className='px-4 py-2 border-x border-slate-300'>{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className='p-2 transition-colors duration-300 hover:bg-slate-100'
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <button 
                    onClick={handleAddToCart}
                    className='flex items-center justify-center flex-1 gap-2 px-6 py-4 text-lg font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700'
                  >
                    <FaShoppingCart />
                    Ajouter au Panier
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className='flex items-center justify-center flex-1 gap-2 px-6 py-4 text-lg font-semibold text-white transition-colors duration-300 rounded-lg bg-emerald-600 hover:bg-emerald-700'
                  >
                    <FaBookOpen />
                    Acheter Maintenant
                  </button>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className='p-6 bg-white shadow-lg rounded-2xl'>
              <h3 className='mb-4 text-xl font-bold text-slate-800'>Détails du livre</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-3'>
                  <FaUser className='text-blue-600' />
                  <div>
                    <p className='text-sm text-slate-500'>Auteur</p>
                    <p className='font-semibold'>{book.author}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <FaTag className='text-blue-600' />
                  <div>
                    <p className='text-sm text-slate-500'>Genre</p>
                    <p className='font-semibold'>{book.genre || 'Non spécifié'}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <FaCalendar className='text-blue-600' />
                  <div>
                    <p className='text-sm text-slate-500'>Date de publication</p>
                    <p className='font-semibold'>2024</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <FaBook className='text-blue-600' />
                  <div>
                    <p className='text-sm text-slate-500'>Pages</p>
                    <p className='font-semibold'>320</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='mt-16'>
          <div className='overflow-hidden bg-white shadow-lg rounded-2xl'>
            {/* Tab Navigation */}
            <div className='border-b border-slate-200'>
              <nav className='flex'>
                {[
                  { id: 'description', label: 'Description', icon: FaBook },
                  { id: 'reviews', label: 'Avis', icon: FaStar },
                  { id: 'details', label: 'Détails', icon: FaEye }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors duration-300 ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      <Icon />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className='p-8'>
              {activeTab === 'description' && (
                <div>
                  <h3 className='mb-6 text-2xl font-bold text-slate-800'>À propos de ce livre</h3>
                  <p className='text-lg leading-relaxed text-slate-600'>
                    {book.description || 'Aucune description disponible pour ce livre. Découvrez ce livre captivant qui vous emmènera dans un voyage inoubliable à travers ses pages.'}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className='mb-6 text-2xl font-bold text-slate-800'>Avis des lecteurs</h3>
                  <div className='space-y-6'>
                    {[
                      { name: 'Marie Dupont', rating: 5, comment: 'Un livre exceptionnel ! Je le recommande vivement.' },
                      { name: 'Jean Martin', rating: 5, comment: 'Très bien écrit, j\'ai adoré l\'histoire.' },
                      { name: 'Sophie Leroy', rating: 4, comment: 'Bon livre, lecture agréable.' }
                    ].map((review, index) => (
                      <div key={index} className='pb-6 border-b border-slate-200 last:border-b-0'>
                        <div className='flex items-center gap-4 mb-3'>
                          <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full'>
                            <span className='font-semibold text-blue-600'>{review.name[0]}</span>
                          </div>
                          <div>
                            <p className='font-semibold'>{review.name}</p>
                            <div className='flex'>
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} className='text-sm text-yellow-400' />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className='text-slate-600'>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div>
                  <h3 className='mb-6 text-2xl font-bold text-slate-800'>Informations détaillées</h3>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-4'>
                      <div className='flex justify-between py-2 border-b border-slate-200'>
                        <span className='text-slate-600'>ISBN</span>
                        <span className='font-semibold'>978-1234567890</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-slate-200'>
                        <span className='text-slate-600'>Format</span>
                        <span className='font-semibold'>Livre broché</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-slate-200'>
                        <span className='text-slate-600'>Langue</span>
                        <span className='font-semibold'>Français</span>
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='flex justify-between py-2 border-b border-slate-200'>
                        <span className='text-slate-600'>Dimensions</span>
                        <span className='font-semibold'>15 x 23 cm</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-slate-200'>
                        <span className='text-slate-600'>Poids</span>
                        <span className='font-semibold'>450 g</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-slate-200'>
                        <span className='text-slate-600'>Éditeur</span>
                        <span className='font-semibold'>Éditions Modernes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetBookById