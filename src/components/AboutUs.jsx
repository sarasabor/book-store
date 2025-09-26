import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaGlobe, FaHeart } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className='bg-slate-50 min-h-screen'>
      {/* Hero Section */}
      <div className='bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
            About <span className='text-blue-200'>Our Story</span>
          </h1>
          <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed'>
            Découvrez l'histoire derrière notre passion pour les livres et notre mission 
            de rendre la lecture accessible à tous.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Our Mission */}
        <div className='max-w-4xl mx-auto mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-6'>
              Notre Mission
            </h2>
            <div className='w-24 h-1 bg-blue-600 mx-auto rounded-full'></div>
          </div>
          
          <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
            <p className='text-lg text-slate-600 leading-relaxed mb-6'>
              Chez <span className='font-semibold text-blue-600'>Books Store</span>, nous croyons que chaque livre 
              a le pouvoir de transformer des vies. Notre mission est de créer un pont entre les lecteurs 
              passionnés et les trésors littéraires du monde entier.
            </p>
            <p className='text-lg text-slate-600 leading-relaxed'>
              Depuis notre création, nous nous efforçons de proposer une expérience de lecture unique, 
              alliant qualité, diversité et accessibilité. Chaque livre de notre collection est 
              soigneusement sélectionné pour enrichir votre bibliothèque personnelle.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20'>
          <div className='text-center bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaBook className='text-blue-600 text-2xl' />
            </div>
            <h3 className='text-3xl font-bold text-slate-800 mb-2'>10,000+</h3>
            <p className='text-slate-600'>Livres disponibles</p>
          </div>
          
          <div className='text-center bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaUsers className='text-emerald-600 text-2xl' />
            </div>
            <h3 className='text-3xl font-bold text-slate-800 mb-2'>50,000+</h3>
            <p className='text-slate-600'>Clients satisfaits</p>
          </div>
          
          <div className='text-center bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaGlobe className='text-purple-600 text-2xl' />
            </div>
            <h3 className='text-3xl font-bold text-slate-800 mb-2'>25+</h3>
            <p className='text-slate-600'>Pays desservis</p>
          </div>
          
          <div className='text-center bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaHeart className='text-rose-600 text-2xl' />
            </div>
            <h3 className='text-3xl font-bold text-slate-800 mb-2'>5+</h3>
            <p className='text-slate-600'>Années d'expérience</p>
          </div>
        </div>

        {/* Our Values */}
        <div className='max-w-6xl mx-auto mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-6'>
              Nos Valeurs
            </h2>
            <div className='w-24 h-1 bg-blue-600 mx-auto rounded-full'></div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center group'>
              <div className='bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2'>
                <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <FaBook className='text-blue-600 text-3xl' />
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-4'>Qualité</h3>
                <p className='text-slate-600 leading-relaxed'>
                  Nous sélectionnons rigoureusement chaque livre pour garantir 
                  une expérience de lecture exceptionnelle.
                </p>
              </div>
            </div>
            
            <div className='text-center group'>
              <div className='bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2'>
                <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <FaUsers className='text-emerald-600 text-3xl' />
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-4'>Communauté</h3>
                <p className='text-slate-600 leading-relaxed'>
                  Nous créons des liens entre les lecteurs et favorisons 
                  le partage de la passion littéraire.
                </p>
              </div>
            </div>
            
            <div className='text-center group'>
              <div className='bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2'>
                <div className='w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <FaGlobe className='text-purple-600 text-3xl' />
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-4'>Accessibilité</h3>
                <p className='text-slate-600 leading-relaxed'>
                  Nous rendons la lecture accessible à tous, partout dans le monde, 
                  à des prix abordables.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Rejoignez Notre Aventure Littéraire
          </h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
            Découvrez des milliers de livres soigneusement sélectionnés et 
            laissez-vous emporter par la magie de la lecture.
          </p>
          <Link 
            to="/books"
            className='inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl'
          >
            Découvrir Nos Livres
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
