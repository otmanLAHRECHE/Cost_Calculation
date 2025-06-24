import React from 'react';
import { Route, Navigate,Routes } from 'react-router-dom';



import { loadUser } from '../../actions/authentification';


function PrivateRouteADMIN({children}) {

    const type = localStorage.getItem("user_type");

    
    if (type == "ADMIN") { 
        return children;
    } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_type");
        return <Navigate to="/login"/>;
    }
}




export default PrivateRouteADMIN;