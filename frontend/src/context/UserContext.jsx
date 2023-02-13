import React, { useState, useEffect } from 'react'
import UserService from '../services/UserService';
import JwtService from '../services/JwtService';
import { useUser } from '../hooks/useUser';

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : false);
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { refreshToken } = useUser();


    useEffect(() => {
        if (token) {
            const interval = setInterval(() => {
                if (sessionStorage.getItem("time")) {
                    sessionStorage.setItem("time", Number(sessionStorage.getItem("time")) + Number(1))
                    if (sessionStorage.getItem("time") >= 10) {
                        refreshToken();
                    }
                } else {
                    sessionStorage.setItem("time", Number(1))
                }
            }, 60000);

            UserService.GetUser()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUser(data.user);
                        setIsAuth(true);
                        setIsAdmin(data.user.types === 'admin');
                    }
                })
                .catch(e => console.error(e));

            return () => clearInterval(interval);
        }
    }, [token]);

    return <Context.Provider value={{ token, setToken, user, setUser, isAuth, setIsAuth, isAdmin, setIsAdmin }}>
        {children}
    </Context.Provider>
}

export default Context