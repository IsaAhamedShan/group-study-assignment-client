import React, { createContext } from "react";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth} from "../firebase/firebase.config.js";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [userTotalSubmissionCount, setUserTotalSubmissionCount] =
    useState('');
  const [userCreationTime, setUserCreationTime] = useState('');
  const [loading,setLoading] = useState(true)
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false)
      setUserCreationTime(currentUser.metadata.createdAt);
    });
    return () => {
      unSubscribe();
    };
  });
  if (loading) {
    // Render loading indicator or placeholder while checking authentication state
    return <div className="text-5xl flex justify-center items-center h-[90vh]">
    <span className="loading loading-infinity w-[400px] h-[250px]"></span>
  </div>
  
  }

  const authInfo = {
    user,
    auth,
    register,
    googleSignIn,
    logOut,
    logIn,
    userCreationTime,
    userTotalSubmissionCount,
    setUserTotalSubmissionCount,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
