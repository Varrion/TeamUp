import {useEffect, useState} from "react";
import {GetAllUsers, UserRole} from "../../services/UserService";
import {Box, Card, CardContent, Divider, makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(({palette}) => ({
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        margin: 'auto',
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
        <div className={"row"}>
            {users && users.length > 0 && users.map(user => <div className={"col-3"}>
                <Card>
                    <CardContent>
                        <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'}/>
                        <h3 className={styles.heading}>Alan Podemski</h3>
                        <span className={styles.subheader}>Poland</span>
                    </CardContent>
                    <Divider light/>
                    <Box display={'flex'}>
                        <Box p={2} flex={'auto'}>
                            <p className={styles.statLabel}>Followers</p>
                            <p className={styles.statValue}>6941</p>
                        </Box>
                        <div className={"vertical-line"}/>
                        <Box p={2} flex={'auto'}>
                            <p className={styles.statLabel}>Following</p>
                            <p className={styles.statValue}>12</p>
                        </Box>
                    </Box>
                </Card>
            </div>)}
            Test route
        </div>
    )
}

export default UserList;
