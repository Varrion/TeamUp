import {Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useEffect, useRef, useState} from "react";
import useStyles from "../../../components/MaterialStyles";
import {
    AddPlayingInterval,
    AddTerrain,
    EditTerrain, FieldStatus,
    FieldType, GetAllPlayingIntervalsForTerrain,
    terrainRoute
} from "../../../services/PlayingFieldService";
import SportRadioButton from "../../../components/SportRadioButton";
import HorizontalStepper from "../../../components/stepper/HorizontalStepper";
import CustomStep from "../../../components/stepper/StepContent";
import DropzoneUploader from "../../../components/dropzone/DropzoneUploader";
import {BulkUploadFiles} from "../../../services/FileService";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";

const CreateEditTerrainModal = ({field, locationId, ...props}) => {
    const classes = useStyles();
    const [terrain, setTerrain] = useState({
        name: field?.name ?? "",
        description: field?.description ?? "",
        fieldType: FieldType.Private,
        fieldFor: field?.fieldFor ?? ""
    });
    const [terrainId, setTerrainId] = useState(null);
    const terrainFiles = []

    const [fieldPlayingIntervals, setFieldPlayingIntervals] = useState(null);
    const [terrainIntervalsHasChanges, setTerrainIntervalsHasChanges] = useState(null);
    const [playingInterval, setPlayingInterval] = useState({
        fieldStatus: FieldStatus.Open,
        gameStartTime: new Date(),
        gameEndTime: new Date(),
    });

    const steps = [
        {
            title: "Terrain Info",
            optional: field != null ?? false,
            actionForm: "terrain-info"
        },
        {
            title: "Terrain Media",
            optional: true,
            actionForm: "terrain-media"
        },
        {
            title: "Playing Time Intervals",
            optional: true,
            actionForm: "terrain-playing-intervals"
        }]

    const horizontalStepperHandleNext = useRef(null);

    useEffect(() => {
        terrainId && GetAllPlayingIntervalsForTerrain(terrainId)
            .then(res => {
                setFieldPlayingIntervals(res.data);
                setTerrainIntervalsHasChanges(false);
            });
    }, [terrainIntervalsHasChanges])

    const handleChange = name => event => {
        setTerrain({...terrain, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        field ? EditTerrain(terrain)
                .then(() => horizontalStepperHandleNext.current())
            : AddTerrain(terrain, locationId)
                .then((res) => {
                    setTerrainId(res.data);
                    horizontalStepperHandleNext.current()
                })

    }

    const handlePlayingIntervalChange = name => event => {
        if (name === "fieldStatus") {
            setPlayingInterval({...playingInterval, fieldStatus: event.target.value})
            return;
        }

        setPlayingInterval({...playingInterval, [name]: event.toDate()});
    }

    const handleMediaSubmit = event => {
        event.preventDefault();
        let formData = new FormData();
        terrainFiles.forEach(file => formData.append("files", file))
        BulkUploadFiles(terrainRoute, terrainId, formData)
            .then(() => props.onClose())
    }

    const handlePlayingIntervalsSubmit = event => {
        event.preventDefault();
        props.onClose();
    }

    const InsertPlayingGameInterval = () => {
        console.log('test test')
        AddPlayingInterval(terrainId, playingInterval)
            .then(() => setTerrainIntervalsHasChanges(true))
    }

    return (
        <Dialog
            disableBackdropClick
            maxWidth={"lg"}
            {...props}
            aria-labelledby="choose-role-title"
        >
            <DialogTitle disableTypography={true} id={"choose-role-title"} className={"text-center"}>
                <Typography variant={"h4"}
                            className={"font-weight-bolder"}> {field ? "Edit" : "Add"} Terrain </Typography>
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.onClose()}>
                <CloseIcon/>
            </IconButton>
            <DialogContent className={"mb-3"}>
                <HorizontalStepper steps={steps} onComplete={() => props.onClose()}
                                   horizontalStepperHandleNext={horizontalStepperHandleNext}>
                    <CustomStep>
                        <form id={steps[0].actionForm} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        value={terrain.name}
                                        autoComplete="given-name"
                                        onChange={handleChange("name")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="bio"
                                        label="Say something..."
                                        multiline
                                        rows={6}
                                        fullWidth
                                        variant="outlined"
                                        value={terrain.description}
                                        onChange={handleChange("description")}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={"mt-3"}>
                                <SportRadioButton value={terrain.fieldFor} handleChange={handleChange("fieldFor")}/>
                            </Grid>
                        </form>
                    </CustomStep>
                    <CustomStep>
                        <form id={steps[1].actionForm} onSubmit={handleMediaSubmit}>
                            <DropzoneUploader files={terrainFiles}/>
                        </form>
                    </CustomStep>
                    <CustomStep>
                        {fieldPlayingIntervals && fieldPlayingIntervals.length > 0 &&
                            fieldPlayingIntervals.map(interval => <div key={interval.id}>
                                {interval.gameStartTime} asd sad
                            </div>)}
                        <form id={steps[2].actionForm} onSubmit={handlePlayingIntervalsSubmit}>
                            <Grid container>
                                <Grid item xl={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardDatePicker
                                            variant="inline"
                                            label="Since"
                                            format="DD/MM/YYYY"
                                            fullWidth
                                            className={"mt-2"}
                                            value={playingInterval.gameStartTime}
                                            InputAdornmentProps={{position: "start"}}
                                            onChange={handlePlayingIntervalChange("gameStartTime")}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item xl={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardDatePicker
                                            variant="inline"
                                            label="Since"
                                            format="DD/MM/YYYY"
                                            fullWidth
                                            className={"mt-2"}
                                            value={playingInterval.gameEndTime}
                                            InputAdornmentProps={{position: "start"}}
                                            onChange={handlePlayingIntervalChange("gameEndTime")}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>

                            <Button onClick={InsertPlayingGameInterval}>
                                Add Interval
                            </Button>
                        </form>
                    </CustomStep>
                </HorizontalStepper>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditTerrainModal;
