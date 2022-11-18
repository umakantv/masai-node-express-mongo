
import React, { useEffect, useState } from 'react'
import { getLoggedInUser, loginApi } from '../api/user';

const AuthContext = React.createContext({
    user: null,
    login: (email, passowrd) => {},
    logout: () => {},
    setShowLoginForm: () => {},
    showLoginForm: false
})

export function AuthContextProvider({children}) {

    const [user, setUser] = useState(null)
    const [showLoginForm, setShowLoginForm] = useState(false);

    const login = (email, password) => {
        console.log(email, password)

        loginApi(email, password)
        .then(response => {
            const token = response.data.data.token

            localStorage.setItem('auth-token', token);

            setShowLoginForm(false);
        })
        .catch(err => {
            const message = err.response.data.message;

            alert(message)
        })
    }

    const logout = () => {
        localStorage.removeItem('auth-token')
        setShowLoginForm(true)
    }

    useEffect(() => {
        const token = localStorage.getItem('auth-token')

        getLoggedInUser(token)
        .then(response => {
            const user = response.data.data;
            setUser(user);
        })
        .catch(() => {
            setUser(null)
        })

    }, [showLoginForm])

    return (
        <AuthContext.Provider value={{
            user,
            showLoginForm,
            setShowLoginForm,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;