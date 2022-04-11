import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {truncate} from "../Functions";
import TeamMemberGrid from "../grids/TeamMemberGrid";
import {navigate} from "@reach/router";
import {GetAllTeamMembersInTeam} from "../../services/TeamService";
import React from "react";

const TeamCard = ({team, onAccept, onCancel, filterTeamLead}) => {
    return (
        <Card
            className={`card-zoom card-height m-3 text-center`}>
            <CardContent className={"cursor-pointer"} onClick={() => navigate(`/teams/${team.id}`)}>
                <Avatar className={"profile-avatar-large"} src={team.logo?.filePath ?? 'https://i.pravatar.cc/300'}/>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-3 text-center"}
                >{truncate(team.name)}
                </Typography>
                <Typography
                    variant={"button"}
                    className="badge badge-dark mb-3 mt-1">{team.sport}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                >{truncate(team.description, 50, 50)}</Typography>
                <hr style={{width: "90%"}}/>
                <TeamMemberGrid team={team} teamMembers={GetAllTeamMembersInTeam(team, filterTeamLead)}/>
            </CardContent>
            <CardActions className={"d-flex justify-content-between"}>
                {onAccept && <Button color={"primary"} onClick={onAccept(team)}>Accept</Button>}
                {onCancel && <Button color={"secondary"}>Reject</Button>}
            </CardActions>
        </Card>
    )
}

export default TeamCard;
