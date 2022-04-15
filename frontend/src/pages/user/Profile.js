import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {GetUser, UserRole, usersRoute} from "../../services/UserService";
import UserEditModal from "./modal/UserEditModal";
import CreateEditTeamModal from "../team/modal/CreateEditTeamModal";
import {ChangeTeamMemberStatus, GetTeamsByMemberUsername, TeamMemberStatus} from "../../services/TeamService";
import {FileType, GetLastFilePath, UploadFile} from "../../services/FileService";
import ProfileInfoGrid from "../../components/grids/ProfileInfoGrid";
import ProfileTeamsGrid from "../../components/grids/ProfileTeamsGrid";
import ProfileLeftDetailsGrid from "../../components/grids/ProfileLeftDetailsGrid";
import {DeleteLocation, GetLocationByOwnerUsername} from "../../services/LocationService";
import CreateEditLocationModal from "../location/modal/CreateEditLocationModal";
import {useToasts} from "react-toast-notifications";

const User = props => {
    const {addToast} = useToasts();
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [imageUploadedToggle, setImageUploadedToggle] = useState(false);

    const [changeOccurred, setChangeOccurred] = useState(true);

    //teams
    const [myTeam, setMyTeam] = useState(null);
    const [isMemberOfTeam, setIsMemberOfTeam] = useState(false);
    const [joinedTeams, setJoinedTeams] = useState(null);
    const [pendingToAcceptTeams, setPendingToAcceptTeams] = useState(null);
    const [pendingToBeAcceptedInTeam, setPendingToBeAcceptedInTeam] = useState(null);
    const [toggleTeams, setToggleTeams] = useState(false);

    //location
    const [myLocation, setMyLocation] = useState(null);
    const [locationDeleted, setLocationDeleted] = useState(false);

    //modals
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);

    useEffect(() => {
        GetUser(props.username)
            .then(res => {
                const userData = res.data;
                setProfileImage(GetLastFilePath(userData.files));
                setUser(userData);
            })
    }, [props.username, showUpdateModal, showTeamModal, showLocationModal, imageUploadedToggle])

    useEffect(() => {
        if (user && changeOccurred) {
            user.role === UserRole.User ?
                GetTeamsByMemberUsername(user.username).then(r => {
                    setChangeOccurred(false);
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

                    setPendingToBeAcceptedInTeam(teamsData
                        .filter(team => team?.teamMembers
                            .find(teamMember => !teamMember.isTeamLead
                                && teamMember.memberStatus === TeamMemberStatus.PendingToBeAcceptedInTeam
                                && teamMember.user.username === user.username)))

                })
                : GetLocationByOwnerUsername(user.username).then(r => {
                    setChangeOccurred(false);
                    setMyLocation(r.data);
                });
        }
    }, [user, locationDeleted, changeOccurred])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);

        UploadFile(usersRoute, user.username, formData, FileType.Profile)
            .then(() => setImageUploadedToggle(!imageUploadedToggle))
    }

    const handleOnCloseTeamModal = (isTeamDeleted) => {
        setShowTeamModal(false);
        isTeamDeleted && !isMemberOfTeam && setToggleTeams(!toggleTeams);
    }

    const handleDeleteLocation = () => {
        DeleteLocation(myLocation.id)
            .then(() => {
                addToast("Succesfully deleted your location", {appearance: "success"});
                setLocationDeleted(true);
                setChangeOccurred(true);
            });
    }

    const AcceptTeamInvitation = team => event => {
        event.preventDefault();

        ChangeTeamMemberStatus(user.username, team.id, TeamMemberStatus.Accepted)
            .then(() => {
                addToast("You have succesfully joined the team", {appearance: "success"})
                setChangeOccurred(true);
            })
    }

    const RejectTeamInvitation = team => event => {
        event.preventDefault();

        ChangeTeamMemberStatus(user.username, team.id, TeamMemberStatus.Rejected)
            .then(() => {
                addToast("You have rejected the team invitation", {appearance: "success"})
                setChangeOccurred(true);
            })
    }

    return (user &&
        <Grid container>
            <ProfileLeftDetailsGrid profileImage={profileImage} user={user} isMemberOfTeam={isMemberOfTeam}
                                    isTeamLeader={myTeam ?? false}
                                    ownedLocation={myLocation}
                                    showLocationModal={() => setShowLocationModal(true)}
                                    showTeamModal={() => setShowTeamModal(true)} toggleTeams={toggleTeams}
                                    toggleTeamsView={() => setToggleTeams(!toggleTeams)} onFileUpload={onFileUpload}
                                    onLocationDelete={handleDeleteLocation}/>
            {!toggleTeams ?
                <ProfileInfoGrid user={user}
                                 showUpdateInfoModal={() => setShowUpdateModal(true)}/> :
                <ProfileTeamsGrid user={user} myTeam={myTeam}
                                  acceptPendingTeamInvitation={AcceptTeamInvitation}
                                  rejectPendingTeamInvitation={RejectTeamInvitation}
                                  joinedTeams={joinedTeams}
                                  pendingToAcceptTeams={pendingToAcceptTeams}
                                  pendingToBeAcceptedInTeam={pendingToBeAcceptedInTeam}
                                  showTeamModal={() => setShowTeamModal(true)}/>
            }

            {showUpdateModal && <UserEditModal profile={user} open={showUpdateModal}
                                               onClose={() => setShowUpdateModal(false)}/>}
            {showTeamModal && <CreateEditTeamModal team={myTeam} open={showTeamModal}
                                                   onClose={(isTeamDeleted) => {
                                                       handleOnCloseTeamModal(isTeamDeleted);
                                                       setChangeOccurred(true);
                                                   }}/>}
            {showLocationModal &&
                <CreateEditLocationModal location={myLocation} open={showLocationModal}
                                         onClose={() => {
                                             setShowLocationModal(false);
                                             setChangeOccurred(true);
                                         }}/>}
        </Grid>
    )
}

export default User;
