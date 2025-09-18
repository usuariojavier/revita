
//  src/context/AuthContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("Auth State Changed:", user ? user.email : "No user");
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const isAuthenticated = !!currentUser;
  const isEmailVerified = currentUser?.emailVerified || false;

  const value = {
    currentUser,
    isAuthenticated,
    isEmailVerified,
    logout,
    loading,
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "24px"
      }}>
        Cargando autenticación...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
