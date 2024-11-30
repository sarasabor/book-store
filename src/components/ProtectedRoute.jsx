import React from 'react';
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const token = Cookies.get('jwt');
    console.log(token);
    if(!token) {
        return <Navigate to='/login' />;
    }

    return <Outlet /> //* if the token exists allow access to the route 
}

export default ProtectedRoute