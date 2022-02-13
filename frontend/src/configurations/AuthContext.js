import {createContext, useContext, useEffect, useState} from 'react'
import {navigate} from "@reach/router";

const AuthContext = createContext(null);

const AuthProvider = props => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        let credentials = sessionStorage.getItem("authData");
        if (credentials) {
            let username = atob(credentials.split(" ")[1]).split(":")[0].trim();

            login(username);
        }
    }, [])

    const login = (username) => {
        setLoggedUser(username);
    }

    const logout = () => {
        sessionStorage.removeItem("authData");
        navigate("/").then(() => {
            alert("You have been logged out");
        });
        setLoggedUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                loggedUser: loggedUser,
                login: login,
                logout: logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

const AuthConsumer = AuthContext.Consumer

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('authContext must be used within a AuthProvider')
    }
    return context
}

export {AuthProvider, useAuthContext, AuthConsumer}
