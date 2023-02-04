// __________________________ PROTECTIVE ROUTING ______________________________.

// /*
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from "../Home";
import Login from "../Login";
import Company from "../Company";
import NormalUser from "../NormalUser";

export default function Router() {
    const auth = getAuth()
    const [user, setUser] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true);
            } else {
                setUser(false)
            }
        });
    }, [])
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={
                    <ProtectedRoute
                        user={user}
                        route={<Home />}
                        navigateTo='/login' />}
                />
                <Route path="/login" element={
                    <ProtectedRoute
                        user={!user}
                        route={<Login />}
                        navigateTo='/' />}
                />
                <Route path="/company" element={
                    <ProtectedRoute
                        user={user}
                        route={<Company />}
                        navigateTo='/login' />}
                />
                <Route path="/normaluser" element={
                    <ProtectedRoute
                        user={user}
                        route={<NormalUser />}
                        navigateTo='/login' />}
                />
            </>
        )
    )
    return <RouterProvider router={router} />
}
function ProtectedRoute({ user, route, navigateTo }) {
    return user ? route : <Navigate to={navigateTo} replace={true} />
}
// */

// __________________________ PROTECTIVE ROUTING ______________________________.


















// __________________________ NORMAL ROUTING ______________________________.
/*
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import Company from "../Company";
import NormalUser from "../NormalUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/company",
        element: <Company />
    },
    {
        path: "/normalUser",
        element: <NormalUser />
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
};
*/
// __________________________ NORMAL ROUTING ______________________________.