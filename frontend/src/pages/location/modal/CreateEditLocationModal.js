import {Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useRef, useState} from "react";
import useStyles from "../../../components/MaterialStyles";
import {useAuthContext} from "../../../configurations/AuthContext";
import {AddLocation, EditLocation, locationRoute} from "../../../services/LocationService";
import GoogleMap from "../../../components/maps/GoogleMap";
import HorizontalStepper from "../../../components/stepper/HorizontalStepper";
import CustomStep from "../../../components/stepper/StepContent";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import UploadShowProfilePicture from "../../../components/pictures/UploadShowProfilePicture";
import {FileType, GetLastFilePath, UploadFile} from "../../../services/FileService";


const CreateEditLocationModal = (props) => {
    const classes = useStyles();
    const {loggedUser} = useAuthContext();
    const [createdLocationId, setCreatedLocationId] = useState(props.location?.id ?? null);
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
        files: props.location?.files && props.location.files.length > 0 ? props.location.files : null,
        dateOfBirth: props.location?.dateOfBirth ? new Date(props.location.dateOfBirth) : new Date()
    });

    const [locationImage, setLocationImage] = useState(GetLastFilePath(location.files));
    const horizontalStepperHandleNext = useRef(null);

    const steps = [
        {
            title: "Location Info",
            optional: props.location ?? false,
            actionForm: "location-info"
        },
        {
            title: "Location Map",
            optional: props.location ?? false,
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

    const handleFirstStepSubmit = event => {
        event.preventDefault();

        !props.location ?
            AddLocation(location)
                .then(res => {
                    setCreatedLocationId(res.data);
                    horizontalStepperHandleNext.current();
                })
                .catch(err => console.log(err))
            : EditLocation(createdLocationId, location)
                .then(() => horizontalStepperHandleNext.current())
                .catch(err => console.log(err))
    }

    const handleSecondStepSubmit = event => {
        event.preventDefault();

        EditLocation(createdLocationId, location)
            .then(() => horizontalStepperHandleNext.current())
            .catch(err => console.log(err))
    }

    const handleThirdStepSubmit = event => {
        event.preventDefault();
        props.onClose();
    }

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(locationRoute, createdLocationId, formData, FileType.Profile)
            .then((r) => {
                setLocationImage(r.data)
            })
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
                            className={"font-weight-bolder"}> {props.location ? "Update Location " : "Add Location"}  </Typography>
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
                                    <GoogleMap
                                        longitude={location.longitude}
                                        latitude={location.latitude}
                                        hideLongitudeLatitude={true}
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
                        <form id={"location-logo"} onSubmit={handleThirdStepSubmit}
                              className={"d-flex justify-content-center"}>
                            <UploadShowProfilePicture width={250} height={250} src={locationImage} alt={FileType.Profile}
                                                      onUpload={onFileUpload}/>
                        </form>
                    </CustomStep>
                </HorizontalStepper>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditLocationModal;
