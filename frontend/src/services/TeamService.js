import axios from "axios";

const defaultPath = "/teams";

const TeamStatus = {
    Active: 'Active',
    LookingForMore: 'LookingForMore',
    Full: 'Full'
}

const GetAllTeams = (status = null) => {
    return axios.get(defaultPath, {
        params: {status: status}
    });
}

const GetOneTeam = (teamId) => {
    return axios.get(`${defaultPath}//${teamId}`);
}

const CreateTeam = (teamForm) => {
    return axios.post(`${defaultPath}`, teamForm);
}

const EditTeam = (teamId, teamForm) => {
    return axios.put(`${defaultPath}/${teamId}`, teamForm);
}

const UpdateTeamStatus = (teamId, teamStatus) => {
    return axios.patch(`${defaultPath}/${teamId}`, teamStatus)
}

const DeleteTeam = (teamId) => {
    return axios.delete(`${defaultPath}/${teamId}`);
}


export {TeamStatus, GetAllTeams, GetOneTeam, CreateTeam, DeleteTeam, EditTeam, UpdateTeamStatus}
