import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {GetUser, usersRoute} from "../../services/UserService";
import UserEditModal from "./modal/UserEditModal";
import {useAuthContext} from "../../components/AuthContext";
import CreateEditTeamModal from "../team/modal/CreateEditTeamModal";
import {GetTeamsByMemberUsername, TeamMemberStatus} from "../../services/TeamService";
import {FileType, UploadFile} from "../../services/FileService";
import ProfileInfoGrid from "../../components/grids/ProfileInfoGrid";
import ProfileTeamsGrid from "../../components/grids/ProfileTeamsGrid";
import ProfileLeftDetailsGrid from "../../components/grids/ProfileLeftDetailsGrid";

const User = props => {
    const {loggedUser} = useAuthContext();
    const [user, setUser] = useState(null);
    const [isMemberOfTeam, setIsMemberOfTeam] = useState(false);

    const [myTeam, setMyTeam] = useState(null);
    const [joinedTeams, setJoinedTeams] = useState(null);
    const [pendingToAcceptTeams, setPendingToAcceptTeams] = useState(null);
    const [toggleTeams, setToggleTeams] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [showTeamModal, setShowTeamModal] = useState(false);

    useEffect(() => {
        GetUser(props.username)
            .then(res => {
                const userData = res.data;
                setProfileImage(userData.files && userData.files.length > 0 && userData.files.find(file => file.fileType === FileType.Profile)
                    && userData.files.filter(file => file.fileType === FileType.Profile).splice(-1)[0]);
                setUser(userData);
            })
            .then(() => {
                GetTeamsByMemberUsername(props.username).then(r => {
                    const teamsData = r.data;
                    console.log('asdasadsada', teamsData);
                    setIsMemberOfTeam(!!teamsData.length);

                    setMyTeam(teamsData
                        .find(teams => teams.teamMembers
                            .find(teamMember => teamMember.isTeamLead
                                && teamMember.user.username === props.username)));
                    setJoinedTeams(teamsData
                        .filter(team => team.teamMembers
                            .find(teamMember => !teamMember.isTeamLead
                                && teamMember.memberStatus === TeamMemberStatus.Accepted
                                && teamMember.user.username === props.username)));
                    setPendingToAcceptTeams(teamsData
                        .filter(team => team?.teamMembers
                            .find(teamMember => !teamMember.isTeamLead
                                && teamMember.memberStatus === TeamMemberStatus.PendingToAcceptTeamInvitation
                                && teamMember.user.username === props.username)))
                })
            })
    }, [showUpdateModal, showTeamModal])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(usersRoute, user.username, formData, FileType.Profile)
            .then(r => console.log('vlagam tuka'))
    }

    const handleOnCloseTeamModal = (isTeamDeleted) => {
        setShowTeamModal(false);
        isTeamDeleted && !isMemberOfTeam && setToggleTeams(!toggleTeams);
    }

    return (user &&
        <Grid container>
            <ProfileLeftDetailsGrid profileImage={profileImage} user={user} isMemberOfTeam={isMemberOfTeam}
                                    showTeamModal={() => setShowTeamModal(true)} toggleTeams={toggleTeams}
                                    toggleTeamsView={() => setToggleTeams(!toggleTeams)} onFileUpload={onFileUpload}/>
            {!toggleTeams ?
                <ProfileInfoGrid user={user} loggedUser={loggedUser}
                                 showUpdateInfoModal={() => setShowUpdateModal(true)}/> :
                <ProfileTeamsGrid user={user} loggedUser={loggedUser} myTeam={myTeam} joinedTeams={joinedTeams}
                                  pendingToAcceptTeams={pendingToAcceptTeams}
                                  showTeamModal={() => setShowTeamModal(true)}/>
            }

            {showUpdateModal && <UserEditModal profile={user} open={showUpdateModal}
                                               onClose={() => setShowUpdateModal(false)}/>}
            {showTeamModal && <CreateEditTeamModal team={myTeam} open={showTeamModal}
                                                   onClose={(isTeamDeleted) => handleOnCloseTeamModal(isTeamDeleted)}/>}

        </Grid>
    )
}

export default User;
