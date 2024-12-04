import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SignupForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const { login } = useContext(AuthContext);

    const handleSubmit = async(e) => {

        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/sign-up', { //* req.body
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


        } catch (error) {
            setErrors(error.response.data);
        }
    }

  return (
    <div className='w-[40%] m-auto'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email :</label>
                <input 
                    type='email'
                    placeholder='Enter Your Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors && errors.email && (
                    <span className='text-red-600 text-sm font-semibold mt-1 lowercase'>{errors.email}</span>
                )}
            </div>
            <div>
                <label htmlFor="password">Password :</label>
                <input 
                    type='password'
                    placeholder='Enter Your Password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors && errors.password && (
                    <span className='text-red-600 text-sm font-semibold mt-1 lowercase'> {errors.password} </span>
                )}
            </div>
            <div>
                <input type="submit" value="Signup" />
            </div>
        </form>
    </div>
  )
}

export default SignupForm