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
import SplitButton from "../buttons/SplitButton";
import {Delete, EditLocationOutlined} from "@material-ui/icons";
import {navigate} from "@reach/router";
import {useAuthContext} from "../../configurations/AuthContext";

const ProfileLeftDetailsGrid = ({
                                    user,
                                    isMemberOfTeam,
                                    isTeamLeader,
                                    ownedLocation,
                                    profileImage,
                                    onFileUpload,
                                    toggleTeams,
                                    showTeamModal,
                                    showLocationModal,
                                    toggleTeamsView,
                                    onLocationDelete
                                }) => {
    const {isAuthorized} = useAuthContext();
    const locationMenuButtonActions = [
        {
            text: <><EditLocationOutlined/> Update </>,
            action: () => showLocationModal()
        },
        {
            text: <><Delete/> Delete </>,
            action: () => onLocationDelete()
        }]

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Grid container alignItems={"center"} direction={"column"}>
                {!profileImage ?
                    <UploadShowProfilePicture width={250} height={250}
                                              src={user.gender === Gender.Female ? NoPhotoFemale : user.gender === Gender.Male ? NoPhotoMale : NoPhotoOther}
                                              alt={user.gender}
                                              onUpload={onFileUpload}/>
                    : <img className={"mt-4"} src={profileImage.filePath} alt={"Profile"}/>}
                <Typography className={"mt-3"} color={"textSecondary"} variant={"h6"}>
                    @{user.username}
                </Typography>
                <Typography className={"mt-2 mb-2"} variant={"h4"}>{user.name} {user.surname}</Typography>

                {isAuthorized(user.username) ? <>
                        {user.role === UserRole.User ? <>
                                {!isMemberOfTeam ? <Button variant={"contained"} color={"secondary"}
                                                           onClick={showTeamModal}>
                                        <SportsIcon/> Team Up
                                    </Button>
                                    : <Button variant={"contained"} color={"secondary"}
                                              onClick={toggleTeamsView}>
                                        {toggleTeams ? <><PersonIcon/> Profile Info </> : <> <SportsIcon/> My Teams</>}
                                    </Button>
                                }
                            </> :
                            <>
                                {!ownedLocation
                                    ? <Button variant={"contained"} color={"secondary"} onClick={showLocationModal}>Create
                                        Business</Button>
                                    : <SplitButton buttonColor={"secondary"} buttonVariant={"contained"}
                                                   text={<><BusinessIcon/> My Business</>}
                                                   menuOptions={locationMenuButtonActions}
                                                   mainOption={() => navigate(`/locations/${ownedLocation.id}`)}
                                    />
                                }
                            </>}
                    </>
                    : isTeamLeader && <Button>Test</Button>}
            </Grid>
        </Grid>
    )
}

export default ProfileLeftDetailsGrid;