import './login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../Config/Firebase'

function Login() {

    // navigation.
    const navigate = useNavigate()

    // States.
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [disable, setDisable] = useState(false)

    // logInWithEmail function.
    const logInWithEmail = async () => {
        try {
            // Creating-Users-------.
            const user = await createUserWithEmailAndPassword(auth, email, password);
            // user-id-------.
            const userId = auth.currentUser.uid;
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            // Add-Users-------.
            const docRef = await setDoc(doc(db, "users", userId), { name, email, password, userId });
            setDisable(true)
            setErrMsg('')
            console.log('user=', user, ' name =', name, ' email=', email, ' password =', password, ' docRef=', docRef.id);
            // navigate-to-home--------.
            navigate('/');
        } catch (error) {
            setErrMsg(error.message)
        }
    }

    // logInWithFacebook function.
    const logInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        provider.addScope('user_birthday');
        provider.setCustomParameters({ 'display': 'popup' });
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // user-data-------.
                const userInfo = result.user;
                // user-id-------.
                const userId = userInfo.uid
                const { displayName, email, photoURL } = userInfo
                // Add-Users-------.
                const docRef = await setDoc(doc(db, "users", userId), { displayName, email, photoURL, userId });
                console.log('userInfo == ', userInfo, 'docRef == ', docRef)
                // navigate-to-home--------.
                navigate('/')
            })
            .catch((error) => {
                setErrMsg(error.message)
            });
    }

    return (
        <>
            <div className="main">
                <div className="sign-in-box py-2 px-2">
                    <p className="fs-1 fw-bold text-decoration-underline">Q-App</p>
                    <p className="fs-4 text-center">Welcome to <span className="fw-bold ">Log in</span> Q-App</p>
                    <div className="d-grid gap-2 col-8 ">
                        <input type="text" className="form-control" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                        <input type="email" className="form-control" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                        <b className="bg-danger text-white text-decoration-underline text-center">{errMsg}</b>
                        <button className="btn sign-in-btn" onClick={logInWithEmail} disabled={disable}>Log in</button>
                        <button className="btn sign-in-fb-btn mb-2" onClick={logInWithFacebook}>
                            <img src="https://www.olx.com.pk/assets/iconFacebookLogin_noinline.70f71af03bbf63ca01a044ff5c5eb342.svg" alt="" />
                            <span className="mx-2">Continue with Facebook</span>
                        </button>
                    </div>
                    <span className="fs2">By continuing, you are accepting</span>
                    <span className="fs2"> <span className="fs1">Q-App Terms of use</span> and <span className="fs1">Privacy Policy</span></span>
                </div>
            </div>
        </>
    )
}

export default Login;