import {createContext, useContext, useEffect, useState} from 'react'
import {navigate} from "@reach/router";
import {useToasts} from "react-toast-notifications";
import {UserRole} from "../services/UserService";

const AuthContext = createContext(null);

const AuthProvider = props => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserRole, setLoggedUserRole] = useState(null);
    const [leadingTeamId, setLeadingTeamId] = useState(null);
    const {addToast} = useToasts();

    useEffect(() => {
        let authData = JSON.parse(sessionStorage.getItem("authData"));
        if (authData) {
            let username = atob(authData.userCredential.split(" ")[1]).split(":")[0].trim();
            let role = authData.userRole;
            let leadingTeamId = authData.leadingTeamId;
            login(username, role, leadingTeamId);
        }
    }, [])

    const login = (username, role, leadingTeamId) => {
        setLoggedUser(username);
        setLoggedUserRole(role);

        role === UserRole.User && setLeadingTeamId(leadingTeamId)
    }

    const logout = () => {
        sessionStorage.removeItem("authData");
        navigate("/").then(() => {
            addToast("You have been logged out", {appearance: 'success'});
        });

        setLoggedUser(null);
        setLoggedUserRole(null);
        setLeadingTeamId(null);
    }

    const isAuthorized = (username) => {
        return username === loggedUser;
    }

    return (
        <AuthContext.Provider
            value={{
                loggedUser: loggedUser,
                loggedUserRole: loggedUserRole,
                leadingTeamId: leadingTeamId,
                login: login,
                logout: logout,
                isAuthorized: isAuthorized
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
