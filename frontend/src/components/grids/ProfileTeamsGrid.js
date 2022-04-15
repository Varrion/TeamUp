import {Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TeamMemberGrid from "./TeamMemberGrid";
import SportsIcon from "@material-ui/icons/Sports";
import TeamCard from "../cards/TeamCard";
import React from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {GetAllTeamMembersInTeam} from "../../services/TeamService";
import {navigate} from "@reach/router";

const ProfileTeamsGrid = ({
                              myTeam,
                              joinedTeams,
                              pendingToAcceptTeams,
                              pendingToBeAcceptedInTeam,
                              acceptPendingTeamInvitation,
                              rejectPendingTeamInvitation,
                              user,
                              showTeamModal
                          }) => {
    const {isAuthorized} = useAuthContext();

    return (
        <Grid item xs={12} md={6} lg={8}>
            {
                myTeam ?
                    <Card key={myTeam.id} className={"text-center"}>
                        <CardHeader title={"LEADING"} action={
                            isAuthorized(user.username) && <IconButton onClick={showTeamModal}>
                                <EditOutlinedIcon/>
                            </IconButton>}/>
                        <CardContent>
                            <Avatar className={"profile-avatar"}
                                    src={myTeam.logo?.filePath ?? 'https://i.pravatar.cc/300'}/>
                            <Typography variant={"h5"}
                                        className={"font-weight-bold mb-3"}>{myTeam.name}
                            </Typography>
                            <Typography className={"text-left mb-3"} variant={"subtitle1"}>
                                {myTeam.description}
                            </Typography>
                            <TeamMemberGrid team={myTeam} teamMembers={GetAllTeamMembersInTeam(myTeam)}/>
                        </CardContent>
                        <CardActions className={"d-flex justify-content-center"}>
                            <Button color={"primary"} onClick={() => navigate(`/teams/${myTeam.id}`)}>Show more</Button>
                        </CardActions>
                    </Card>
                    : <Card className={"text-center"}>
                        <CardContent>
                            <div className={"quote-text"}>
                                <Typography variant={"h4"} className={"mt-2"}>
                                    If you are born to lead, be a leader!”
                                </Typography>
                                <Typography variant={"body2"} align={"right"} className={"blockquote-footer"}>
                                    Author: Eraldo Banovac
                                </Typography>
                            </div>
                            <Button className={"half-width m-3"} variant={"contained"} color={"secondary"}
                                    onClick={showTeamModal}>
                                <SportsIcon/> Create your team
                            </Button>
                        </CardContent>
                    </Card>
            }
            {joinedTeams && joinedTeams.length > 0 &&
                <Card className={"mt-4 text-center"}>
                    <CardHeader title={"OTHER"}/>
                    <CardContent>
                        <Grid container>
                            {joinedTeams.map(team => <Grid key={team.id} item xs={12} md={6} lg={4}>
                                <TeamCard team={team} filterTeamLead={false}/>
                            </Grid>)}
                        </Grid>
                    </CardContent>
                </Card>
            }

            {pendingToAcceptTeams && pendingToAcceptTeams.length > 0 &&
                <Card className={"mt-4 text-center"}>
                    <CardHeader title={"PENDING"}/>
                    <CardContent>
                        <Grid container>
                            {pendingToAcceptTeams.map(team => <Grid key={team.id} item xs={12} md={6} lg={4}>
                                <TeamCard team={team} onAccept={acceptPendingTeamInvitation}
                                          filterTeamLead={false}
                                          onCancel={rejectPendingTeamInvitation}/>
                            </Grid>)}
                        </Grid>
                    </CardContent>
                </Card>
            }

            {pendingToBeAcceptedInTeam && pendingToBeAcceptedInTeam.length > 0 &&
                <Card className={"mt-4 text-center"}>
                    <CardHeader title={"AWAITING APPROVAL IN"}/>
                    <CardContent>
                        <Grid container>
                            {pendingToBeAcceptedInTeam.map(team => <Grid key={team.id} item xs={12} md={6} lg={4}>
                                <TeamCard team={team}/>
                            </Grid>)}
                        </Grid>
                    </CardContent>
                </Card>
            }
        </Grid>
    );
}

export default ProfileTeamsGrid;