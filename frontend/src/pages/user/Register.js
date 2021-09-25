import {FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField} from "@material-ui/core";
import {useState} from "react";
import ChooseRole from "../../components/modals/ChooseRole";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link, navigate, Redirect} from "@reach/router";
import {Gender, RegisterUser} from "../../services/UserService";
import {useAuthContext} from "../../components/AuthContext";
import useStyles from "../../components/MaterialStyles";

const Register = (props) => {
    const {loggedUser} = useAuthContext();
    const classes = useStyles();
    const [showRoleModal, setShowRoleModal] = useState(true);
    const [user, setUser] = useState({
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        gender: "",
        roleType: null
    });

    const chooseRole = role => {
        setUser({...user, roleType: role});
    }

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        RegisterUser(user)
            .then(() => navigate("/login"))
    }


    return (loggedUser ? <Redirect to={"/"} noThrow/> :
            showRoleModal && !user.roleType ?
                <ChooseRole open={showRoleModal} onClose={() => setShowRoleModal(false)} roleset={chooseRole}/>
                : <Container component="main" maxWidth="xs">
                    <Paper elevation={0} className={"d-flex flex-column align-items-center pt-5"}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange("name")}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={handleChange("surname")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange("email")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange("username")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange("password")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel color={user.gender === Gender.Male ? "primary" : "secondary"}
                                                   component="legend">Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender" value={user.gender}
                                                    onChange={handleChange("gender")}>
                                            <FormControlLabel value={Gender.Male} control={<Radio color={"primary"}/>}
                                                              label={Gender.Male}/>
                                            <FormControlLabel value={Gender.Female} control={<Radio/>}
                                                              label={Gender.Female}/>
                                            <FormControlLabel value={Gender.Other} control={<Radio color={"default"}/>}
                                                              label={Gender.Other}/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color={user.gender === Gender.Male || !user.gender ? "primary" : user.gender === Gender.Female ? "secondary" : "default"}
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to={"/login"}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
    )
}

export default Register;
