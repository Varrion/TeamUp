import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import { GetAllUsers } from "../../services/UserService";
import { UserRole } from "../../services/UserService";

const UsersPage = (props) => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        GetAllUsers(UserRole.User)
            .then(res => setUsers(res.data))
    }, [])

    return (
        <div>
            <SearchBar setUsers = {setUsers}/>
            <UserList users={users}/>
        </div>
    )
}

export default UsersPage;