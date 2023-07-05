import React, { useState, createContext } from "react";
// import { loginRequest } from "./authentication.service";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.toString());
        setIsLoading(false);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);

    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        // Signed in
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((e) => {
        console.log("Logout error: " + e);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
