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

const GetAllTeamMembersInTeam = (team) => {
    return team.teamMembers.filter(teamMember => !teamMember.isTeamLead && teamMember.memberStatus === TeamMemberStatus.Accepted);
}

const GetAllPendingToAcceptTeamInvitationTeamMembers = (team) => {
    return team.teamMembers.filter(teamMember => !teamMember.isTeamLead && teamMember.memberStatus === TeamMemberStatus.PendingToAcceptTeamInvitation);
}

const GetAllPendingToBeAcceptedInTeamMembers = (team) => {
    return team.teamMembers.filter(teamMember => !teamMember.isTeamLead && teamMember.memberStatus === TeamMemberStatus.PendingToBeAcceptedInTeam);
}

const CalculateMissingMembers = (team) => {
    if (team) {
        return team?.teamMembers?.filter(teamMember => teamMember.memberStatus === TeamMemberStatus.Accepted);
    }
}

const AddAvatarsForMissingMembers = (team) => {
    if (team) {
        const missingMembers = [];
        let iterator = CalculateMissingMembers(team).length;
        while (iterator < team.size) {
            if (iterator > 6) {
                break;
            }
            missingMembers.push(iterator)
            iterator++;
        }

        return missingMembers;
    }
}

const GetAllTeams = (status = null, search = "") => {
    return axios.get(teamsRoute, {
        params: {status: status, search: search}
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

const GetTeamByTeamLeadUsername = (username) => {
    return axios.get(`${teamsRoute}/leading/${username}`)
}

const ApproveMemberIntoTeam = (request, teamId) => {
    return axios.post(`${teamsRoute}/${teamId}/members/add`, request)
}

const RemoveOrRejectTeamMember = (request, teamId) => {
    return axios.post(`${teamsRoute}/${teamId}/members/remove`, request)
}

const ApplyToJoinIntoTeam = (applicantUsername, teamId) => {
    return axios.post(`${teamsRoute}/${teamId}/members/apply`, applicantUsername)
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
    GetTeamsByMemberUsername,
    GetTeamByTeamLeadUsername,
    CalculateMissingMembers,
    GetAllTeamMembersInTeam,
    GetAllPendingToBeAcceptedInTeamMembers,
    GetAllPendingToAcceptTeamInvitationTeamMembers,
    AddAvatarsForMissingMembers,
    ApproveMemberIntoTeam,
    RemoveOrRejectTeamMember,
    ApplyToJoinIntoTeam
}
