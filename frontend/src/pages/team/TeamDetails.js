import React, {useEffect, useState} from "react";
import {GetOneTeam, teamsRoute} from "../../services/TeamService";
import {Card, CardContent, CardHeader, Grid, IconButton} from "@material-ui/core";
import UploadShowProfilePicture from "../../components/pictures/UploadShowProfilePicture";
import NoPhotoFemale from "../../assets/images/GirlSiluethee.jpg";
import {FileType, UploadFile} from "../../services/FileService";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TeamMemberGrid from "../../components/grids/TeamMemberGrid";
import {useAuthContext} from "../../components/AuthContext";

const TeamDetails = ({id}) => {
    const {loggedUser} = useAuthContext();
    const [isLoggedUserTeamLead, setIsLoggedUserTeamLead] = useState(false);
    const [showUpdateTeamModal, setShowUpdateTeamModal] = useState(false);
    const [team, setTeam] = useState(null);

    useEffect(() => {
        GetOneTeam(id)
            .then(res => {
                setTeam(res.data);
                const teamLead = res.data?.teamMembers.find(member => member.isTeamLead);
                setIsLoggedUserTeamLead(teamLead?.user.username === loggedUser);
            })
    }, [isLoggedUserTeamLead, showUpdateTeamModal])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(teamsRoute, team.id, formData, FileType.Profile)
            .then(r => console.log('vlagam tuka'))
    }

    return (team &&
        <Grid container>
            <UploadShowProfilePicture width={250} height={250} src={NoPhotoFemale} alt={"Logo"}
                                      onUpload={onFileUpload}/>
            {isLoggedUserTeamLead && <IconButton onClick={showUpdateTeamModal}>
                <EditOutlinedIcon/>
            </IconButton>}
            <Avatar className={"profile-avatar"} src={'https://i.pravatar.cc/300'}/>
            <Typography variant={"h5"}
                        className={"font-weight-bold"}>{team.name}
            </Typography>
            <Typography className={"text-left mb-2"} variant={"subtitle1"}>
                {team.description}
            </Typography>

            <TeamMemberGrid team={team}/>

        </Grid>
    )
}

export default TeamDetails;
