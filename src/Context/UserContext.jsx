import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"


export const UserContext = createContext();

export function UserProvider({children}) {
    
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

        if(storedUser){
            const check = users.find((ele)=> ele.email === storedUser.email && ele.password === storedUser.password);
            check ? setIsLoggedIn(true) : setIsLoggedIn(false);
            check ? setUser(check) : setUser({});
        }
    }, [])

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setUser({});
        setIsLoggedIn(false);
        sessionStorage.removeItem('user');
    }

    return (
        <UserContext.Provider value={{user, login, logout, isLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}
