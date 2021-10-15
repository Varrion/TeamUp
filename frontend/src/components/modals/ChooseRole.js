import {Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@material-ui/core";
import RoleCard from "../cards/RoleCard";
import CloseIcon from '@material-ui/icons/Close';
import {UserRole as Role} from "../../services/UserService";
import useStyles from "../MaterialStyles";

const ChooseRole = (props) => {
    const classes = useStyles();

    const handleRole = role => {
        props.onClose();
        props.roleset(role);
    }

    return (
        <Dialog
            {...props}
            disableBackdropClick
            fullWidth={true}
            maxWidth={"lg"}
            aria-labelledby="choose-role-title"
        >
            <DialogTitle disableTypography={true} id={"choose-role-title"} className={"text-center"}>
                <Typography variant={"h4"} className={"font-weight-bolder"}> Choose your
                    team </Typography></DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.onClose()}>
                <CloseIcon/>
            </IconButton>
            <DialogContent className={"mb-3"}>
                <Grid container spacing={2}>
                    <Grid className={"border-effect"} onClick={() => handleRole(Role.User)} item md={6} lg={6} xs={12}>
                        <RoleCard isOwner={false} chooseRole={true}/>
                    </Grid>
                    <Grid className={"border-effect"} onClick={() => handleRole(Role.LocationOwner)} item md={6} lg={6}
                          xs={12}>
                        <RoleCard isOwner={true} chooseRole={true}/>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default ChooseRole;
