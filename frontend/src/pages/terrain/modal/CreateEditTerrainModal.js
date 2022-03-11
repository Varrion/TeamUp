import {Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useRef, useState} from "react";
import useStyles from "../../../components/MaterialStyles";
import {AddTerrain, EditTerrain, FieldType, terrainRoute} from "../../../services/PlayingFieldService";
import SportRadioButton from "../../../components/SportRadioButton";
import HorizontalStepper from "../../../components/stepper/HorizontalStepper";
import CustomStep from "../../../components/stepper/StepContent";
import DropzoneUploader from "../../../components/dropzone/DropzoneUploader";
import {BulkUploadFiles} from "../../../services/FileService";

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
        }]

    const horizontalStepperHandleNext = useRef(null);

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

    const handleMediaSubmit = event => {
        event.preventDefault();
        let formData = new FormData();
        terrainFiles.forEach(file => formData.append("files", file))
        BulkUploadFiles(terrainRoute, terrainId, formData)
            .then(() => props.onClose())
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
                        <form id={"terrain-info"} onSubmit={handleSubmit}>
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
                        <form id={"terrain-media"} onSubmit={handleMediaSubmit}>
                            <DropzoneUploader files={terrainFiles}/>
                        </form>
                    </CustomStep>
                </HorizontalStepper>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditTerrainModal;
