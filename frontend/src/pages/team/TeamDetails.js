import React, {useEffect, useState} from "react";
import {
    ApplyToJoinIntoTeam,
    CalculateMissingMembers,
    GetAllPendingToAcceptTeamInvitationTeamMembers,
    GetAllPendingToBeAcceptedInTeamMembers,
    GetAllTeamMembersInTeam,
    GetOneTeam,
    teamsRoute,
    TeamStatus
} from "../../services/TeamService";
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Tooltip} from "@material-ui/core";
import UploadShowProfilePicture from "../../components/pictures/UploadShowProfilePicture";
import {FileType, GetLastFilePath, UploadFile} from "../../services/FileService";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TeamMemberGrid from "../../components/grids/TeamMemberGrid";
import {useAuthContext} from "../../configurations/AuthContext";
import CreateEditTeamModal from "./modal/CreateEditTeamModal";
import TitleWithButtonGrid from "../../components/grids/TitleWithButtonGrid";
import MissingMember from "../../assets/images/MissingPlayer.png";
import {Link} from "@reach/router";
import SportsCover from "../../assets/images/sports_profile-cover.png";
import TeamLogo from "../../assets/images/TeamupTransparent.png";
import {Sport} from "../../services/PlayingFieldService";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {useToasts} from "react-toast-notifications";


const TeamDetails = ({id}) => {
    const {loggedUser, isAuthorized} = useAuthContext();
    const [isLoggedUserTeamLead, setIsLoggedUserTeamLead] = useState(false);
    const [teamLead, setTeamLead] = useState(null);
    const [showUpdateTeamModal, setShowUpdateTeamModal] = useState(false);
    const [team, setTeam] = useState(null);
    const [changeOccurred, setChangeOccurred] = useState(true);

    const {addToast} = useToasts();

    useEffect(() => {
        changeOccurred && GetOneTeam(id)
            .then(res => {
                setChangeOccurred(false);

                setTeam(res.data);
                const teamLead = res.data?.teamMembers.find(member => member.isTeamLead);
                setTeamLead(teamLead);
                setIsLoggedUserTeamLead(teamLead?.user.username === loggedUser);
            })
    }, [isLoggedUserTeamLead, showUpdateTeamModal, changeOccurred])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(teamsRoute, team.id, formData, FileType.Profile)
            .then(r => console.log('vlagam tuka'))
    }


    const approvePendingMemberIntoTeam = (event) => {
        event.preventDefault();

        // ApproveMemberIntoTeam()
        //     .then(() => addToast)


        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(teamsRoute, team.id, formData, FileType.Profile)
            .then(r => console.log('vlagam tuka'))
    }

    const ApplyInTeam = event => {
        event.preventDefault();

        ApplyToJoinIntoTeam(loggedUser, team.id)
            .then(r => {
                setChangeOccurred(true);
                addToast('Successfully applied', {appearance: 'success'});
            })
    }


    return (team &&
        <Grid container direction={"column"} justify={"space-between"}>
            <div className={"position-relative"}>
                <img width={"100%"} height={420} src={SportsCover} alt={"sports"}/>
            </div>
            <Grid container className={"mt-5"}>
                <Grid item sm={5}>
                    <Card>
                        <CardContent>
                            <TitleWithButtonGrid title={team.name}
                                                 variant={"h2"}
                                                 align={"center"}
                                                 classes={"pl-3"}
                                                 button={teamLead && isAuthorized(teamLead.user.username) &&
                                                     <IconButton onClick={() => setShowUpdateTeamModal(true)}>
                                                         <EditOutlinedIcon/>
                                                     </IconButton>}
                            />
                            <Typography className={"mt-5 mb-5 pl-3"} variant={"body1"}>
                                {team.description ?? "Nothing here for now"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={3}>
                    <UploadShowProfilePicture width={170} height={170} onUpload={onFileUpload}
                                              src={team.logo ?? TeamLogo}
                                              classes={"justify-content-center d-flex align-content-center"}
                                              alt={FileType.Profile}/>

                    {!isAuthorized(teamLead?.user?.username) && !team.teamMembers.find(teamMember => isAuthorized(teamMember.user.username)) &&
                        <div className={"text-center mt-5"}>
                            <Button variant={"outlined"} color={"primary"} onClick={ApplyInTeam}>Apply
                                Now</Button>
                        </div>
                    }
                </Grid>
                <Grid item sm={4}>
                    <Card>
                        <CardHeader title={"Info"}/>
                        <CardContent className={"d-flex justify-content-between align-items-center pl-3"}>
                            <div>
                                <Typography variant={"body1"}> Team Status
                                </Typography>
                                <span className={`badge badge-pill text-center mr-3 
                            ${team.teamStatus === TeamStatus.LookingForMore
                                    ? 'badge-info'
                                    : team.teamStatus === TeamStatus.Full
                                        ? 'badge-danger'
                                        : 'badge-success'}`}> {team.teamStatus}
                            </span>
                            </div>
                            <Tooltip title={team.sport ?? Sport.Other}>
                                <img width={180} height={180}
                                     className={"m-4"}
                                     src={require(`../../assets/images/sport/${team.sport ?? Sport.Other.toString()}.jpg`)}
                                     alt={team.sport ?? Sport.Other}/>
                            </Tooltip>
                            <div className={"text-center"}>
                                <Typography variant={"body1"}>
                                    Current number of players in team.
                                </Typography>
                                <Typography variant={"h5"}>
                                    {CalculateMissingMembers(team).length} / {team.size}</Typography>
                            </div>
                        </CardContent>
                    </Card>

                </Grid>

            </Grid>
            <Grid container>
                <Grid item sm={12} md={12}>
                    <Card className={"mt-5"}>
                        <CardContent>
                            {teamLead &&
                                <>
                                    <Typography variant={"h5"} align={"center"}>Our Members</Typography>
                                    <Avatar className={"profile-avatar mt-3"}
                                            src={GetLastFilePath(teamLead.user.files, MissingMember)}/>
                                    <div className={"text-center"}>
                                        <Link className={"text-black-50 font-weight-bold text-uppercase mt-1"}
                                              to={`/users/${teamLead.user.username}`}>@{teamLead.user.username} </Link>
                                        <Typography
                                            variant={"h5"}>{teamLead.user.name} {teamLead.user.surname}</Typography>
                                        <hr/>
                                    </div>
                                </>
                            }
                            {team && team.teamMembers && team.teamMembers.length > 0 &&
                                <TeamMemberGrid team={team} teamMembers={GetAllTeamMembersInTeam(team)}/>}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={12} md={6}>
                    <Card className={"mt-5"}>
                        <CardContent>
                            <Typography variant={"h5"} align={"center"} className={"mb-3"}>Pending
                                applicants</Typography>
                            <TeamMemberGrid teamMembers={GetAllPendingToBeAcceptedInTeamMembers(team)}
                                            team={team} hideMissingMembers={true} buttonIcon={ThumbUpIcon}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6} className={"pl-5"}>
                    <Card className={"mt-5"}>
                        <CardContent>
                            <Typography variant={"h5"} className={"mb-3"} align={"center"}>Awaiting their
                                approval</Typography>
                            <TeamMemberGrid teamMembers={GetAllPendingToAcceptTeamInvitationTeamMembers(team)}
                                            team={team} hideMissingMembers={true}/>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            {showUpdateTeamModal && <CreateEditTeamModal team={team} open={showUpdateTeamModal}
                                                         onClose={() => setShowUpdateTeamModal(false)}/>}
        </Grid>
    )
}

export default TeamDetails;
