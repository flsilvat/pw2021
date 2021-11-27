import React, { useState, useEffect, useMemo, useCallback } from "react";
import services from './../services/services';

const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(undefined);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const verifyTokenAsync = async () => {
            const tokenLS = localStorage.getItem('token');
            
            if(tokenLS){
                const { username, role } = await services.verifyToken(tokenLS);
                if (username && role) {
                    setUser({ username, role });
                    setTokenAll(tokenLS);
                }
            }
        }
        verifyTokenAsync();
    }, [token])


    const setTokenAll = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    }


    const login = useCallback( (username, password) => {
        const loginAsync = async () => {

            const response = await services.login(username, password);
            if(response.status === 200){
                setTokenAll(response.data.token);
                return response.status;
            }
            else{
                return response.status; 
            }
        };
        return loginAsync();
    }, [])

    const logout = useCallback(() => {
        setUser(undefined);
        setTokenAll(undefined);
    }, [])

    const value = useMemo(()=> ({
        token: token,
        user: user,
        login: login,
        logout: logout,
    }), [token, user, login, logout]);

    return <UserContext.Provider value={value} {...props} />;
}

export const useUserContext = () => {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext() must be inside of UserProvider");
    }

    return context;
}