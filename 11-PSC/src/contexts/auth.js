import React, { useEffect, useState } from "react";
import { getLoggedInUser, loginApi } from "../api/user";
import { toast } from "react-toastify";

const AuthContext = React.createContext({
  user: null,
  setUser: (user) => {},
  showLoginForm: false,
  setShowLoginForm: (show) => {},
  login: (email, password) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const login = (email, password) => {
    loginApi(email, password)
      .then((response) => {

        let { token } = response.data.data;
        localStorage.setItem("auth-token", token);
        setShowLoginForm(false);
        toast("Logged in successfully", { type: "success" });
      })
      .catch((err) => {
        console.error(err);

        toast(err?.response?.data?.message || "Something went wrong", {
          type: "error",
        });
      });
  }

	const logout = () => {
		localStorage.removeItem("auth-token")
		setUser(null)
	}

  useEffect(() => {
		let authToken = localStorage.getItem("auth-token")

		if (authToken) {
			getLoggedInUser()
      .then((response) => {
        let user = response.data.data;
        setUser(user);
      })
		}

	}, [showLoginForm]);

  return (
    <AuthContext.Provider
      value={{
        showLoginForm,
        setShowLoginForm,
        user, setUser, login, logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
