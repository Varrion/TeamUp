import {Grid, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MissingMember from "../../assets/images/MissingPlayer.png";
import {GetLastFilePath} from "../../services/FileService";

const TeamMemberGrid = ({team}) => {
    const calculateMissingMembers = () => {
        if (team) {
            const missingMembers = [];
            let iterator = team.currentMembersNumber;

            while (iterator < team.size) {
                if (iterator > 6) {
                    break;
                }
                missingMembers.push(iterator)
                iterator++;
            }

            return missingMembers;
        }
    }

    const missingMembersNumber = calculateMissingMembers();

    return (
        <Grid container justify={"flex-start"}>
            {team?.teamMembers?.map(teamMember => <Grid key={teamMember?.user.id} item lg={3}>
                <Avatar className={"profile-avatar"}
                        src={GetLastFilePath(teamMember?.user?.files, MissingMember)}/>
                <span>{teamMember.user?.name}</span>
            </Grid>)}
            {missingMembersNumber != null && missingMembersNumber.length > 0 &&
                <>
                    {missingMembersNumber.map((value, index) =>
                        <Grid item lg={3}
                              key={index}>
                            <Avatar className={"profile-avatar"} src={MissingMember}/>
                        </Grid>)
                    }
                    {team.size > 6 &&
                        <Grid className={"d-flex align-items-end justify-content-center"} item lg={3}>
                            <Typography
                                variant={"h6"}> {`...${team.currentMembersNumber}/${team.size}`} </Typography>
                        </Grid>}
                </>
            }
        </Grid>
    )
}

export default TeamMemberGrid;