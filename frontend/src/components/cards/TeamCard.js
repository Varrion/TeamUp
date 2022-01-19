import {Card, CardContent, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {truncate} from "../Functions";
import TeamMemberGrid from "../grids/TeamMemberGrid";

const TeamCard = ({team}) => {
    return (
        <Card
            className={`card-zoom card-height m-2`}>
            <CardContent>
                <Avatar className={"profile-avatar"} src={'https://i.pravatar.cc/300'}/>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-2"}>{truncate(team.name)}
                </Typography>
                <Typography className={"text-left card-description"}
                            variant={"subtitle1"}>{truncate(team.description, 50, 50)}</Typography>
                <TeamMemberGrid team={team}/>
            </CardContent>
        </Card>
    )
}

export default TeamCard;
