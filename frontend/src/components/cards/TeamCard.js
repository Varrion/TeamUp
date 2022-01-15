import {Card, CardContent, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {navigate} from "@reach/router";

const TeamCard = (props) => {
    return (
        <Card onClick={() => navigate(`/users/${props.user.username}`)}>
            <CardContent>
                <Avatar className={"profile-avatar"} src={'https://i.pravatar.cc/300'}/>
                <Typography variant={"h5"}
                            className={"font-weight-bold"}>{props.user.name.toUpperCase() + " " + props.user.surname.toUpperCase()}</Typography>
                <span>{}</span>
            </CardContent>
        </Card>
    )
}

export default TeamCard;
