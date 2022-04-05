import {Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {useState} from "react";
import CreateUpdatePlayingIntervalForm from "../intervals/CreateUpdatePlayingIntervalForm";
import {ReserveClosePlayingInterval} from "../../../services/PlayingIntervalService";
import useStyles from "../../../components/MaterialStyles";
import {FieldStatus} from "../../../services/PlayingFieldService";
import {useToasts} from "react-toast-notifications";
import moment from "moment";

const CreateEditPlayingIntervalModal = ({terrainId, playingInterval, isEdit, ...props}) => {
    const classes = useStyles();
    const {addToast} = useToasts();

    const [interval, setInterval] = useState({
        gameStartTime: playingInterval?.gameStartTime ?? new Date(),
        gameEndTime: playingInterval?.gameEndTime ?? new Date(),
        fieldStatus: playingInterval?.fieldStatus ?? FieldStatus.Open
    })

    const handleSubmit = event => {
        event.preventDefault();

        ReserveClosePlayingInterval(terrainId, interval)
            .then(() => {
                props.onClose();
                addToast('Successfully added playing interval', {appearance: 'success'});
            })
    }

    const handleChange = name => event => {
        if (name === "fieldStatus") {
            setInterval({...interval, fieldStatus: event.target.value})
            return;
        }

        setInterval({...interval, [name]: moment(event.toDate()).utc().format("DD.MM.YYYY HH:mm")});
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
                            className={"font-weight-bolder"}> {isEdit ? "Edit" : "Add"} Playing Interval </Typography>
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.onClose()}>
                <CloseIcon/>
            </IconButton>
            <DialogContent className={"mb-3"}>
                <CreateUpdatePlayingIntervalForm ButtonText={`${isEdit ? "Edit" : "Add"} interval`}
                                                 ButtonType={"submit"}
                                                 formSubmit={handleSubmit}
                                                 handlePlayingIntervalChange={handleChange}
                                                 playingInterval={interval}/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditPlayingIntervalModal