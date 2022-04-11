import {Grid} from "@material-ui/core";
import UserCard from "../../components/cards/UserCard";

const UserList = ({users}) => {
    return (
        users && users.length > 0 &&
        <Grid container>
            {users.map(user => <Grid key={user.id} item xs={12} md={6} lg={4}>
                <UserCard user={user} />
            </Grid>)}
        </Grid>
    )
}

export default UserList;
