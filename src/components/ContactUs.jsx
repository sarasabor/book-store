import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { buildApiUrl } from '../config/config';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(buildApiUrl('/api/contact'), formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      setStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Hero Section */}
      <div className='py-20 text-white bg-gradient-to-br from-blue-600 to-blue-800'>
        <div className='container px-4 mx-auto text-center sm:px-6 lg:px-8'>
          <h1 className='mb-6 text-4xl font-bold md:text-5xl lg:text-6xl'>
            Contactez-<span className='text-blue-200'>Nous</span>
          </h1>
          <p className='max-w-3xl mx-auto text-xl leading-relaxed text-blue-100 md:text-2xl'>
            Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour toute question 
            ou suggestion concernant nos livres.
          </p>
        </div>
      </div>

      <div className='container px-4 py-16 mx-auto sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Contact Information */}
          <div>
            <h2 className='mb-8 text-3xl font-bold text-slate-800'>
              Informations de Contact
            </h2>
            
            <div className='mb-12 space-y-6'>
              <div className='flex items-start space-x-4'>
                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg'>
                  <FaMapMarkerAlt className='text-xl text-blue-600' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-slate-800'>Adresse</h3>
                  <p className='text-slate-600'>
                    123 Rue des Livres<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100'>
                  <FaPhone className='text-xl text-emerald-600' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-slate-800'>Téléphone</h3>
                  <p className='text-slate-600'>+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg'>
                  <FaEnvelope className='text-xl text-purple-600' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-slate-800'>Email</h3>
                  <p className='text-slate-600'>contact@bookstore.com</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-rose-100'>
                  <FaClock className='text-xl text-rose-600' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-slate-800'>Horaires</h3>
                  <p className='text-slate-600'>
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 10h00 - 16h00<br />
                    Dimanche: Fermé
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='p-6 text-center transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg'>
                <h3 className='mb-2 font-semibold text-slate-800'>Support Client</h3>
                <p className='mb-3 text-sm text-slate-600'>Pour toute question sur vos commandes</p>
                <a 
                  href="mailto:support@bookstore.com"
                  className='font-medium text-blue-600 hover:text-blue-700'
                >
                  support@bookstore.com
                </a>
              </div>
              
              <div className='p-6 text-center transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg'>
                <h3 className='mb-2 font-semibold text-slate-800'>Partenariats</h3>
                <p className='mb-3 text-sm text-slate-600'>Pour les collaborations et partenariats</p>
                <a 
                  href="mailto:partnership@bookstore.com"
                  className='font-medium text-blue-600 hover:text-blue-700'
                >
                  partnership@bookstore.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className='p-8 bg-white shadow-lg rounded-2xl'>
              <h2 className='mb-8 text-3xl font-bold text-slate-800'>
                Envoyez-nous un Message
              </h2>

              {status.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  status.type === 'success' 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div>
                    <label htmlFor="name" className='block mb-2 text-sm font-medium text-slate-700'>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 transition-colors duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Votre nom complet'
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-slate-700'>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 transition-colors duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='votre@email.com'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className='block mb-2 text-sm font-medium text-slate-700'>
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 transition-colors duration-200 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Sujet de votre message'
                  />
                </div>

                <div>
                  <label htmlFor="message" className='block mb-2 text-sm font-medium text-slate-700'>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 transition-colors duration-200 border rounded-lg resize-none border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Écrivez votre message ici...'
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isLoading
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </div>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-20'>
          <div className='mb-12 text-center'>
            <h2 className='mb-6 text-3xl font-bold md:text-4xl text-slate-800'>
              Questions Fréquentes
            </h2>
            <div className='w-24 h-1 mx-auto bg-blue-600 rounded-full'></div>
          </div>
          
          <div className='grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-2'>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='mb-3 font-semibold text-slate-800'>Quels sont vos délais de livraison ?</h3>
              <p className='text-slate-600'>
                Nous livrons généralement sous 3-5 jours ouvrés en France métropolitaine. 
                Pour les autres destinations, comptez 7-10 jours ouvrés.
              </p>
            </div>
            
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='mb-3 font-semibold text-slate-800'>Puis-je retourner un livre ?</h3>
              <p className='text-slate-600'>
                Oui, vous disposez de 14 jours pour retourner un livre en parfait état. 
                Les frais de retour sont à votre charge sauf en cas de défaut.
              </p>
            </div>
            
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='mb-3 font-semibold text-slate-800'>Proposez-vous des livres numériques ?</h3>
              <p className='text-slate-600'>
                Actuellement, nous nous concentrons sur les livres physiques, mais nous prévoyons 
                d'ajouter des livres numériques dans un futur proche.
              </p>
            </div>
            
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='mb-3 font-semibold text-slate-800'>Comment suivre ma commande ?</h3>
              <p className='text-slate-600'>
                Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi 
                pour suivre votre colis en temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
