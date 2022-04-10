import { Card, CardContent, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { truncate } from "../Functions";
import TeamMemberGrid from "../grids/TeamMemberGrid";
import { navigate } from "@reach/router";
import { GetAllTeamMembersInTeam } from "../../services/TeamService";

const TeamCard = ({ team }) => {
    return (
        <Card
            onClick={() => navigate(`/teams/${team.id}`)}
            className={`card-zoom cursor-pointer card-height m-3 text-center`}>
            <CardContent>
                <Avatar className={"profile-avatar"} src={'https://i.pravatar.cc/300'} />
                <Typography variant={"h5"}
                    className={"font-weight-bold mt-3 mb-4 text-center"}
                >{truncate(team.name)}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                >{truncate(team.description, 50, 50)}</Typography>
                <hr style={{width:"80%"}}/>
                <TeamMemberGrid team={team} teamMembers={GetAllTeamMembersInTeam(team)} />
            </CardContent>
        </Card>
    )
}

export default TeamCard;
