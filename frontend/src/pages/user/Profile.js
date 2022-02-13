import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {GetUser, UserRole, usersRoute} from "../../services/UserService";
import UserEditModal from "./modal/UserEditModal";
import {useAuthContext} from "../../configurations/AuthContext";
import CreateEditTeamModal from "../team/modal/CreateEditTeamModal";
import {GetTeamsByMemberUsername, TeamMemberStatus} from "../../services/TeamService";
import {FileType, UploadFile} from "../../services/FileService";
import ProfileInfoGrid from "../../components/grids/ProfileInfoGrid";
import ProfileTeamsGrid from "../../components/grids/ProfileTeamsGrid";
import ProfileLeftDetailsGrid from "../../components/grids/ProfileLeftDetailsGrid";
import {GetLocationByOwnerUsername} from "../../services/LocationService";
import CreateEditLocationModal from "../location/modal/CreateEditLocationModal";

const User = props => {
    const {loggedUser} = useAuthContext();
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    //teams
    const [myTeam, setMyTeam] = useState(null);
    const [isMemberOfTeam, setIsMemberOfTeam] = useState(false);
    const [joinedTeams, setJoinedTeams] = useState(null);
    const [pendingToAcceptTeams, setPendingToAcceptTeams] = useState(null);
    const [toggleTeams, setToggleTeams] = useState(false);

    //location
    const [myLocation, setMyLocation] = useState(null);

    //modals
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);

    useEffect(() => {
        GetUser(props.username)
            .then(res => {
                const userData = res.data;
                setProfileImage(userData.files && userData.files.length > 0 && userData.files.find(file => file.fileType === FileType.Profile)
                    && userData.files.filter(file => file.fileType === FileType.Profile).splice(-1)[0]);
                setUser(userData);
            })
    }, [props.username, showUpdateModal])

    useEffect(() => {
        if (user) {
            user.role === UserRole.User ?
                GetTeamsByMemberUsername(user.username).then(r => {
                    const teamsData = r.data;
                    setIsMemberOfTeam(!!teamsData.length);

                    setMyTeam(teamsData
                        .find(teams => teams.teamMembers
                            .find(teamMember => teamMember.isTeamLead
                                && teamMember.user.username === user.username)));
                    setJoinedTeams(teamsData
                        .filter(team => team.teamMembers
                            .find(teamMember => !teamMember.isTeamLead
                                && teamMember.memberStatus === TeamMemberStatus.Accepted
                                && teamMember.user.username === user.username)));
                    setPendingToAcceptTeams(teamsData
                        .filter(team => team?.teamMembers
                            .find(teamMember => !teamMember.isTeamLead
                                && teamMember.memberStatus === TeamMemberStatus.PendingToAcceptTeamInvitation
                                && teamMember.user.username === user.username)))
                })
                : GetLocationByOwnerUsername(user.username).then(r => {
                    setMyLocation(r.data);
                });
        }
    }, [user, showTeamModal, showLocationModal])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(usersRoute, user.username, formData, FileType.Profile)
            .then(() => console.log('vlagam tuka'))
    }

    const handleOnCloseTeamModal = (isTeamDeleted) => {
        setShowTeamModal(false);
        isTeamDeleted && !isMemberOfTeam && setToggleTeams(!toggleTeams);
    }

    return (user &&
        <Grid container>
            <ProfileLeftDetailsGrid profileImage={profileImage} user={user} isMemberOfTeam={isMemberOfTeam}
                                    isLocationOwner={myLocation}
                                    showLocationModal={() => setShowLocationModal(true)}
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
            {showLocationModal &&
                <CreateEditLocationModal location={myLocation} open={showLocationModal}
                                         onClose={() => setShowLocationModal(false)}/>}

        </Grid>
    )
}

export default User;
