import React, {useEffect, useState} from "react";
import {
    ApplyToJoinIntoTeam,
    CalculateMissingMembers,
    ChangeTeamMemberStatus,
    GetAllPendingToAcceptTeamInvitationTeamMembers,
    GetAllPendingToBeAcceptedInTeamMembers,
    GetAllTeamMembersInTeam,
    GetOneTeam,
    TeamMemberStatus,
    teamsRoute,
    TeamStatus
} from "../../services/TeamService";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Link as MuiLink,
    List,
    Tooltip
} from "@material-ui/core";
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
import {useToasts} from "react-toast-notifications";
import {UserRole} from "../../services/UserService";
import {DeletePlayingInterval, GetAllFuturePlayingIntervalsForTeam} from "../../services/PlayingIntervalService";
import PlayIntervalListItem from "../../components/lists/PlayIntervalListItem";
import ClearIcon from "@material-ui/icons/Clear";


const TeamDetails = ({id}) => {
    const {loggedUser, loggedUserRole, isAuthorized} = useAuthContext();
    const {addToast} = useToasts();

    const [isLoggedUserTeamLead, setIsLoggedUserTeamLead] = useState(false);
    const [teamLead, setTeamLead] = useState(null);
    const [showUpdateTeamModal, setShowUpdateTeamModal] = useState(false);
    const [team, setTeam] = useState(null);
    const [changeOccurred, setChangeOccurred] = useState(true);
    const [playingIntervals, setPlayingIntervals] = useState(null);

    const [, setSelectedInterval] = useState(null);
    const [hasIntervalUpdate, setHasIntervalUpdate] = useState(true);
    const terrainIntervalMenuButtonActionsForTeamLeaders = [
        {
            text: <><ClearIcon/> Cancel </>,
            action: (interval) => onIntervalDelete(interval)
        }]

    const onIntervalDelete = (interval) => {
        return DeletePlayingInterval(interval.playingField.id, interval.id)
            .then(() => {
                addToast('The given interval is again available for selection.', {appearance: 'success'});
                setHasIntervalUpdate(true);
            });
    }


    useEffect(() => {
        changeOccurred && GetOneTeam(id)
            .then(res => {
                setChangeOccurred(false);
                setTeam(res.data);
                const teamLead = res.data?.teamMembers.find(member => member.isTeamLead);
                setTeamLead(teamLead);
                setIsLoggedUserTeamLead(teamLead?.user.username === loggedUser);
            })
    }, [isLoggedUserTeamLead, showUpdateTeamModal, changeOccurred]);

    useEffect(() => {
        team && hasIntervalUpdate && GetAllFuturePlayingIntervalsForTeam(team.id)
            .then(res => {
                setHasIntervalUpdate(!hasIntervalUpdate);
                setPlayingIntervals(res.data)
            })
    }, [hasIntervalUpdate, team])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(teamsRoute, team.id, formData, FileType.Profile)
            .then(() => setChangeOccurred(true))
    }


    const ApprovePendingMemberIntoTeam = pendingMember => (event) => {
        event.preventDefault();

        ChangeTeamMemberStatus(pendingMember.user.username, team.id, TeamMemberStatus.Accepted)
            .then(() => {
                setChangeOccurred(true);
                addToast("success", {appearance: "success"});
            })
    }

    const ApplyInTeam = event => {
        event.preventDefault();

        ApplyToJoinIntoTeam(loggedUser, team.id)
            .then(() => {
                setChangeOccurred(true);
                addToast('Successfully applied', {appearance: 'success'});
            })
    }

    const RemoveFromTeam = member => event => {
        event.preventDefault();

        ChangeTeamMemberStatus(member.user.username, team.id, TeamMemberStatus.Rejected)
            .then(() => {
                setChangeOccurred(true);
                addToast('Successfully removed member from the team', {appearance: 'success'});
            })
    }


    return (team && teamLead &&
        <Grid container direction={"column"} justify={"space-between"}>
            <div className={"position-relative"}>
                <img width={"100%"} height={450} src={SportsCover} alt={"sports"}/>
            </div>
            <Grid container className={"mt-5"}>
                <Grid item sm={5}>
                    <Card>
                        <CardContent>
                            <TitleWithButtonGrid title={team.name}
                                                 variant={"h2"}
                                                 align={"center"}
                                                 classes={"pl-3"}
                                                 button={isAuthorized(teamLead.user.username) &&
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
                    <UploadShowProfilePicture width={170} height={170}
                                              onUpload={isAuthorized(teamLead.user.username) && onFileUpload}
                                              src={team.logo?.filePath ?? TeamLogo}
                                              classes={"justify-content-center d-flex align-content-center"}
                                              alt={FileType.Profile}/>

                    {loggedUserRole === UserRole.User && !isAuthorized(teamLead?.user?.username) && !team.teamMembers.find(teamMember => isAuthorized(teamMember.user.username)) &&
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
                            <Grid container alignItems={"center"}>
                                <Grid item sm={6} md={12} lg={4} xl={2} className={"pl-2 text-center"}>
                                    <Typography variant={"body1"}> Team Status
                                    </Typography>
                                    <span className={`badge badge-pill 
                                        ${team.teamStatus === TeamStatus.LookingForMore
                                        ? 'badge-info'
                                        : team.teamStatus === TeamStatus.Full
                                            ? 'badge-danger'
                                            : 'badge-success'}`}>
                                        {team.teamStatus}
                                    </span>
                                </Grid>
                                <Grid item sm={6} md={6} lg={8} xl={5} className={"text-right"}>
                                    <Tooltip title={team.sport ?? Sport.Other}>
                                        <img width={180} height={180}
                                             className={"m-4"}
                                             src={require(`../../assets/images/sport/${team.sport ?? Sport.Other.toString()}.jpg`)}
                                             alt={team.sport ?? Sport.Other}/>
                                    </Tooltip>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12} xl={5} className={"text-center"}>
                                    <Typography variant={"body1"}>
                                        Number of players in team
                                    </Typography>
                                    <Typography variant={"h5"}>
                                        {CalculateMissingMembers(team).length} / {team.size}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {playingIntervals && playingIntervals.length > 0 &&
                    <Grid item component={Card} md={12} className={"mt-4"}>
                        <CardHeader title={"Reservations"} className={"text-center"}/>
                        <CardContent>
                            <List className={"d-flex flex-wrap justify-content-center"}>
                                {playingIntervals.map((interval, index) =>
                                    <div key={index}>
                                        <Typography align={"center"}>
                                            Terrain: <MuiLink color={"initial"} component={Link}
                                                              to={`/terrains/${interval.playingField.id}`}>{interval.playingField?.name}</MuiLink>
                                        </Typography>
                                        <PlayIntervalListItem
                                            setSelectedElement={setSelectedInterval}
                                            menuOptions={isAuthorized(teamLead.user.username) && terrainIntervalMenuButtonActionsForTeamLeaders}
                                            interval={interval}/>
                                    </div>
                                )}
                            </List>
                        </CardContent>
                    </Grid>}
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
                                    <div className={"text-center mt-2"}>
                                        <Link className={"font-weight-bold text-uppercase mui-link-color"}
                                              to={`/users/${teamLead.user.username}`}>@{teamLead.user.username} </Link>
                                        <Typography
                                            variant={"h5"}>{teamLead.user.name} {teamLead.user.surname}</Typography>
                                        <hr/>
                                    </div>
                                </>
                            }
                            {team && team.teamMembers && team.teamMembers.length > 0 &&
                                <TeamMemberGrid team={team} teamMembers={GetAllTeamMembersInTeam(team)}
                                                removeAction={isAuthorized(teamLead.user.username) && RemoveFromTeam}/>}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={12} md={6}>
                    <Card className={"mt-5"}>
                        <CardContent>
                            <Typography variant={"h5"} align={"center"} className={"mb-3"}>
                                Pending applicants
                            </Typography>
                            <TeamMemberGrid teamMembers={GetAllPendingToBeAcceptedInTeamMembers(team)}
                                            team={team} hideMissingMembers={true}
                                            approveAction={isAuthorized(teamLead.user.username) && ApprovePendingMemberIntoTeam}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6} className={"pl-5"}>
                    <Card className={"mt-5"}>
                        <CardContent>
                            <Typography variant={"h5"} className={"mb-3"} align={"center"}>
                                Awaiting their approval
                            </Typography>
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
