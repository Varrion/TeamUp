import {Card, CardContent, CardHeader, Grid, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {Gender, GetUser, GetUserFile, UploadFile} from "../../services/UserService";
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
import UploadPhotoIcon from "../../components/pictures/UploadPhotoIcon";
import UploadShowProfilePicture from "../../components/pictures/UploadShowProfilePicture";

const User = props => {
    const [user, setUser] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [myImage, setMyImage] = useState(null)

    useEffect(() => {
        GetUser(props.username)
            .then(res => {
                setUser(res.data);
                console.log(res.data);
                // GetUserFile(props.username)
                //     .then((r) => {
                //         console.log(r.data.filter(x => x.fileType === "image/jpeg")[0].filePath);
                //         setMyImage(r.data.filter(x => x.fileType === "image/jpeg")[0].filePath);
                //     })
            })
    }, [showUpdateModal])

    const onFileUpload = (event) => {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        UploadFile(user.username, formData)
            .then(r => console.log('vlagam tuka'))
    }

    return (user &&
        <Grid container>
            <Grid item xs={12} md={6} lg={4} className={"d-flex flex-column align-items-center justify-content-center"}>
                {!myImage ? user.personalInfo.gender === Gender.Female ?
                        <UploadShowProfilePicture width={250} height={250} src={NoPhotoFemale} alt={Gender.Female}
                                                  onUpload={onFileUpload}/>
                        : user.personalInfo.gender === Gender.Male ?
                            <UploadShowProfilePicture width={250} height={250} src={NoPhotoMale} alt={Gender.Male}
                                                      onUpload={onFileUpload}/>
                            : <UploadShowProfilePicture width={250} height={250} src={NoPhotoOther} alt={Gender.Other}
                                                        onUpload={onFileUpload}/>
                    : <img src={myImage} alt={"User Photo"}/>}
                <Typography className={"mt-3"} color={"textSecondary"} variant={"h6"}>
                    @{user.username}
                </Typography>
                <Typography className={"mt-2"} variant={"h4"}>{user.name} {user.surname}</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Card>
                    <CardHeader title={"Personal Info"} action={
                        <IconButton onClick={() => setShowUpdateModal(true)}>
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
            </Grid>
            {
                showUpdateModal &&
                <UserEditModal profile={user} open={showUpdateModal}
                               onClose={() => setShowUpdateModal(false)}/>
            }
        </Grid>
    )
}

export default User;
