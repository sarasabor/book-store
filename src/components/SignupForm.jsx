import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { buildApiUrl, config } from '../config/config';
import SubmitButton from './SubmitButton';

const SignupForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const [ isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(`${buildApiUrl('/sign-up')}`, { //* req.body
                //* key -> value
                email,
                password
            }, {
                //* This Field is for : format => JSON, TEXT...
                headers: { 'Content-Type' : 'application/json'},
                withCredentials: true
            });
            const userData = await res.data;
            
            //* Save The user To LocalStorage
            localStorage.setItem('user', userData);

            login(userData); //* This login form from the authContext to update the state of the User

            setIsLoading(false);
        } catch (error) {
            setErrors(error.response.data);
            // console.log(error);
            setIsLoading(false);
        }
    }

  return (
    <div className='w-[80%] sm:w-[60%]b md:w-[40%] lg:w-[30%] mx-auto p-[20px] bg-gray-100 shadow-lg rounded-lg mt-[2.3rem] max-sm:h-[370px]'>
        <h2 className='text-[1.5rem] font-bold text-orange-600 mb-4'>Sign Up</h2>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                    focus:ring-orange-600'
                />
                {errors && errors.email && (
                    <span className='text-red-600 text-sm font-semibold mt-1 lowercase'>{errors.email}</span>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-[10px] mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 
                    focus:ring-orange-600 mb-[.9rem]'
                />
                {errors && errors.password && (
                    <span className='text-red-600 text-sm font-semibold mt-1 lowercase'> {errors.password} </span>
                )}
            </div>
            <div>
                <SubmitButton isLoading={isLoading} />
            </div>
        </form>
    </div>
  )
}

export default SignupForm