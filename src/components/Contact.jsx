import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { buildApiUrl, ENDPOINTS, REQUEST_CONFIG } from '../config/config';
import SubmitButton from './SubmitButton';

const Contact = () => {

    const [ isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(buildApiUrl(ENDPOINTS.CONTACT), {
                name: formData.name,
                email: formData.email,
                message: formData.message
            }, {
                withCredentials: true,
                timeout: REQUEST_CONFIG.TIMEOUT
            }); 
            toast.success('Email Sent Successfully');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            setIsLoading(false);
        } catch (error) {
            toast.error('Failed to send email');
            setIsLoading(false);
        }
    }

  return (
    <div className='bg-gray-100 min-h-screen py-10'>
      <div className='container mx-auto px-[2rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] xl:px-[6rem]'>
        <h1 className='text-xl sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.8rem] font-bold text-gray-800 mb-[2rem]'>Contact Us</h1>
        
        <div className='w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] mx-auto p-[20px] bg-white shadow-lg rounded-lg'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label 
                htmlFor="name"
                className='block text-lg font-medium text-gray-600'
              >Name :</label>
              <input 
                type='text'
                placeholder='Enter Your Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                focus:ring-orange-600'
                required
              />
            </div>
            
            <div className='mb-4'>
              <label 
                htmlFor="email"
                className='block text-lg font-medium text-gray-600'
              >Email :</label>
              <input 
                type='email'
                placeholder='Enter Your Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                focus:ring-orange-600'
                required
              />
            </div>
            
            <div className='mb-4'>
              <label 
                htmlFor="message"
                className='block text-lg font-medium text-gray-600'
              >Message :</label>
              <textarea 
                placeholder='Enter Your Message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                focus:ring-orange-600'
                required
              />
            </div>
            
            <div>
              <SubmitButton isLoading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact