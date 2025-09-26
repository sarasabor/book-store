import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaCreditCard, FaLock, FaUser, FaMapMarkerAlt, FaArrowLeft, FaCheck, FaShieldAlt } from 'react-icons/fa';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Rediriger si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!user) {
      navigate('/login', { 
        state: { 
          message: 'Vous devez être connecté pour effectuer un achat',
          redirectTo: '/checkout'
        }
      });
    }
  }, [user, navigate]);

  // Rediriger si le panier est vide
  useEffect(() => {
    if (cartItems.length === 0 && user) {
      navigate('/books', { 
        state: { 
          message: 'Votre panier est vide. Ajoutez des livres avant de procéder au paiement.'
        }
      });
    }
  }, [cartItems, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation des informations personnelles
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Le code postal est requis';

    // Validation des informations de carte
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Le numéro de carte est requis';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'La date d\'expiration est requise';
    if (!formData.cvv.trim()) newErrors.cvv = 'Le CVV est requis';
    if (!formData.cardName.trim()) newErrors.cardName = 'Le nom sur la carte est requis';

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation du format de la carte (simplifié)
    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    if (formData.cardNumber && !cardRegex.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Format de carte invalide (16 chiffres)';
    }

    // Validation du format de la date d'expiration
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (formData.expiryDate && !expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format invalide (MM/AA)';
    }

    // Validation du CVV
    const cvvRegex = /^\d{3,4}$/;
    if (formData.cvv && !cvvRegex.test(formData.cvv)) {
      newErrors.cvv = 'CVV invalide (3-4 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simuler le traitement du paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici, vous intégreriez avec un vrai service de paiement
      console.log('Paiement traité:', {
        user: user.email,
        cartItems,
        total: getCartTotal(),
        formData: {
          ...formData,
          cardNumber: '**** **** **** ' + formData.cardNumber.slice(-4), // Masquer le numéro
          cvv: '***' // Masquer le CVV
        }
      });

      setSuccess(true);
      clearCart();
      
      // Rediriger vers une page de confirmation après 3 secondes
      setTimeout(() => {
        navigate('/books', { 
          state: { 
            message: 'Paiement effectué avec succès ! Merci pour votre achat.'
          }
        });
      }, 3000);

    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      setErrors({ submit: 'Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  // Si l'utilisateur n'est pas authentifié ou le panier est vide, ne rien afficher
  if (!user || cartItems.length === 0) {
    return null;
  }

  if (success) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='max-w-md mx-auto p-12 text-center bg-white shadow-lg rounded-2xl'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <FaCheck className='text-4xl text-green-600' />
          </div>
          <h2 className='text-3xl font-bold text-slate-800 mb-4'>Paiement réussi !</h2>
          <p className='text-slate-600 mb-6'>
            Votre commande a été traitée avec succès. Vous recevrez un email de confirmation sous peu.
          </p>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
          <p className='text-sm text-slate-500 mt-4'>Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='bg-white border-b border-slate-200'>
        <div className='container px-4 py-6 mx-auto'>
          <div className='flex items-center justify-between'>
            <button 
              onClick={() => navigate('/books')}
              className='flex items-center text-blue-600 transition-colors duration-300 hover:text-blue-700'
            >
              <FaArrowLeft className='mr-2' />
              Retour aux livres
            </button>
            
            <div className='flex items-center text-slate-600'>
              <FaShieldAlt className='mr-2 text-green-600' />
              <span className='text-sm'>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      <div className='container px-4 py-12 mx-auto'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-slate-800 mb-4'>Finaliser votre commande</h1>
            <p className='text-xl text-slate-600'>Remplissez vos informations pour compléter votre achat</p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Résumé de la commande */}
            <div className='lg:col-span-1 order-1 lg:order-1'>
              <div className='bg-white rounded-2xl p-8 shadow-lg sticky top-8'>
                <h2 className='text-2xl font-bold text-slate-800 mb-6'>Résumé de la commande</h2>
                
                <div className='space-y-4 mb-6'>
                  {cartItems.map((item) => (
                    <div key={item._id} className='flex items-center gap-4 p-4 bg-slate-50 rounded-lg'>
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className='w-16 h-20 object-cover rounded'
                      />
                      <div className='flex-1'>
                        <h3 className='font-semibold text-slate-800 text-sm'>{item.title}</h3>
                        <p className='text-slate-600 text-sm'>par {item.author}</p>
                        <p className='text-slate-600 text-sm'>Quantité: {item.quantity}</p>
                      </div>
                      <div className='text-right'>
                        <p className='font-bold text-slate-800'>
                          {((item.oldPrice && item.oldPrice > item.price ? item.price : item.price) * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='border-t border-slate-200 pt-4 space-y-2'>
                  <div className='flex justify-between text-slate-600'>
                    <span>Articles ({getCartItemsCount()})</span>
                    <span>{getCartTotal().toFixed(2)}€</span>
                  </div>
                  <div className='flex justify-between text-slate-600'>
                    <span>Livraison</span>
                    <span className='text-green-600 font-semibold'>Gratuite</span>
                  </div>
                  <div className='flex justify-between text-slate-600'>
                    <span>Taxes</span>
                    <span>0.00€</span>
                  </div>
                  <div className='border-t border-slate-200 pt-2'>
                    <div className='flex justify-between text-xl font-bold text-slate-800'>
                      <span>Total</span>
                      <span>{getCartTotal().toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                <div className='mt-6 p-4 bg-green-50 rounded-lg'>
                  <div className='flex items-center text-green-600 mb-2'>
                    <FaLock className='mr-2' />
                    <span className='font-semibold'>Paiement sécurisé</span>
                  </div>
                  <p className='text-sm text-green-700'>
                    Vos informations de paiement sont protégées par un chiffrement SSL 256-bit.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire de paiement */}
            <div className='lg:col-span-2 order-2 lg:order-2 space-y-8'>
              <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Informations personnelles */}
                <div className='bg-white rounded-2xl p-8 shadow-lg'>
                  <div className='flex items-center mb-6'>
                    <FaUser className='text-blue-600 mr-3' />
                    <h2 className='text-2xl font-bold text-slate-800'>Informations personnelles</h2>
                  </div>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Prénom *</label>
                      <input
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='Votre prénom'
                      />
                      {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Nom *</label>
                      <input
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='Votre nom'
                      />
                      {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Email *</label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='votre@email.com'
                      />
                      {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Téléphone *</label>
                      <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='+33 1 23 45 67 89'
                      />
                      {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className='bg-white rounded-2xl p-8 shadow-lg'>
                  <div className='flex items-center mb-6'>
                    <FaMapMarkerAlt className='text-blue-600 mr-3' />
                    <h2 className='text-2xl font-bold text-slate-800'>Adresse de livraison</h2>
                  </div>
                  
                  <div className='space-y-6'>
                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Adresse *</label>
                      <input
                        type='text'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='123 Rue de la Paix'
                      />
                      {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      <div>
                        <label className='block text-slate-700 text-sm font-semibold mb-2'>Ville *</label>
                        <input
                          type='text'
                          name='city'
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? 'border-red-500' : 'border-slate-300'
                          }`}
                          placeholder='Paris'
                        />
                        {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
                      </div>

                      <div>
                        <label className='block text-slate-700 text-sm font-semibold mb-2'>Code postal *</label>
                        <input
                          type='text'
                          name='postalCode'
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.postalCode ? 'border-red-500' : 'border-slate-300'
                          }`}
                          placeholder='75001'
                        />
                        {errors.postalCode && <p className='text-red-500 text-sm mt-1'>{errors.postalCode}</p>}
                      </div>

                      <div>
                        <label className='block text-slate-700 text-sm font-semibold mb-2'>Pays</label>
                        <select
                          name='country'
                          value={formData.country}
                          onChange={handleChange}
                          className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                          <option value='France'>France</option>
                          <option value='Belgique'>Belgique</option>
                          <option value='Suisse'>Suisse</option>
                          <option value='Canada'>Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations de paiement */}
                <div className='bg-white rounded-2xl p-8 shadow-lg'>
                  <div className='flex items-center mb-6'>
                    <FaCreditCard className='text-blue-600 mr-3' />
                    <h2 className='text-2xl font-bold text-slate-800'>Informations de paiement</h2>
                  </div>
                  
                  <div className='space-y-6'>
                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Numéro de carte *</label>
                      <input
                        type='text'
                        name='cardNumber'
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='1234 5678 9012 3456'
                        maxLength='19'
                      />
                      {errors.cardNumber && <p className='text-red-500 text-sm mt-1'>{errors.cardNumber}</p>}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-slate-700 text-sm font-semibold mb-2'>Date d'expiration *</label>
                        <input
                          type='text'
                          name='expiryDate'
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-slate-300'
                          }`}
                          placeholder='MM/AA'
                          maxLength='5'
                        />
                        {errors.expiryDate && <p className='text-red-500 text-sm mt-1'>{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label className='block text-slate-700 text-sm font-semibold mb-2'>CVV *</label>
                        <input
                          type='text'
                          name='cvv'
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-500' : 'border-slate-300'
                          }`}
                          placeholder='123'
                          maxLength='4'
                        />
                        {errors.cvv && <p className='text-red-500 text-sm mt-1'>{errors.cvv}</p>}
                      </div>
                    </div>

                    <div>
                      <label className='block text-slate-700 text-sm font-semibold mb-2'>Nom sur la carte *</label>
                      <input
                        type='text'
                        name='cardName'
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardName ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder='Jean Dupont'
                      />
                      {errors.cardName && <p className='text-red-500 text-sm mt-1'>{errors.cardName}</p>}
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <p className='text-red-600'>{errors.submit}</p>
                  </div>
                )}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center gap-2'
                >
                  {loading ? (
                    <>
                      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Payer {getCartTotal().toFixed(2)}€
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
