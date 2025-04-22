import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {

    // var user = null;
    var user = localStorage.getItem('user_id')
    // var user = true

    return user ? <Outlet /> : <Navigate to="/login" />
}


export default ProtectedRoutes;