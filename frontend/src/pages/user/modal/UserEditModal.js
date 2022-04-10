import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../../components/MaterialStyles";
import { EditUser, Gender } from "../../../services/UserService";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useToggleTheme } from "../../../configurations/MuiThemeContext";
import { useToasts } from "react-toast-notifications";

const UserEditModal = (props) => {
    const classes = useStyles();
    const { addToast } = useToasts();

    const { changeMainColorByUserGender } = useToggleTheme();

    const [user, setUser] = useState({
        username: props.profile?.username ?? "",
        password: props.profile?.password ?? "",
        name: props.profile?.name ?? "",
        surname: props.profile?.surname ?? "",
        email: props.profile?.email,
        gender: props.profile?.gender ?? "",
        phoneNumber: props.profile?.phoneNumber ?? "",
        address: props.profile?.address ?? "",
        city: props.profile?.city ?? "",
        dateOfBirth: props.profile?.dateOfBirth ? new Date(props.profile.dateOfBirth) : new Date(),
        description: props.profile?.description ?? ""
    });

    const handleChange = name => event => {
        if (name === "dateOfBirth") {
            setUser({ ...user, dateOfBirth: event.toDate() })
            return;
        }

        setUser({ ...user, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        EditUser(user.username, user)
            .then(() => {
                changeMainColorByUserGender(user.gender);
                addToast('Successfully updated user profile', { appearance: 'success' });
                return props.onClose()
            })
    }

    return (
        <Dialog
            disableBackdropClick
            fullWidth={true}
            maxWidth={"lg"}
            {...props}
            aria-labelledby="choose-role-title"
        >
            <DialogTitle disableTypography={true} id={"choose-role-title"} className={"text-center"}>
                <Typography variant={"h4"} className={"font-weight-bolder"}> Edit Profile </Typography>
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.onClose()}>
                <CloseIcon />
            </IconButton>
            <DialogContent className={"mb-3"}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                value={user.name}
                                autoComplete="given-name"
                                onChange={handleChange("name")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                value={user.surname}
                                autoComplete="family-name"
                                onChange={handleChange("surname")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email address"
                                fullWidth
                                type={"email"}
                                value={user.email}
                                autoComplete="email address"
                                onChange={handleChange("email")}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone number"
                                fullWidth
                                value={user.phoneNumber}
                                onChange={handleChange("phoneNumber")}
                                autoComplete="phone number"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                value={user.address}
                                onChange={handleChange("address")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                value={user.city}
                                onChange={handleChange("city")}
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    variant="inline"
                                    label="Date of Birth"
                                    format="DD/MM/YYYY"
                                    value={user.dateOfBirth}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={handleChange("dateOfBirth")}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel color={user.gender === Gender.Male ? "primary" : "secondary"}
                                    component="legend">Gender</FormLabel>
                                <RadioGroup row aria-label="gender" name="gender" value={user.gender}
                                    onChange={handleChange("gender")}>
                                    <FormControlLabel value={Gender.Male} control={<Radio color={"primary"} />}
                                        label={Gender.Male} />
                                    <FormControlLabel value={Gender.Female} control={<Radio />}
                                        label={Gender.Female} />
                                    <FormControlLabel value={Gender.Other} control={<Radio color={"default"} />}
                                        label={Gender.Other} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="bio"
                                label="Bio"
                                multiline
                                rows={5}
                                fullWidth
                                variant="outlined"
                                value={user.description}
                                onChange={handleChange("description")}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={"text-right"}>
                        <Button
                            type="submit"
                            variant="contained"
                            color={user.gender === Gender.Male || !user.gender ? "primary" : user.gender === Gender.Female ? "secondary" : "default"}
                            className={classes.submit}
                        >
                            Update
                        </Button>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserEditModal;
