import React from 'react';
import { googleProvider} from "./config/firebase";
import { signInWithPopup, signOut} from"firebase/auth";

const SignIn = () => {

    /*
    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth,googleProvider);
        }
        catch (err){
            console.log(err);
        }
    }

    const signOutMethod = async () => {
        try{
            await signOut(auth);
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with google</button>
            <button onClick={signOutMethod}>Sign Out</button>
        </div>
    );*/
};

export default SignIn;