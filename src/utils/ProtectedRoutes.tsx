import axios from "axios";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { API_IP } from "../assets/constant";

const ProtectedRoutes: React.FC = () => {
    var user = true;

    let data = {
        "username": "Name",
        "password": "password"
    }

    axios.post(API_IP + '/login', data)
        .then(res => {
            console.log('res', res)
            user = res.data.success

        })

        .catch(err => {
            console.warn('err', err)
        })

    console.log('state: ', user)
    
    return user ? <Outlet /> : <Navigate to="/login" />
}


export default ProtectedRoutes;