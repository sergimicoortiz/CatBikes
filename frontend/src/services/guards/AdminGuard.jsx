import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import UserService from '../UserService'

function AdminGuard() {
    const { isAdmin } = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();

    if (location['pathname'].split('/')[1]) {
        if (location['pathname'].split('/')[2]) {
            const path_tmp = location['pathname'].split('/')[2];
            sessionStorage.setItem("path", path_tmp)
        }
    }

    if (!isAdmin) {
        UserService.GetUser()
            .then(({ data, status }) => {
                if (status == 200) {
                    if (data.user.types == "admin") {
                        setTimeout(() => {
                            if (sessionStorage.getItem("path") == null) {
                                navigate("/dashboard")
                            }else{
                                navigate("/dashboard/" + sessionStorage.getItem("path"))
                            }
                        }, 500);
                    }
                }
            })
    }

    return isAdmin ? <Outlet /> : <Navigate to="/home" />
}

export default AdminGuard;