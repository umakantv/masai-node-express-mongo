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
    const [user, setUser] = useState(null);

    async function login(email, password) {
        loginApi(email, password)
        .then(response => {
            const {data: result} = response;

            const {token, user} = result.data;

            localStorage.setItem('auth-token', token);
            setShowLoginForm(false);
        })
        .catch((err) => toast('Something went wrong', {
            type: 'error'
        }))
    }

    useEffect(() => {
        getLoggedInUser()
        .then(response => {
            const {data: result} = response;

            setUser(result.data);
        })
        .catch(() => {
            console.log('User is probably not logged in')
        })
    }, [showLoginForm])

    function logout() {
        localStorage.removeItem('auth-token')
        setUser(null);
        setShowLoginForm(true);
    }

    return <AuthContext.Provider value={{
        showLoginForm,
        setShowLoginForm,
        login, logout,
        user, setUser
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;