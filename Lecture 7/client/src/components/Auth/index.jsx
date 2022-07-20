import React from 'react';
import GoogleAuth from './googleAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthContext = React.createContext({
    user: null,
    setUser: () => {}
})

export default AuthContext;

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null)

    console.log(user)

    return (
        <AuthContext.Provider value={{
            user,
            setUser
        }}>
            <GoogleOAuthProvider clientId="">
                {children}
            </GoogleOAuthProvider>
        </AuthContext.Provider>
    )
}