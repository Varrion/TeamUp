import React, {useEffect, useState} from "react";
import {GetOneLocation} from "../../services/LocationService";
import {Grid, Typography} from "@material-ui/core";
import GoogleMap from "../../components/maps/GoogleMap";
import IconTextTypography from "../../components/IconTextTypography";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import CakeIcon from "@material-ui/icons/Cake";
import UploadShowProfilePicture from "../../components/pictures/UploadShowProfilePicture";
import NoPhotoFemale from "../../assets/images/GirlSiluethee.jpg";
import {Gender} from "../../services/UserService";
import {useAuthContext} from "../../configurations/AuthContext";
import CreateEditLocationModal from "./modal/CreateEditLocationModal";
import Button from "@material-ui/core/Button";

const LocationDetails = ({id}) => {
    const {isAuthorized} = useAuthContext();
    const [location, setLocation] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    useEffect(() => {
        GetOneLocation(id).then(r => {
            setLocation(r.data);
            console.log(r.data);
        })
    }, [id, openUpdateModal])

    return (location &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid container alignItems={"center"} justify={"space-evenly"}>
                <Grid item lg={2}>
                    <UploadShowProfilePicture width={200} height={200} src={NoPhotoFemale} alt={Gender.Female}/>
                </Grid>
                <Grid item lg={10}>
                    <Typography variant={"h2"}>
                        {location.name}
                        {isAuthorized(location.owner?.username) &&
                            <Button onClick={() => setOpenUpdateModal(true)} className={"float-right"}>Edit</Button>}
                    </Typography>

                    <Typography className={"mt-3"} variant={"body1"}>
                        {location.description ?? "Nothing here for now"}
                    </Typography>
                </Grid>
            </Grid>
            <Grid className={"p-4"} container alignItems={"baseline"} justify={"space-between"}>
                <IconTextTypography text={location?.address}
                                    caption={"Address"}
                                    icon={<HomeIcon/>}/>
                <IconTextTypography text={location?.city}
                                    caption={"City"}
                                    class={"mt-3"}
                                    icon={<LocationCityIcon/>}/>
                <IconTextTypography text={location?.email}
                                    caption={"Email"}
                                    class={"mt-3"}
                                    icon={<EmailIcon/>}/>
                <IconTextTypography text={location?.phoneNumber}
                                    caption={"Phone"}
                                    class={"mt-3"}
                                    icon={<CallIcon/>}/>
                <IconTextTypography
                    text={location?.dateOfBirth?.split('T')[0].split("-").reverse().join("-")}
                    caption={"Since"}
                    class={"ml-3"}
                    icon={<CakeIcon/>}/>
            </Grid>


            <GoogleMap height={"600px"} latitude={location.latitude} longitude={location.longitude}
                       hideLongitudeLatitude={true}/>

            <hr/>

            <Typography variant={"h5"}>
                Terrains
            </Typography>

            {openUpdateModal &&
                <CreateEditLocationModal location={location} open={openUpdateModal}
                                         onClose={() => setOpenUpdateModal(false)}/>}
        </Grid>
    )
}

export default LocationDetails;
