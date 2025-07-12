import React from 'react';
import AuthContext from './AuthContext';
import { useState,useEffect } from 'react';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';


const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true);

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);  
    }
    
    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    } 

    useEffect (()=>{
        const unSubscribe = onAuthStateChanged(auth,CurrentUser => {
                setUser(CurrentUser);
                if(CurrentUser?.email){
                    const user = { email: CurrentUser.email};
                    axios.post('https://blog-website-server-liard.vercel.app/jwt', user,{ withCredentials: true })
                        .then(res=>{
                            setLoading(false)
                            console.log(res.data)
                        })
                }
                else {
                    axios.post('https://blog-website-server-liard.vercel.app/logout',{}, { withCredentials: true })
                        .then(res=>{
                            console.log(res.data)
                            setLoading(false)
                        })
                }
                
            });
            return unSubscribe;
    },[]);
    

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


