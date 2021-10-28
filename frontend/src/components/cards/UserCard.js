import {Box, Card, CardContent, Divider, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {navigate} from "@reach/router";

const UserCard = (props) => {
    return (
        <Card onClick={() => navigate(`/users/${props.user.username}`)}>
            <CardContent>
                <Avatar className={"profile-avatar"} src={'https://i.pravatar.cc/300'}/>
                <Typography variant={"h5"}
                            className={"font-weight-bold"}>{props.user.name.toUpperCase() + " " + props.user.surname.toUpperCase()}</Typography>
                <span>Poland</span>
            </CardContent>
            <Divider light/>
            <Box display={'flex'}>
                <Box p={2} flex={'auto'}>
                    <p>Followers</p>
                    <p>6941</p>
                </Box>
                <Box p={2} flex={'auto'}>
                    <p>Following</p>
                    <p>12</p>
                </Box>
            </Box>
        </Card>
    )
}

export default UserCard;
