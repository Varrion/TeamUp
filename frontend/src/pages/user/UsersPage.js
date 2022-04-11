import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import { GetAllUsers } from "../../services/UserService";
import { UserRole } from "../../services/UserService";
import {Typography} from "@material-ui/core";
import {useAuthContext} from "../../configurations/AuthContext";

const UsersPage = () => {
    const {loggedUserRole} = useAuthContext();
    const [users, setUsers] = useState(null)

    useEffect(() => {
        GetAllUsers(loggedUserRole)
            .then(res => setUsers(res.data))
    }, [])

    return (
        <div>
            <Typography variant={"h3"} align={"center"}>{loggedUserRole ? loggedUserRole === UserRole.User ? "Sportists" : "Location Owners": "Our Members"}</Typography>
            <SearchBar setUsers = {setUsers}/>
            <UserList users={users}/>
        </div>
    )
}

export default UsersPage;