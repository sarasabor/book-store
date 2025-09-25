import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { buildApiUrl, ENDPOINTS, REQUEST_CONFIG } from '../config/config';
import SubmitButton from './SubmitButton';

const LoginForm = () => {

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //* DRY : DON'T REPEAT YOURSELF
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(buildApiUrl(ENDPOINTS.AUTH.LOGIN), {
                email: formData.email,
                password: formData.password
            }, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                timeout: REQUEST_CONFIG.TIMEOUT
            });

            const userData = response.data;

            //* Save The user To LocalStorage
            localStorage.setItem('user', userData);

            login(userData); //* This login form from the authContext to update the state of the User

            setIsLoading(false);
            
        } catch (error) {
            const data = error.response?.data || 'Une erreur est survenue';
            // console.log(error);
            setErrors(data);
            setIsLoading(false);
        }
    }

  return (
    <div className='w-[80%] sm:w-[60%]b md:w-[40%] lg:w-[30%] mx-auto p-[20px] bg-gray-100 shadow-lg rounded-lg mt-[2.3rem] max-sm:h-[370px]'>
        <h2 className='text-[1.5rem] font-bold text-orange-600 mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
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
                />
                {errors && errors.email && (
                    <span className='mt-1 text-sm font-semibold text-red-600 lowercase'>{errors.email}</span>
                )}
            </div>
            <div>
                <label 
                    htmlFor="password"
                    className='block text-lg font-medium text-gray-600'
                >Password :</label>
                <input 
                    type='password'
                    placeholder='Enter Your Password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                    focus:ring-orange-600 mb-[.9rem]'
                />
                {errors && errors.password && (
                    <span className='mt-1 text-sm font-semibold text-red-600 lowercase'> {errors.password} </span>
                )}
            </div>
            <div>
                <SubmitButton isLoading={isLoading} />
            </div>
        </form>
    </div>
  )
}

export default LoginForm