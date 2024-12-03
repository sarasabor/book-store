

import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    console.log(user);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider