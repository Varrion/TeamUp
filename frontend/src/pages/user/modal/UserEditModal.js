import {Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../../components/MaterialStyles";

const UserEditModal = (props) => {
    const classes = useStyles();

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

            </DialogContent>
        </Dialog>
    )
}

export default UserEditModal;
