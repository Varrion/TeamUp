import {
    Box, Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton, InputLabel, MenuItem, OutlinedInput, Select,
    TextField,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import {useEffect, useState} from "react";
import useStyles from "../../../components/MaterialStyles";
import {useAuthContext} from "../../../configurations/AuthContext";
import {GetAllUsers, UserRole} from "../../../services/UserService";
import StyledTextField from "../../../components/StyledTextField";
import {CreateTeam, DeleteTeam, EditTeam} from "../../../services/TeamService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CreateEditTeamModal = (props) => {
    const classes = useStyles();
    const {loggedUser} = useAuthContext();
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        GetAllUsers(UserRole.User)
            .then(response => setPlayers(response.data))
    }, [])

    const [team, setTeam] = useState({
        name: props.team?.name ?? "",
        description: props.team?.description ?? "",
        maxSize: props.team?.size ?? 2,
        teamLead: props.team?.teamLead ?? loggedUser,
        membersUsernames: props.team?.teamMembers.map(teamMember => teamMember.user.username) ?? [loggedUser]
    });

    const handleChange = name => event => {
        if (name === "membersUsernames") {
            if (team.maxSize < event.target.value.length) {
                return;
            }
        }

        if (name === "maxSize" && event.target.value < team.membersUsernames.length) {
            return;
        }

        setTeam({...team, [name]: event.target.value});
    };

    const handleDelete = () => {
        DeleteTeam(props.team.id)
            .then(() => props.onClose(true));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (props.team) {
            EditTeam(props.team.id, team)
                .then(() => props.onClose())
        } else {
            CreateTeam(team)
                .then(() => props.onClose())
                .catch(err => console.log(err))
        }
    }

    return (
        <Dialog
            disableBackdropClick
            fullWidth={true}
            maxWidth={"md"}
            {...props}
            aria-labelledby="choose-role-title"
        >
            <DialogTitle disableTypography={true} id={"choose-role-title"} className={"text-center"}>
                <Typography variant={"h4"}
                            className={"font-weight-bolder"}> {props.team ? "Update Team " : "Create Team"}  </Typography>
            </DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.onClose()}>
                <CloseIcon/>
            </IconButton>
            <DialogContent className={"mb-3"}>
                <form onSubmit={handleSubmit}>
                    <Grid container direction={"column"}>
                        <Grid item xs={12} className={"mb-4"}>
                            <TextField
                                required
                                id="name"
                                label="Name"
                                fullWidth
                                value={team.name}
                                onChange={handleChange("name")}
                            />
                        </Grid>
                        <Grid container alignItems={"center"} justify={"center"} className={"mb-4"}>
                            <Grid item xs={2}>
                                <StyledTextField
                                    id="maxSize"
                                    inputProps={{min: 2, style: {textAlign: 'center'}}}
                                    name="maxSize"
                                    label="Team Size"
                                    type={"number"}
                                    fullWidth
                                    value={team.maxSize}
                                    onChange={handleChange("maxSize")}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={"mb-4"}>
                            <TextField
                                id="info"
                                label="Team Info"
                                multiline
                                rows={8}
                                fullWidth
                                variant="outlined"
                                value={team.description}
                                onChange={handleChange("description")}
                            />
                        </Grid>
                        <Grid item xs={12} className={"d-flex justify-content-center align-items-center"}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-multiple-chip-label" className={"pl-3"}>Members</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={team.membersUsernames}
                                    onChange={handleChange("membersUsernames")}
                                    input={<OutlinedInput id="select-multiple-chip" label="Members"/>}
                                    MenuProps={MenuProps}
                                    renderValue={(selected) => (
                                        <Box>
                                            {selected.map((value) => (
                                                <Chip className={"m-1"} key={value} label={value}/>
                                            ))}
                                        </Box>
                                    )}>
                                    {players && players.length > 0 && players.map(player => (
                                        <MenuItem
                                            disabled={player.username === loggedUser}
                                            key={player.id}
                                            value={player.username}>
                                            {<div>
                                                <span
                                                    className={"text-secondary font-italic"}>({player.username}) </span>
                                                <span>{player.name} {player.surname}</span>
                                            </div>}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                            <Grid item lg={6} className={"text-right"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    {props.team ? "Update" : "Create"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditTeamModal;
