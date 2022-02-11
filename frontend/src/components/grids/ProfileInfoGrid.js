import {Card, CardContent, CardHeader, Grid, IconButton} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import IconTextTypography from "../IconTextTypography";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import PersonIcon from "@material-ui/icons/Person";
import CakeIcon from "@material-ui/icons/Cake";
import Typography from "@material-ui/core/Typography";
import React from "react";

const ProfileInfoGrid = ({user, loggedUser, showUpdateInfoModal}) => {
    return (
        <Grid item xs={12} md={6} lg={8}>
            <Card>
                <CardHeader title={"Personal Info"} action={
                    loggedUser === user.username && <IconButton onClick={showUpdateInfoModal}>
                        <EditOutlinedIcon/>
                    </IconButton>}/>
                <CardContent className={"ml-3"}>
                    <IconTextTypography text={user?.address}
                                        caption={"Address"}
                                        icon={<HomeIcon/>}/>
                    <IconTextTypography text={user?.city}
                                        caption={"City"}
                                        class={"mt-3"}
                                        icon={<LocationCityIcon/>}/>
                    <IconTextTypography text={user?.email}
                                        caption={"Email"}
                                        class={"mt-3"}
                                        icon={<EmailIcon/>}/>
                    <IconTextTypography text={user?.phoneNumber}
                                        caption={"Phone"}
                                        class={"mt-3"}
                                        icon={<CallIcon/>}/>
                    <IconTextTypography text={user?.gender}
                                        caption={"Gender"}
                                        class={"mt-3"}
                                        icon={<PersonIcon/>}/>
                </CardContent>
            </Card>

            <Card className={"mt-4"}>
                <CardHeader title={"Bio"}/>
                <CardContent>
                    <IconTextTypography
                        text={user?.dateOfBirth?.split('T')[0].split("-").reverse().join("-")}
                        caption={"Birth date"}
                        class={"ml-3"}
                        icon={<CakeIcon/>}/>
                    <Typography className={"mt-3"} variant={"body1"}>
                        {user.description ?? "Nothing here for now"}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ProfileInfoGrid;