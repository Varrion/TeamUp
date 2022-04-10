import { Box, Card, CardContent, Divider, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { navigate } from "@reach/router";
import { FileType, GetLastFilePath } from '../../services/FileService'

const UserCard = (props) => {
    return (
        <Card onClick={() => navigate(`/users/${props.user.username}`)}
            className={`card-zoom cursor-pointer card-height m-3 text-center`}>
            <CardContent>
                <Avatar className={"profile-avatar mb-4"}
                    src={GetLastFilePath(props.user.files, "https://i.pravatar.cc/300")}
                    alt={FileType.Profile}
                />
                <Typography variant={"h5"}
                    className={"font-weight-bold m-0 mb-3"}>{props.user.name.toUpperCase() + " " + props.user.surname.toUpperCase()}</Typography>
                <span>Poland</span>
            </CardContent>
            <hr style={{ width: "80%" }} />
            <Box display={'flex'} className={"mb-3"}>
                <Box p={2} flex={'auto'}>
                    <Typography variant={"h5"} className={"font-weight-bold"}>Followers</Typography>
                    <Typography variant={"h6"}>61661</Typography>
                </Box>
                <Box p={2} flex={'auto'}>
                    <Typography variant={"h5"} className={"font-weight-bold"}>Following</Typography>
                    <Typography variant={"h6"}>12</Typography>
                </Box>
            </Box>
        </Card >
    )
}

export default UserCard;
