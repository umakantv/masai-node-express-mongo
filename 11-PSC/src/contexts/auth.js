import React, { useEffect, useState } from 'react'
import {getLoggedInUser, loginApi} from '../api/user';
import { toast } from 'react-toastify';

const AuthContext = React.createContext({
    user: null,
    setUser: (user) => {},
    showLoginForm: false,
    setShowLoginForm: (show) => {},
    login: (email, password) => {},
    logout: () => {},
})

export function AuthContextProvider({children}) {

    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;