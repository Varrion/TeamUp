import {Button, Grid} from "@material-ui/core";
import {Gender, UserRole} from "../../services/UserService";
import UploadShowProfilePicture from "../pictures/UploadShowProfilePicture";
import NoPhotoFemale from "../../assets/images/GirlSiluethee.jpg";
import NoPhotoMale from "../../assets/images/BoySiluethe2.jpg";
import NoPhotoOther from "../../assets/images/OtherSiluethe.jpg";
import Typography from "@material-ui/core/Typography";
import SportsIcon from "@material-ui/icons/Sports";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from '@material-ui/icons/Business';
import React from "react";

const ProfileLeftDetailsGrid = ({
                                    user,
                                    isMemberOfTeam,
                                    isLocationOwner,
                                    profileImage,
                                    onFileUpload,
                                    toggleTeams,
                                    showTeamModal,
                                    showLocationModal,
                                    toggleTeamsView
                                }) => {
    return (
        <Grid item xs={12} md={6} lg={4} className={"d-flex flex-column align-items-center justify-content-start"}>
            {!profileImage ? user.gender === Gender.Female ?
                    <UploadShowProfilePicture width={250} height={250} src={NoPhotoFemale} alt={Gender.Female}
                                              onUpload={onFileUpload}/>
                    : user.gender === Gender.Male ?
                        <UploadShowProfilePicture width={250} height={250} src={NoPhotoMale} alt={Gender.Male}
                                                  onUpload={onFileUpload}/>
                        : <UploadShowProfilePicture width={250} height={250} src={NoPhotoOther} alt={Gender.Other}
                                                    onUpload={onFileUpload}/>
                : <img className={"mt-4"} src={profileImage.filePath} alt={"Profile"}/>}
            <Typography className={"mt-3"} color={"textSecondary"} variant={"h6"}>
                @{user.username}
            </Typography>
            <Typography className={"mt-2 mb-2"} variant={"h4"}>{user.name} {user.surname}</Typography>

            {user.role === UserRole.User ? <>
                    {!isMemberOfTeam ? <Button variant={"contained"} color={"secondary"}
                                               onClick={showTeamModal}>
                            <SportsIcon/> Team Up {user.role}
                        </Button>
                        : <Button variant={"contained"} color={"secondary"}
                                  onClick={toggleTeamsView}>
                            {toggleTeams ? <><PersonIcon/> Profile Info </> : <> <SportsIcon/> My Teams</>}
                        </Button>
                    }
                </> :
                <> <Button variant={"contained"} color={"secondary"}
                           onClick={showLocationModal}>
                    {!isLocationOwner ? <><BusinessIcon/> Create Business </> : <> <BusinessIcon/> My Business</>}
                </Button></>}
        </Grid>
    )
}

export default ProfileLeftDetailsGrid;