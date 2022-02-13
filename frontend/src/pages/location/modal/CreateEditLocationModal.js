import {Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import {useState} from "react";
import useStyles from "../../../components/MaterialStyles";
import {useAuthContext} from "../../../configurations/AuthContext";
import {DeleteTeam} from "../../../services/TeamService";
import {AddLocation, EditLocation} from "../../../services/LocationService";
import GoogleMap from "../../../components/maps/GoogleMap";
import HorizontalStepper from "../../../components/stepper/HorizontalStepper";
import CustomStep from "../../../components/stepper/StepContent";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";


const CreateEditLocationModal = (props) => {
    const classes = useStyles();
    const {loggedUser} = useAuthContext();
    const steps = [
        {
            title: "Location",
            optional: false,
            action: () => handleSubmit
        },
        {
            title: "Personal Info",
            optional: true
        },
        {
            title: "Place Logo",
            optional: true
        }]

    const [location, setLocation] = useState({
        name: props.location?.name ?? "",
        description: props.location?.description ?? "",
        ownerUsername: props.location?.ownerUsername ?? loggedUser,
        address: "",
        city: "",
        longitude: null,
        latitude: null
    });

    const handleChange = name => event => {
        setLocation({...location, [name]: event.target.value});
    };

    const handleDelete = () => {
        DeleteTeam(props.location.id)
            .then(() => props.onClose(true));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (props.location) {
            EditLocation(props.location.id, location)
                .then(() => props.onClose())
        } else {
            AddLocation(location)
                .then(() => props.onClose())
                .catch(err => console.log(err))
        }
    }

    return (
        <Dialog
            disableBackdropClick
            fullWidth={true}
            maxWidth={"xl"}
            {...props}
            aria-labelledby="choose-role-title"
        >
            <DialogTitle disableTypography={true} id={"choose-role-title"} className={"text-center"}>
                <Typography variant={"h4"}
                            className={"font-weight-bolder"}> {props.team ? "Update Location " : "Add Location"}  </Typography>
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.onClose()}>
                <CloseIcon/>
            </IconButton>
            <DialogContent className={"mb-3"}>
                <HorizontalStepper steps={steps} onComplete={() => props.onClose()}>
                    <CustomStep>
                        <form onSubmit={handleSubmit}>
                            <Grid container direction={"column"}>
                                <Grid item xs={12} className={"mb-4"}>

                                </Grid>
                                <Grid container>
                                    <Grid item xs={6} className={"mb-4"}>
                                        <TextField
                                            required
                                            id="name"
                                            label="Name"
                                            fullWidth
                                            value={location.name}
                                            onChange={handleChange("name")}
                                        />
                                        <TextField
                                            id="info"
                                            label="Location Info"
                                            multiline
                                            rows={10}
                                            fullWidth
                                            variant="outlined"
                                            className={"mt-4"}
                                            value={location.description}
                                            onChange={handleChange("description")}
                                        />
                                        <TextField
                                            id="address"
                                            label="Address"
                                            fullWidth
                                            className={"mt-3"}
                                            value={location.address}
                                            onChange={handleChange("address")}
                                        />
                                        <TextField
                                            id="address"
                                            label="City"
                                            fullWidth
                                            className={"mt-3"}
                                            value={location.city}
                                            onChange={handleChange("address")}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <GoogleMap onMarkerChange={(longitude, latitude) => setLocation({
                                            ...location,
                                            longitude: longitude,
                                            latitude: latitude
                                        })}/>
                                    </Grid>
                                </Grid>
                                <Grid container className={"text-center"}>
                                    <Grid item xs={6}>

                                    </Grid>
                                    <Grid item xs={6}>

                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item lg={6}>
                                        {props.team &&
                                            <Button
                                                color={"secondary"}
                                                variant="contained"
                                                onClick={() => handleDelete()}
                                                className={classes.submit}
                                            >
                                                Remove
                                            </Button>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </CustomStep>
                    <CustomStep>
                        <form>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email address"
                                    fullWidth
                                    type={"email"}
                                    value={location.email}
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
                                    value={location.phoneNumber}
                                    onChange={handleChange("phoneNumber")}
                                    autoComplete="phone number"
                                />
                            </Grid>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <Grid item xs={12}>
                                    <KeyboardDatePicker
                                        variant="inline"
                                        label="Date of Birth"
                                        format="DD/MM/YYYY"
                                        value={location.dateOfBirth}
                                        InputAdornmentProps={{ position: "start" }}
                                        onChange={handleChange("dateOfBirth")}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </form>
                    </CustomStep>
                    <CustomStep>
                        <div>bla bla</div>
                    </CustomStep>
                </HorizontalStepper>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditLocationModal;
