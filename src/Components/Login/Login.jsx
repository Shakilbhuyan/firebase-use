import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.init';

const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const logInUser = result.user;
                console.log(logInUser);
                setUser(logInUser);
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null)
                console.log(result)
            })
            .catch(error => {
                console.log('error')
            })
    }
    return (
        <div>
            {user ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleGoogleSignIn}>Google Login</button>
            }
            {user && <div>
                <h3>User : {user.displayName}</h3>
                <h4>Email : {user.email}</h4>
                <img src={user.photoURl}alt="" />
            </div>
            }
        </div>
    );
};

export default Login;