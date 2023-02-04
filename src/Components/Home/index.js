import './home.css'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut, /*deleteUser*/ } from "firebase/auth";

function Home() {

    // Navigation.
    const navigate = useNavigate()
    const auth = getAuth();
    // states.
    const [currentUser, setCurrentUser] = useState('')

    // AuthStateChanged function.
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user ===> ', user);
            setCurrentUser(user.displayName)
        });
    }, [])

    // logout function.
    const logOut = async () => {
        try {
            const user = auth.currentUser;
            await signOut(auth)
            // await deleteUser(user)
            console.log('signout success', 'User deleted')
        } catch (error) {
            console.log(error.message)
        }
    }

    // logout function.
    const logIn = async () => {
        navigate('/login')
    }

    // Company function.
    const company = () => {
        navigate('/company')
    }

    // normalUser function
    const normalUser = () => {
        navigate('/normalUser')
    }

    return (
        <>
            <div className="main-box">
                {/* <!-- Navbar --> */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-3 fw-bold" to="/">Q-APP</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            <div className="center">
                                <span className="px-2 py-2 fw-bold text-white">{currentUser ? `${currentUser}` : "Login please"}</span>
                                <span className="mx-2 fw-bold">{currentUser ? <button className="btn btn-primary fw-bold" onClick={logOut}>Sign Out</button> : <button className="btn btn-primary fw-bold" onClick={logIn}>Log In</button>}</span>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* <!-- Main --> */}
                <div className="center px-4 py-2">
                    <button onClick={company} className="size3 mx-2 my-4 btn">
                        <p className="size1">Company</p>
                        <p className="size2">Are you a company?</p>
                    </button>
                    <button onClick={normalUser} className="size3 mx-2 my-4 btn">
                        <p className="size1">Normal User</p>
                        <p className="size2">Are you finding/waiting for tokens?</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;