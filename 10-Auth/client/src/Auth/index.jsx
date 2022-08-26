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
        console.log(window.location);
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        console.log(code)

        if (code) {
            userApi.githubSignin({ code })
            .then((data) => {
                console.log(data)
                const {token} = data.data

                localStorage.setItem("token", token);

                window.location.reload();
                // alert("Login successful")
            })
            .catch(err => {
                notification.error(err.message)
            })
        }

    }, [])

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