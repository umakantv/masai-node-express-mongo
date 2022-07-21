import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    user: null,
    setUser: () => {},
    showUserModal: false, 
    setShowUserModal: () => {},
})

export default AuthContext;

async function getLoggedInUser() {

    const token = localStorage.getItem("token")

    if (token) {
        const response = await fetch(
          `http://localhost:3001/users/getLoggedIn`, {
            headers: {
              'Content-Type': "application/json",
              'token': token
            },
          }
        )
      
        const result = await response.json();
      
        return result.data;
    } 
  }

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null)
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        getLoggedInUser().then(user => {
            notification.info({
                message: "You are logged in."
            })
            setUser(user)
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