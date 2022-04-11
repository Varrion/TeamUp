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
import {useAuthContext} from "../../configurations/AuthContext";
import {useToasts} from "react-toast-notifications";

const Register = (props) => {
    const {loggedUser} = useAuthContext();
    const {addToast} = useToasts();
    const [showRoleModal, setShowRoleModal] = useState(true);
    const [user, setUser] = useState({
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        gender: "",
        roleType: props.location.state.roleType
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
            .then(() => {
                navigate("/login");
                addToast("Successfuly registered", {appearance: 'success'})
            })
    }


    return (loggedUser ? <Redirect to={"/"} noThrow/> :
            showRoleModal && (user.roleType === null || user.roleType === undefined) ?
                <ChooseRole open={showRoleModal} onClose={() => setShowRoleModal(false)} roleset={chooseRole}/>
                : <Container component="main" maxWidth="xs" className="register-container-custom">
                    <Paper elevation={0} className={"d-flex flex-column align-items-center pt-5 register-paper-custom"}>
                        <Avatar>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5" className={"mb-3"}>
                            Sign up
                        </Typography>
                        <form onSubmit={handleSubmit}>
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
                                        inputProps={{
                                            minLength: 2,
                                        }}
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
                                        inputProps={{
                                            minLength: 2,
                                        }}
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
                                        inputProps={{
                                            minLength: 2,
                                        }}
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
                                        inputProps={{
                                            minLength: 6,
                                        }}
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
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end" className={"mt-3"}>
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
