import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../api/user';

const AuthContext = React.createContext({
    user: null,
    setUser: () => {},
    showUserModal: false, 
    setShowUserModal: () => {},
})

export default AuthContext;

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null)
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {

        userApi.ping()

        userApi.getLoggedInUser().then(user => {
            if (user) {
                notification.info({
                    message: "You are logged in."
                })
                console.log(user);
                setUser(user.data)
            }
        }).catch(() => {
            setShowUserModal(true)
        })
    }, [])

    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            showUserModal,
            setShowUserModal,
        }}>
            {children}
        </AuthContext.Provider>
    )
}