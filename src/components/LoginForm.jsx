import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
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
            const response = await axios.post('http://localhost:5000/login', {
                email: formData.email,
                password: formData.password
            }, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            const userData = response.data;

            //* Save The user To LocalStorage
            localStorage.setItem('user', userData);

            login(userData); //* This login form from the authContext to update the state of the User

            setIsLoading(false);
            
        } catch (error) {
            const { data } = error.response;
            // console.log(error);
            setErrors(data);
            setIsLoading(false);
        }
    }

  return (
    <div className='w-[90%] sm:w-[60%]b md:w-[40%] lg:w-[30%] mx-auto p-[20px] bg-gray-100 shadow-lg rounded-lg mt-[1.6rem]'>
      <h2 className='text-[1.5rem] font-bold text-orange-600 mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor="email"  className='block text-lg font-medium text-gray-600'>Email :</label>
                <input 
                    type='email'
                    name='email'
                    placeholder='Enter Your Email'
                    value={formData.email}
                    onChange={handleChange}
                     className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                    focus:ring-orange-600'
                />
                {errors && errors.email && (
                    <span className='text-red-600 text-sm font-semibold mt-1 lowercase'>{errors.email}</span>
                )}
            </div>
            <div>
                <label htmlFor="password"
                       className='block text-lg font-medium text-gray-600'
                >Password :</label>
                <input 
                    type="password"
                    name='password'
                    placeholder='Enter The Password' 
                    value={formData.password}
                    onChange={handleChange}
                      className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                    focus:ring-orange-600'
                />
                {errors && errors.password && (
                    <span className='text-red-600 text-sm font-semibold mt-1 lowercase'>{errors.password}</span>
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