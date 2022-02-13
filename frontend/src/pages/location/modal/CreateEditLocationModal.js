import {Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useRef, useState} from "react";
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
    const [createdLocationId, setCreatedLocationId] = useState(null);
    const [location, setLocation] = useState({
        name: props.location?.name ?? "",
        email: props.location?.email ?? "",
        description: props.location?.description ?? "",
        ownerUsername: props.location?.ownerUsername ?? loggedUser,
        address: props.location?.address ?? "",
        city: props.location?.city ?? "",
        longitude: props.location?.longitude ?? null,
        latitude: props.location?.latitude ?? null,
        phoneNumber: props.location?.phoneNumber ?? "",
        dateOfBirth: props.location?.dateOfBirth ? new Date(props.profile.dateOfBirth) : new Date()
    });

    const horizontalStepperHandleNext = useRef(null);

    const steps = [
        {
            title: "Location Info",
            optional: false,
            actionForm: "location-info"
        },
        {
            title: "Location Map",
            optional: false,
            actionForm: "location-map"
        },
        {
            title: "Location Logo",
            optional: true,
            actionForm: "location-logo"
        }]

    const handleChange = name => event => {
        if (name === "dateOfBirth") {
            setLocation({...location, dateOfBirth: event.toDate()})
            return;
        }

        setLocation({...location, [name]: event.target.value});
    };

    const handleDelete = () => {
        DeleteTeam(props.location.id)
            .then(() => props.onClose(true));
    }

    const handleFirstStepSubmit = event => {
        event.preventDefault();

        AddLocation(location)
            .then(res => {
                console.log("asdfada safsa", res.data);
                setCreatedLocationId(res.data);
                horizontalStepperHandleNext.current();
            })
            .catch(err => console.log(err))
    }

    const handleSecondStepSubmit = event => {
        event.preventDefault();
        console.log('vlagam tuka')

        EditLocation(createdLocationId, location)
            .then(() => horizontalStepperHandleNext.current())
            .catch(err => console.log(err))
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
                <HorizontalStepper steps={steps} onComplete={() => props.onClose()}
                                   horizontalStepperHandleNext={horizontalStepperHandleNext}>
                    <CustomStep>
                        <form id={"location-info"} onSubmit={handleFirstStepSubmit}>
                            <Grid container justify={"center"}>
                                <Grid item xs={5}>
                                    <TextField
                                        required
                                        id="name"
                                        label="Name"
                                        fullWidth
                                        value={location.name}
                                        onChange={handleChange("name")}
                                    />
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email address"
                                        fullWidth
                                        required
                                        type={"email"}
                                        value={location.email}
                                        className={"mt-3"}
                                        autoComplete="email address"
                                        onChange={handleChange("email")}

                                    />
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Phone number"
                                        fullWidth
                                        value={location.phoneNumber}
                                        className={"mt-3"}
                                        onChange={handleChange("phoneNumber")}
                                        autoComplete="phone number"
                                    />
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <Grid item xs={12} className={"mt-3"}>
                                            <KeyboardDatePicker
                                                variant="inline"
                                                label="Since"
                                                format="DD/MM/YYYY"
                                                fullWidth
                                                className={"mt-2"}
                                                value={location.dateOfBirth}
                                                InputAdornmentProps={{position: "start"}}
                                                onChange={handleChange("dateOfBirth")}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6} className={"pl-4"}>
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
                                </Grid>
                            </Grid>
                        </form>
                    </CustomStep>
                    <CustomStep>
                        <form id={"location-map"} onSubmit={handleSecondStepSubmit}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <GoogleMap hideLongitudeLatitude={true}
                                               onMarkerChange={(longitude, latitude) => setLocation({
                                                   ...location,
                                                   longitude: longitude,
                                                   latitude: latitude
                                               })}/>
                                </Grid>
                                <Grid className={"mt-2"} item xs={6}>
                                    <Typography variant={"h3"} className={"text-center"}>{location.name}</Typography>
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
                                        onChange={handleChange("city")}
                                    />
                                    <Typography className={"mt-4"}
                                                variant={"h6"}>Latitude: {location.latitude}</Typography>
                                    <Typography className={"mt-2"}
                                                variant={"h6"}>Longitude: {location.longitude}</Typography>
                                </Grid>
                            </Grid>
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
