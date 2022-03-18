import axios from "axios";

const usersRoute = "/users";

const UserRole = {
    User: 'User',
    LocationOwner: 'LocationOwner',
    Admin: 'Admin'
}

const Gender = {
    Male: 'Male',
    Female: 'Female',
    Other: 'Other'
}

const GetAllUsers = (role = null) => {
    return axios.get(usersRoute, {
        params: {userRole: role}
    });
}

const GetUser = (username) => {
    return axios.get(`${usersRoute}/${username}`);
}

const GetTeamMembers = (teamId) => {
    return axios.get(`${usersRoute}/teams/${teamId}/members`);
}

const GetTeamPendingMembers = (teamId) => {
    return axios.get(`${usersRoute}/teams/${teamId}/pending`);
}

const LoginUser = (loginForm) => {
    return axios.post(`${usersRoute}/login`, loginForm)
}

const RegisterUser = (userForm) => {
    return axios.post(`${usersRoute}`, userForm);
}

const EditUser = (userId, userForm) => {
    return axios.put(`${usersRoute}/${userId}`, userForm);
}

const DeleteUser = (userId) => {
    return axios.delete(`${usersRoute}/${userId}`);
}

const BasicAuth = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
}

const SearchUsers = (search, role) => {
    return axios.get(`${usersRoute}`, {
        params: {userRole: role, search: search}
    })
}

export {
    UserRole,
    Gender,
    usersRoute,
    DeleteUser,
    EditUser,
    GetUser,
    GetAllUsers,
    LoginUser,
    RegisterUser,
    GetTeamMembers,
    GetTeamPendingMembers,
    BasicAuth,
    SearchUsers
}
