import {Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {useEffect, useRef, useState} from "react";
import useStyles from "../../../components/MaterialStyles";
import {
    AddLocationTerrain,
    AddPublicTerrain,
    EditTerrain,
    FieldType,
    GetTerrain,
    Sport,
    terrainRoute
} from "../../../services/PlayingFieldService";
import SportRadioButton from "../../../components/SportRadioButton";
import HorizontalStepper from "../../../components/stepper/HorizontalStepper";
import CustomStep from "../../../components/stepper/StepContent";
import DropzoneUploader from "../../../components/dropzone/DropzoneUploader";
import {BulkUploadFiles} from "../../../services/FileService";
import convertUrlToImageData from "../../../services/convertUrlToImageData";
import {useToasts} from "react-toast-notifications";

const CreateEditTerrainModal = ({field, locationId = null, onIntervalUpdate, ...props}) => {
    const {addToast} = useToasts();
    const classes = useStyles();
    const [terrain, setTerrain] = useState({
        name: field?.name ?? "",
        description: field?.description ?? "",
        fieldType: locationId ? FieldType.Private.toString() : FieldType.Public.toString(),
        fieldFor: field?.fieldFor ?? Sport.Other
    });

    const [terrainId, setTerrainId] = useState(field?.id ?? null);
    const [filesTerrain, setFilesTerrain] = useState([]);

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

    useEffect(() => {
        terrainId &&
        GetTerrain(terrainId).then(r => {
            const files = r.data.files;

            files && files.length > 0 && files.forEach(file => {

                convertUrlToImageData(file.filePath)
                    .then(fileData => {
                        fetch(fileData).then(res => {
                            res.arrayBuffer().then(buf => {
                                const fileObj = new File([buf], file.filePath, {type: file.contentType});
                                setFilesTerrain(filesTerrain => ([...filesTerrain, fileObj]));
                            })
                        })
                    });
            })
        })
    }, [terrainId])

    const handleChange = name => event => {
        setTerrain({...terrain, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        field ? EditTerrain(terrain, field.id)
                .then(() => horizontalStepperHandleNext.current())
            : locationId ? AddLocationTerrain(terrain, locationId)
                    .then((res) => {
                        setTerrainId(res.data);
                        horizontalStepperHandleNext.current()
                    })
                : AddPublicTerrain(terrain)
                    .then(res => {
                        setTerrainId(res.data);
                        horizontalStepperHandleNext.current()
                    })

    }

    const handleMediaSubmit = event => {
        event.preventDefault();
        let formData = new FormData();

        filesTerrain.forEach(file => formData.append("files", file))
        BulkUploadFiles(terrainRoute, terrainId, formData)
            .then(() => {
                    props.onClose();
                    addToast('REMINDER: Intervals for playing will be automatically be generated for the next 2 weeks.', {appearance: 'success'});
                }
            )
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
                            className={"font-weight-bolder"}> {field ? "Edit" : "Add"} {locationId ? FieldType.Private : FieldType.Public} Terrain </Typography>
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
                            <DropzoneUploader files={filesTerrain} setFiles={setFilesTerrain}/>
                        </form>
                    </CustomStep>
                </HorizontalStepper>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditTerrainModal;
