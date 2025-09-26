import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaShippingFast, FaHeart, FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa';
import BooksGenre from './BooksGenre';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='bg-slate-50'>
      {/* Hero Section with Real Photo Background */}
      <div className='relative min-h-screen flex items-center overflow-hidden'>
        {/* Background Photo */}
        <div className='absolute inset-0'>
          <img 
            src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            alt='Beautiful library with books'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/80'></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse'></div>
          <div className='absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce'></div>
          <div className='absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping'></div>
          <div className='absolute bottom-32 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-pulse'></div>
        </div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Content with Animations */}
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
                <span className='inline-block animate-fade-in-up'>Découvrez Votre</span>
                <span className='block text-blue-200 animate-fade-in-up' style={{animationDelay: '0.2s'}}>Prochaine Lecture</span>
              </h1>
              <p className='text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed animate-fade-in-up' style={{animationDelay: '0.4s'}}>
                Plus de 10,000 livres soigneusement sélectionnés pour nourrir votre passion de la lecture.
                Explorez, découvrez et laissez-vous emporter par l'aventure.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up' style={{animationDelay: '0.6s'}}>
                <Link 
                  to="/books"
                  className='inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105'
                >
                  <FaBook className='mr-2 animate-bounce' />
                  Explorer la Collection
                </Link>
                <Link 
                  to="/about"
                  className='inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105'
                >
                  Notre Histoire
                  <FaArrowRight className='ml-2 group-hover:translate-x-1 transition-transform duration-200' />
                </Link>
              </div>
            </div>
            
            {/* Right Content - Animated Stats with Images */}
            <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 group'>
                <div className='w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-spin'>
                  <FaBook className='text-blue-600 text-xl' />
                </div>
                <h3 className='text-2xl font-bold mb-2 animate-count-up'>10,000+</h3>
                <p className='text-blue-200'>Livres disponibles</p>
              </div>
              
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 group'>
                <div className='w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce'>
                  <FaUsers className='text-emerald-600 text-xl' />
                </div>
                <h3 className='text-2xl font-bold mb-2 animate-count-up' style={{animationDelay: '0.2s'}}>50,000+</h3>
                <p className='text-blue-200'>Lecteurs satisfaits</p>
              </div>
              
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 group'>
                <div className='w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse'>
                  <FaShippingFast className='text-purple-600 text-xl' />
                </div>
                <h3 className='text-2xl font-bold mb-2 animate-count-up' style={{animationDelay: '0.4s'}}>24h</h3>
                <p className='text-blue-200'>Livraison rapide</p>
              </div>
              
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 group'>
                <div className='w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-ping'>
                  <FaHeart className='text-rose-600 text-xl' />
                </div>
                <h3 className='text-2xl font-bold mb-2 animate-count-up' style={{animationDelay: '0.6s'}}>5★</h3>
                <p className='text-blue-200'>Note moyenne</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Images */}
      <div className='py-20 relative'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl'></div>
          <div className='absolute bottom-20 right-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl'></div>
        </div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-6 animate-fade-in-up'>
              Pourquoi Choisir Notre Librairie ?
            </h2>
            <p className='text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up' style={{animationDelay: '0.2s'}}>
              Nous mettons la passion de la lecture au cœur de tout ce que nous faisons
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center group animate-fade-in-up' style={{animationDelay: '0.4s'}}>
              <div className='relative mb-6 overflow-hidden rounded-2xl'>
                <img 
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                  alt='Beautiful book collection'
                  className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <FaBook className='text-2xl mb-2' />
                </div>
              </div>
              <h3 className='text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300'>Collection Exceptionnelle</h3>
              <p className='text-slate-600 leading-relaxed'>
                Des milliers de livres soigneusement sélectionnés dans tous les genres pour satisfaire tous les goûts
              </p>
            </div>
            
            <div className='text-center group animate-fade-in-up' style={{animationDelay: '0.6s'}}>
              <div className='relative mb-6 overflow-hidden rounded-2xl'>
                <img 
                  src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                  alt='Fast delivery service'
                  className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-emerald-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <FaShippingFast className='text-2xl mb-2' />
                </div>
              </div>
              <h3 className='text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300'>Livraison Express</h3>
              <p className='text-slate-600 leading-relaxed'>
                Recevez vos livres rapidement avec notre service de livraison express partout en France
              </p>
            </div>
            
            <div className='text-center group animate-fade-in-up' style={{animationDelay: '0.8s'}}>
              <div className='relative mb-6 overflow-hidden rounded-2xl'>
                <img 
                  src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                  alt='Customer service team'
                  className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <FaHeart className='text-2xl mb-2' />
                </div>
              </div>
              <h3 className='text-xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors duration-300'>Service Client</h3>
              <p className='text-slate-600 leading-relaxed'>
                Une équipe passionnée à votre service pour vous conseiller et vous accompagner
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Images */}
      <div className='bg-white py-20 relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full animate-pulse'></div>
          <div className='absolute bottom-10 left-10 w-16 h-16 bg-purple-100 rounded-full animate-bounce'></div>
        </div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-6 animate-fade-in-up'>
              Ce Que Disent Nos Lecteurs
            </h2>
            <div className='w-24 h-1 bg-blue-600 mx-auto rounded-full animate-fade-in-up' style={{animationDelay: '0.2s'}}></div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-slate-50 rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up' style={{animationDelay: '0.4s'}}>
              <div className='relative mb-6'>
                <img 
                  src='https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
                  alt='Marie Dupont'
                  className='w-16 h-16 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 group-hover:border-blue-400 transition-colors duration-300'
                />
                <FaQuoteLeft className='absolute -top-2 -right-2 text-blue-600 text-2xl opacity-20' />
              </div>
              <div className='flex justify-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className='text-yellow-400 text-lg animate-pulse' style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <p className='text-slate-600 mb-6 italic group-hover:text-slate-800 transition-colors duration-300'>
                "Une sélection incroyable et un service client exceptionnel. Je recommande vivement !"
              </p>
              <p className='font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300'>Marie Dupont</p>
              <p className='text-slate-500 text-sm'>Lectrice passionnée</p>
            </div>
            
            <div className='bg-slate-50 rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up' style={{animationDelay: '0.6s'}}>
              <div className='relative mb-6'>
                <img 
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
                  alt='Jean Martin'
                  className='w-16 h-16 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-200 group-hover:border-emerald-400 transition-colors duration-300'
                />
                <FaQuoteLeft className='absolute -top-2 -right-2 text-emerald-600 text-2xl opacity-20' />
              </div>
              <div className='flex justify-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className='text-yellow-400 text-lg animate-pulse' style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <p className='text-slate-600 mb-6 italic group-hover:text-slate-800 transition-colors duration-300'>
                "Livraison rapide et livres en parfait état. Ma librairie en ligne préférée !"
              </p>
              <p className='font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors duration-300'>Jean Martin</p>
              <p className='text-slate-500 text-sm'>Collectionneur</p>
            </div>
            
            <div className='bg-slate-50 rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up' style={{animationDelay: '0.8s'}}>
              <div className='relative mb-6'>
                <img 
                  src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
                  alt='Sophie Leroy'
                  className='w-16 h-16 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200 group-hover:border-purple-400 transition-colors duration-300'
                />
                <FaQuoteLeft className='absolute -top-2 -right-2 text-purple-600 text-2xl opacity-20' />
              </div>
              <div className='flex justify-center mb-4'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className='text-yellow-400 text-lg animate-pulse' style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <p className='text-slate-600 mb-6 italic group-hover:text-slate-800 transition-colors duration-300'>
                "Des prix abordables et une qualité irréprochable. Merci pour cette belle découverte !"
              </p>
              <p className='font-semibold text-slate-800 group-hover:text-purple-600 transition-colors duration-300'>Sophie Leroy</p>
              <p className='text-slate-500 text-sm'>Étudiante</p>
            </div>
        </div> 
        </div>
      </div>

      {/* Books Genre Section */}
      <BooksGenre title='Explorez Nos Genres' />

      {/* Popular Books Section */}
      <div className='py-20 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-6 animate-fade-in-up'>
              Nos Livres les Plus Populaires
            </h2>
            <div className='w-24 h-1 bg-blue-600 mx-auto rounded-full animate-fade-in-up' style={{animationDelay: '0.2s'}}></div>
            <p className='text-xl text-slate-600 mt-6 max-w-2xl mx-auto animate-fade-in-up' style={{animationDelay: '0.4s'}}>
              Découvrez les livres qui font sensation cette année
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='group animate-fade-in-up' style={{animationDelay: '0.6s'}}>
              <div className='relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300'>
                <img 
                  src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                  alt='Popular book 1'
                  className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <h3 className='font-bold text-lg'>Livre Bestseller</h3>
                  <p className='text-sm'>Auteur renommé</p>
                </div>
              </div>
            </div>
            
            <div className='group animate-fade-in-up' style={{animationDelay: '0.8s'}}>
              <div className='relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300'>
                <img 
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                  alt='Popular book 2'
                  className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <h3 className='font-bold text-lg'>Roman Acclamé</h3>
                  <p className='text-sm'>Écrivain primé</p>
                </div>
              </div>
            </div>
            
            <div className='group animate-fade-in-up' style={{animationDelay: '1.0s'}}>
              <div className='relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300'>
                <img 
                  src='https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                  alt='Popular book 3'
                  className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <h3 className='font-bold text-lg'>Guide Pratique</h3>
                  <p className='text-sm'>Expert reconnu</p>
                </div>
              </div>
            </div>
            
            <div className='group animate-fade-in-up' style={{animationDelay: '1.2s'}}>
              <div className='relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300'>
                <img 
                  src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                  alt='Popular book 4'
                  className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <h3 className='font-bold text-lg'>Biographie</h3>
                  <p className='text-sm'>Personnalité célèbre</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className='text-center mt-12 animate-fade-in-up' style={{animationDelay: '1.4s'}}>
            <Link 
              to="/books"
              className='inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            >
              <FaBook className='mr-2' />
              Voir Tous les Livres
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section with Animations */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 py-20 relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/90 to-blue-700/90'></div>
          <div className='absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse'></div>
          <div className='absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce'></div>
          <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping'></div>
        </div>
        
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
          <div className='animate-fade-in-up'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Prêt à Commencer Votre Prochaine Aventure ?
            </h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Rejoignez des milliers de lecteurs satisfaits et découvrez votre prochaine lecture préférée
            </p>
          </div>
          
          <div className='animate-fade-in-up' style={{animationDelay: '0.3s'}}>
            <Link 
              to="/books"
              className='inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 group'
            >
              <FaBook className='mr-2 group-hover:animate-bounce' />
              Découvrir Maintenant
              <svg className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </Link>
          </div>
          
          {/* Floating Books Animation */}
          <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
            <div className='absolute top-20 left-10 text-white/20 text-6xl animate-float' style={{animationDelay: '0s'}}>📚</div>
            <div className='absolute top-32 right-20 text-white/20 text-4xl animate-float' style={{animationDelay: '1s'}}>📖</div>
            <div className='absolute bottom-20 left-1/4 text-white/20 text-5xl animate-float' style={{animationDelay: '2s'}}>📕</div>
            <div className='absolute bottom-32 right-1/3 text-white/20 text-3xl animate-float' style={{animationDelay: '3s'}}>📗</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Hero; 