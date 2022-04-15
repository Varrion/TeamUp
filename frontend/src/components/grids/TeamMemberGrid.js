import {Badge, Grid, IconButton, Typography, Link as MuiLink} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MissingMember from "../../assets/images/MissingPlayer.png";
import {GetLastFilePath} from "../../services/FileService";
import {Link} from "@reach/router";
import React from "react";
import {AddAvatarsForMissingMembers, CalculateMissingMembers} from "../../services/TeamService";
import Button from "@material-ui/core/Button";
import CancelIcon from '@material-ui/icons/Cancel';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {truncate} from "../Functions";

const TeamMemberGrid = ({team, teamMembers, approveAction, removeAction, hideMissingMembers = false}) => {
    const missingMembersNumber = AddAvatarsForMissingMembers(team);

    return (
        <Grid container className="pl-4 pr-4">
            {
                teamMembers.map(teamMember =>
                    <Grid key={teamMember?.user.id} item lg={3}>
                        <div className={"text-center"}>
                            <Badge
                                overlap={"circle"}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                badgeContent={removeAction &&
                                    <IconButton onClick={removeAction(teamMember)} className={"ml-3"}
                                                color={"secondary"}> <CancelIcon/>
                                    </IconButton>}
                            >
                                <Avatar className={"profile-avatar"}
                                        src={GetLastFilePath(teamMember?.user?.files, MissingMember)}/>
                            </Badge>
                        </div>
                        <div className={"text-center mt-2 mb-2"}>
                            <MuiLink component={Link} className={"text-black-50 text-uppercase font-weight-bolder mui-link-color"}
                                     to={`/users/${teamMember.user.username}`}>@{teamMember.user.username} </MuiLink>
                            <Typography
                                variant={"body1"}>{truncate(`${teamMember.user.name} ${teamMember.user.surname}`, 15, 16)}  </Typography>
                            {approveAction &&
                                <Button variant={"text"} onClick={approveAction(teamMember)} color={"primary"}
                                        size={"small"}
                                        className={"rounded"}><ThumbUpIcon/></Button>}
                        </div>
                    </Grid>)
            }
            {!hideMissingMembers && missingMembersNumber != null && missingMembersNumber.length > 0 ?
                <>
                    {missingMembersNumber.map((value, index) =>
                        <Grid item lg={3}
                              key={index}>
                            <Avatar className={"profile-avatar"} src={MissingMember}/>
                            <Typography align={"center"} variant={"body1"}>Missing</Typography>
                        </Grid>)
                    }
                    {team.size > 6 &&
                        <Grid className={"d-flex align-items-end justify-content-center"} item lg={3}>
                            <Typography
                                variant={"h6"}> {`...${CalculateMissingMembers(team).length}/${team.size}`} </Typography>
                        </Grid>}
                </> : teamMembers.length === 0 &&
                <Typography variant={"body1"}>This list is currently empty.</Typography>
            }
        </Grid>
    )
}

export default TeamMemberGrid;