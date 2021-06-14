import axios from "axios";

const defaultPath = "/users";

const UserRole = {
    User: 'User',
    LocationOwner: 'LocationOwner',
    Admin: 'Admin'
}

const GetAllUsers = (role = null) => {
    return axios.get(defaultPath, {
        params: {role: role}
    });
}

const GetUser = (username) => {
    return axios.get(`${defaultPath}//${username}`);
}

const GetTeamMembers = (teamId) => {
    return axios.get(`${defaultPath}/teams/${teamId}/members`);
}

const GetTeamPendingMembers = (teamId) => {
    return axios.get(`${defaultPath}/teams/${teamId}/pending`);
}

const LoginUser = (loginForm) => {
    return axios.post(`${defaultPath}/login`, loginForm)
}

const RegisterUser = (userForm) => {
    return axios.post(`${defaultPath}`, userForm);
}

const EditUser = (userId, userForm) => {
    return axios.put(`${defaultPath}/${userId}`, userForm);
}

const DeleteUser = (userId) => {
    return axios.delete(`${defaultPath}/${userId}`);
}

export {
    UserRole,
    DeleteUser,
    EditUser,
    GetUser,
    GetAllUsers,
    LoginUser,
    RegisterUser,
    GetTeamMembers,
    GetTeamPendingMembers
}
