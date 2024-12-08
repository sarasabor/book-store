import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
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
            const res = await axios.post('https://book-store-b1dk.onrender.com/api/contact', {
                name: formData.name,
                email: formData.email,
                message: formData.message
            }, {
                withCredentials: true
            }); 
            toast.success('Email Sent Successfully');

            setFormData({ name: '', email: '', message: ''}); //* remove all data from inputs values
            setIsLoading(false);
        } catch (error) {
           toast.error(error.message);
           console.log(error)
           setIsLoading(false);
        }
    }

  return (
    <div className='mt-[8rem] mb-[4rem] container mx-auto px-[2rem] sm:px-[3rem] md:px-[4rem] lg:px-[6rem] xl:px-[6rem]  '>
        <h2
            className='text-[1.5rem] sm:text-[2rem] text-orange-600 font-medium'
        >Contact Us</h2>
        <form 
            onSubmit={handleSubmit}
            className='max-w-[60%] max-sm:min-w-[90%] mx-auto p-8 rounded-md space-y-6'
        >
            <div>
                <label htmlFor="name" className='block text-gray-700 font-medium'>Name: </label>
                <input 
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full mt-2 px-4 py-2 outline-none border focus:border-none border-gray-600 focus:ring-1 focus:ring-orange-600 rounded-md'
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className='block text-gray-700 font-medium'>Email: </label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full mt-2 px-4 py-2 outline-none border focus:border-none border-gray-600 focus:ring-1 focus:ring-orange-600 rounded-md'
                    required
                />
            </div>
            <div>
                <label htmlFor="message" className='block text-gray-700 font-medium'>Message: </label>
                <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows='4'
                    className='w-full mt-2 px-4 py-2 border border-gray-600 focus:border-none focus:outline-none outline-none rounded-md focus:ring-1 focus:ring-orange-600'
                    required
                ></textarea>
            </div>
            <div>
                <SubmitButton isLoading={isLoading} />
            </div>
        </form>
    </div>
  )
}

export default Contact