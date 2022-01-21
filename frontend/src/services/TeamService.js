import axios from "axios";

const teamsRoute = "/teams";

const TeamStatus = {
    LookingForMore: 'LookingForMore',
    Full: 'Full',
    Playing: 'Playing',
    Passive: 'Passive'
}

const TeamMemberStatus = {
    PendingToBeAcceptedInTeam: 'PendingToBeAcceptedInTeam',
    PendingToAcceptTeamInvitation: 'PendingToAcceptTeamInvitation',
    Rejected: 'Rejected',
    Accepted: 'Accepted'
}

const GetAllTeams = (status = null) => {
    return axios.get(teamsRoute, {
        params: {status: status}
    });
}

const GetOneTeam = (teamId) => {
    return axios.get(`${teamsRoute}/${teamId}`);
}

const CreateTeam = (teamForm) => {
    return axios.post(`${teamsRoute}`, teamForm);
}

const EditTeam = (teamId, teamForm) => {
    return axios.put(`${teamsRoute}/${teamId}`, teamForm);
}

const UpdateTeamStatus = (teamId, teamStatus) => {
    return axios.patch(`${teamsRoute}/${teamId}`, teamStatus)
}

const DeleteTeam = (teamId) => {
    return axios.delete(`${teamsRoute}/${teamId}`);
}

const GetTeamsByMemberUsername = (username) => {
    return axios.get(`${teamsRoute}/members/${username}`)
}

export {
    teamsRoute,
    TeamStatus,
    TeamMemberStatus,
    GetAllTeams,
    GetOneTeam,
    CreateTeam,
    DeleteTeam,
    EditTeam,
    UpdateTeamStatus,
    GetTeamsByMemberUsername
}
