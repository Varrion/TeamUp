import {Grid, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MissingMember from "../../assets/images/MissingPlayer.png";
import {GetLastFilePath} from "../../services/FileService";
import {Link} from "@reach/router";
import React from "react";
import {AddAvatarsForMissingMembers, CalculateMissingMembers} from "../../services/TeamService";
import Button from "@material-ui/core/Button";

const TeamMemberGrid = ({team, teamMembers, buttonAction, buttonIcon, hideMissingMembers = false}) => {
    const missingMembersNumber = AddAvatarsForMissingMembers(team);

    return (
        <Grid container
              justify={"space-between"}>
            {
                teamMembers.map(teamMember =>
                    <Grid key={teamMember?.user.id} item lg={3}>
                        <Avatar className={"profile-avatar"}
                                src={GetLastFilePath(teamMember?.user?.files, MissingMember)}/>
                        <div className={"text-center text-uppercase mt-2 mb-2"}>
                            <Link className={"text-black-50 font-weight-bolder"}
                                  to={`/users/${teamMember.user.username}`}>@{teamMember.user.username} </Link>
                            <Typography
                                variant={"h6"}>{teamMember.user.name} {teamMember.user.surname}</Typography>
                            {buttonAction &&
                                <Button variant={"contained"} onClick={buttonAction} color={"primary"} size={"small"}
                                        className={"rounded"}>{buttonIcon}</Button>}
                        </div>
                        <div>
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