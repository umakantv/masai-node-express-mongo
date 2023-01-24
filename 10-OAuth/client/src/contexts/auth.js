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

    const [user, setUser] = useState(null);
    const [showLoginForm, setShowLoginForm] = useState(false);

    function login(email, password) {
        loginApi(email, password)
        .then(response => {
            const {token} = response.data.data;

            localStorage.setItem('auth-token', token);
            setShowLoginForm(false);
        })
        .catch(err => {
            toast('Login failed', {
                type: 'error'
            })
        });
    }

    function logout() {
        localStorage.removeItem('auth-token');
        window.location.reload();
    }

    useEffect(() => {
        getLoggedInUser()
        .then(response => {
            const user = response.data.data;

            setUser(user);
        })
    }, [showLoginForm])

    return <AuthContext.Provider value={{
        user, setUser,
        showLoginForm, setShowLoginForm,
        login, logout,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;