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
      setUserCreationTime(currentUser.metadata.createdAt);
    });
    return () => {
      unSubscribe();
    };
  });

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
