import React from 'react';
import { Route, Navigate,Routes } from 'react-router-dom';



import { loadUser } from '../../actions/authentification';


function PrivateRoute({children}) {

    const token = localStorage.getItem("auth_token");

    
    if (!token) {
        
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_type");
        return <Navigate to="/login"/>;
    } else {
        return children;
    }
}




export default PrivateRoute;