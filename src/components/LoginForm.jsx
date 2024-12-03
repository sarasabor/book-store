import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState(null);

    //* DRY : DON'T REPEAT YOURSELF
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            // navigate(data.redirect);
            
        } catch (error) {
            const { data } = error.response;
            setErrors(data);
        }
    }

  return (
    <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email :</label>
                <input 
                    type='email'
                    name='email'
                    placeholder='Enter Your Email'
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors && errors.email && (
                    <span className='text-red-600 text-sm lowercase font-semibold'>{errors.email}</span>
                )}
            </div>
            <div>
                <label htmlFor="password">Password :</label>
                <input 
                    type="password"
                    name='password'
                    placeholder='Enter The Password' 
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors && errors.password && (
                    <span className='text-red-600 text-sm lowercase font-semibold'>{errors.password}</span>
                )}
            </div>
            <div>
                <input type="submit" value='Login'/>
            </div>
        </form>
    </div>
  )
}

export default LoginForm