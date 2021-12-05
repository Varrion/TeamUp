import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import LoginPhoto from "../../assets/images/login-photo.jpg";
import {Link, Redirect} from "@reach/router";
import {BasicAuth, LoginUser} from "../../services/UserService";
import {useAuthContext} from "../../components/AuthContext";


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const {loggedUser, login} = useAuthContext();
    const classes = useStyles();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        LoginUser(user)
            .then(() => {
                let authData = BasicAuth(user.username, user.password);
                sessionStorage.setItem('authData', authData);
                login(user.username);
            })
    }

    return (loggedUser ? <Redirect to={"/"} noThrow/> :
            <Grid container component={"main"}>
                <Grid item xs={false} sm={4} md={7} className={"background-image team-up-login-text"}
                      style={{backgroundImage: `url(${LoginPhoto})`}}> Team Up </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={"full-width mt-1"} onSubmit={handleSubmit}>
                            <TextField
                                onChange={handleChange("username")}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange("password")}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <div className={"text-right"}>
                                <Link to={"/register"}>
                                    Don't have an account? Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
    );
}

export default Login;
