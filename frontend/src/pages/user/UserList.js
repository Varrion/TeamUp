import {useEffect, useState} from "react";
import {GetAllUsers, UserRole} from "../../services/UserService";
import {Grid, makeStyles} from "@material-ui/core";
import UserCard from "../../components/cards/UserCard";

const useStyles = makeStyles(({palette}) => ({
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginTop: 8,
        marginBottom: 0,
    },
    subheader: {
        fontSize: 14,
        color: palette.grey[500],
        marginBottom: '0.875em',
    },
    statLabel: {
        fontSize: 12,
        color: palette.grey[500],
        fontWeight: 500,
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: 0,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        letterSpacing: '1px',
    },
}));


const UserList = (props) => {
    const styles = useStyles();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        GetAllUsers(UserRole.User)
            .then(res => setUsers(res.data))
    }, [])

    return (
        <Grid container>
            {users && users.length > 0 && users.map(user => <Grid item lg={3} xs={6}>
                <UserCard user={user}/>
            </Grid>)}
        </Grid>
    )
}

export default UserList;
