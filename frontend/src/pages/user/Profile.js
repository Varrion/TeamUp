import {Button, Card, CardContent, CardHeader, Grid, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {Gender, GetUser, usersRoute} from "../../services/UserService";
import NoPhotoFemale from "../../assets/images/GirlSiluethee.jpg";
import NoPhotoMale from "../../assets/images/BoySiluethe2.jpg";
import NoPhotoOther from "../../assets/images/OtherSiluethe.jpg";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CakeIcon from '@material-ui/icons/Cake';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import IconTextTypography from "../../components/IconTextTypography";
import UserEditModal from "./modal/UserEditModal";
import UploadShowProfilePicture from "../../components/pictures/UploadShowProfilePicture";
import {useAuthContext} from "../../components/AuthContext";
import SportsIcon from '@material-ui/icons/Sports';
import CreateEditTeamModal from "../team/modal/CreateEditTeamModal";
import {GetTeamsByMemberUsername} from "../../services/TeamService";
import {FileType, UploadFile} from "../../services/FileService";

const User = props => {
    const {loggedUser} = useAuthContext();
    const [user, setUser] = useState(null);
    const [isMemberOfTeam, setIsMemberOfTeam] = useState(false);
    const [memberTeams, setMemberTeams] = useState(null);
    const [toggleTeams, setToggleTeams] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [showTeamModal, setShowTeamModal] = useState(false);

    useEffect(() => {
        GetUser(props.username)
            .then(res => {
                const userData = res.data;

                console.log(userData.files.filter(file => file.fileType === FileType.Profile).splice(-1)[0]);

                setProfileImage(userData.files && userData.files.some(file => file.fileType === FileType.Profile)
                    && userData.files.filter(file => file.fileType === FileType.Profile).splice(-1)[0]);
                setUser(userData);

                GetTeamsByMemberUsername(props.username).then(r => {
                    setIsMemberOfTeam(!!r.data.length);
                    setMemberTeams(r.data);
                })
            })
    }, [showUpdateModal])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(usersRoute, user.username, formData, FileType.Profile)
            .then(r => console.log('vlagam tuka'))
    }

    return (user &&
        <Grid container>
            <Grid item xs={12} md={6} lg={4} className={"d-flex flex-column align-items-center justify-content-center"}>
                {!profileImage ? user.personalInfo.gender === Gender.Female ?
                        <UploadShowProfilePicture width={250} height={250} src={NoPhotoFemale} alt={Gender.Female}
                                                  onUpload={onFileUpload}/>
                        : user.personalInfo.gender === Gender.Male ?
                            <UploadShowProfilePicture width={250} height={250} src={NoPhotoMale} alt={Gender.Male}
                                                      onUpload={onFileUpload}/>
                            : <UploadShowProfilePicture width={250} height={250} src={NoPhotoOther} alt={Gender.Other}
                                                        onUpload={onFileUpload}/>
                    : <img src={profileImage.filePath} alt={"Profile"}/>}
                <Typography className={"mt-3"} color={"textSecondary"} variant={"h6"}>
                    @{user.username}
                </Typography>
                <Typography className={"mt-2"} variant={"h4"}>{user.name} {user.surname}</Typography>

                {!isMemberOfTeam ? <Button variant={"contained"} color={"secondary"}
                                           onClick={() => setShowTeamModal(true)}>
                        <SportsIcon/> Team Up
                    </Button>
                    : <Button variant={"contained"} color={"secondary"}
                              onClick={() => setToggleTeams(!toggleTeams)}>
                        <SportsIcon/> {toggleTeams ? "Profile Info" : "My Teams"}
                    </Button>}
            </Grid>
            {!toggleTeams ?
                <Grid item xs={12} md={6} lg={8}>
                    <Card>
                        <CardHeader title={"Personal Info"} action={
                            loggedUser === user.username && <IconButton onClick={() => setShowUpdateModal(true)}>
                                <EditOutlinedIcon/>
                            </IconButton>}/>
                        <CardContent className={"ml-3"}>
                            <IconTextTypography text={user.personalInfo?.address}
                                                caption={"Address"}
                                                icon={<HomeIcon/>}/>
                            <IconTextTypography text={user.personalInfo?.city}
                                                caption={"City"}
                                                class={"mt-3"}
                                                icon={<LocationCityIcon/>}/>
                            <IconTextTypography text={user.personalInfo?.email}
                                                caption={"Email"}
                                                class={"mt-3"}
                                                icon={<EmailIcon/>}/>
                            <IconTextTypography text={user.personalInfo?.phoneNumber}
                                                caption={"Phone"}
                                                class={"mt-3"}
                                                icon={<CallIcon/>}/>
                            <IconTextTypography text={user.personalInfo?.gender}
                                                caption={"Gender"}
                                                class={"mt-3"}
                                                icon={<PersonIcon/>}/>
                        </CardContent>
                    </Card>

                    <Card className={"mt-4"}>
                        <CardHeader title={"Bio"}/>
                        <CardContent>
                            <IconTextTypography
                                text={user.personalInfo?.dateOfBirth?.split('T')[0].split("-").reverse().join("-")}
                                caption={"Birth date"}
                                class={"ml-3"}
                                icon={<CakeIcon/>}/>
                            <Typography className={"mt-3"} variant={"body1"}>
                                {user.description ?? "Nothing here for now"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid> :
                <Grid item xs={12} md={6} lg={8}>
                    <Card>
                        <CardHeader title={"Leading team"} action={
                            loggedUser === user.username && <IconButton onClick={() => setShowUpdateModal(true)}>
                                <EditOutlinedIcon/>
                            </IconButton>}/>
                        <CardContent className={"ml-3"}>
                            <IconTextTypography text={user.personalInfo?.address}
                                                caption={"Address"}
                                                icon={<HomeIcon/>}/>
                        </CardContent>
                    </Card>

                    <Card className={"mt-4"}>
                        <CardHeader title={"Other teams"}/>
                        <CardContent>
                            <IconTextTypography
                                text={user.personalInfo?.dateOfBirth?.split('T')[0].split("-").reverse().join("-")}
                                caption={"Birth date"}
                                class={"ml-3"}
                                icon={<CakeIcon/>}/>
                            <Typography className={"mt-3"} variant={"body1"}>
                                {user.description ?? "Nothing here for now"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            }

            <UserEditModal profile={user} open={showUpdateModal}
                           onClose={() => setShowUpdateModal(false)}/>
            <CreateEditTeamModal team={user?.team} open={showTeamModal}
                                 onClose={() => setShowTeamModal(false)}/>

        </Grid>
    )
}

export default User;
