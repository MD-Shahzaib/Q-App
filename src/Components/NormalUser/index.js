import './user.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { query, collection, onSnapshot, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '../Config/Firebase';


function NormalUser() {

    // Navigation.
    const navigate = useNavigate()
    const auth = getAuth();

    // States.
    const [currentUser, setCurrentUser] = useState('')
    const [data, setData] = useState([])

    // __________________________________________________________________________.

    // Initialy-call-data.
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user.displayName)
            console.log('user ===> ', user);
        });
    }, [])

    // logout function.
    const logOut = async () => {
        try {
            const user = auth.currentUser;
            await signOut(auth)
            console.log('signout success')
        } catch (error) {
            console.log(error.message)
        }
    }

    // logout function.
    const logIn = async () => {
        navigate('/login')
    }

    // Get-All-Company.
    useEffect(() => {
        const q = query(collection(db, "Company"));
        const companies = onSnapshot(q, (snapshot) => {
            setData([]);
            snapshot.docs.forEach((doc) => {
                setData((prev) => [...prev, { id: doc.id, data: doc.data() }]);
            });
        });
        return () => {
            companies();
        };
    }, []);

    /* Updation-of-BuyToken-into-2-functions-start.*/
    // 1-buyToken-to-updateSoldToken. 
    const buyToken = (...detail) => {
        const [item_id, allToken, tokenSold] = detail
        console.log('item_id :', item_id, ' allToken :', allToken, ' tokenSold :', tokenSold)
        if (allToken <= tokenSold) {
            alert("All Tokens sold for today")
        } else {
            updateSoldToken(item_id);
        }
    }
    // 2-updateSoldToken-to-update-firebase. 
    const updateSoldToken = (item_id) => {
        updateDoc(doc(db, "Company", item_id), { tokenSold: increment(1) })
    }
    /* Updation-of-BuyToken-into-2-functions-end.*/

    // __________________________________________________________________________

    return (
        <>
            <div className="user-box">

                {/*  Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-3 fw-bold" to="/">Q-APP</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            {/* user detail */}
                            <div className="center">
                                <span className="px-2 py-2 fw-bold text-white">{currentUser ? `${currentUser}` : "Login please"}</span>
                                <span className="mx-2 fw-bold">{currentUser ? <button className="btn btn-primary fw-bold" onClick={logOut}>Sign Out</button> : <button className="btn btn-primary fw-bold" onClick={logIn}>Log In</button>}</span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* <!-- Main body --> */}
                <div className="all-flex py-4 px-4">
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="card px-2 py-2 mx-2 my-2">
                                <div className="card-body flexbtw border-bottom">
                                    <span className="fs-3">Company{index + 1} : <b>{item.data.companyName}</b></span>
                                    {/*----------- bootstrap collapse start---------------*/}
                                    <button className="fs-5 btn btn-primary mx-1" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${index}`} aria-expanded="false" aria-controls={`collapseExample${index}`}>Details</button>
                                </div>
                                <div className="collapse" id={`collapseExample${index}`}>
                                    <div className="card-body flex-wrap-btw rounded">
                                        <span className="fs-5 mb-2">Company Name : <b>{item.data.companyName}</b></span>
                                        <span className="fs-5 mb-2">Company Since : <b>{item.data.companySince}</b></span>
                                        <span className="fs-5 mb-2">Company Address : <b>{item.data.companyAddress}</b></span>
                                    </div>
                                </div>
                                {/*----------- bootstrap collapse end---------------*/}
                                <div className="card-body flexbtw">
                                    <span className="fs-5">Opening : <b>{item.data.openTime} AM</b></span>
                                    <span className="fs-5">Closing : <b>{item.data.closeTime} PM</b></span>
                                    <span className="fs-5">All Tokens : <b>{item.data.allToken}</b></span>
                                    <span className="fs-5">Sold Tokens : <b>{item.data.tokenSold}</b></span>
                                </div>
                                <button className="fs-4 btn btn-sm btn-primary" onClick={() => { buyToken(item.id, item.data.allToken, item.data.tokenSold) }}>BUY TOKEN</button>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default NormalUser;