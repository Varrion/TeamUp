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
import {Gender} from "../../../services/UserService";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import useStyles from "../../../components/MaterialStyles";
import {AddTerrain, EditTerrain} from "../../../services/PlayingFieldService";

const CreateEditTerrainModal = ({field, locationId, ...props}) => {
    const classes = useStyles();
    const [terrain, setTerrain] = useState({
        name: field.name ?? "",
        description: field.description ?? "",
        fieldType: field.fieldType ?? "",
        fieldFor: field.fieldFor ?? ""
    });

    const handleChange = name => event => {
        setTerrain({...terrain, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        terrain ? EditTerrain(terrain)
                .then(() => {
                    return props.onClose()
                })
            : AddTerrain(terrain, locationId)
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
                <CloseIcon/>
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
                                value={terrain.name}
                                autoComplete="given-name"
                                onChange={handleChange("name")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="bio"
                                label="Bio"
                                multiline
                                rows={5}
                                fullWidth
                                variant="outlined"
                                value={terrain.description}
                                onChange={handleChange("description")}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={"text-right"}>
                        <Button
                            type="submit"
                            variant="contained"
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

export default CreateEditTerrainModal;
