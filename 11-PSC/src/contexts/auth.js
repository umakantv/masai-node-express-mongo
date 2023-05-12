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

    const [showLoginForm, setShowLoginForm] = useState(false);

    return <AuthContext.Provider value={{
        showLoginForm, setShowLoginForm,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;