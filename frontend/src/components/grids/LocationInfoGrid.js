import { Grid } from "@material-ui/core";
import IconTextTypography from "../IconTextTypography";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import CakeIcon from "@material-ui/icons/Cake";
import React from "react";

const LocationInfoGrid = ({ location, singleRow = false }) =>
    <Grid className={"p-4"} container alignItems={"center"}
        justify={"space-between"}>
        <Grid item xs={singleRow ? 2 :  12} className={"mb-2"}>
            <IconTextTypography text={location?.address}
                caption={"Address"}
                class={"d-flex align-items-center"}
                icon={<HomeIcon />} />
        </Grid>
        <Grid item xs={singleRow ? 2 : 12} className={"mb-2"} >
            <IconTextTypography text={location?.city}
                caption={"City"}
                class={"d-flex align-items-center"}
                icon={<LocationCityIcon />} />
        </Grid>
        <Grid item xs={singleRow ? 2 : 12} className={"mb-2"}>
            <IconTextTypography text={location?.email}
                caption={"Email"}
                class={"d-flex align-items-center"}
                icon={<EmailIcon />} />
        </Grid>
        <Grid item xs={singleRow ? 2 : 12} className={"mb-2"}>
            <IconTextTypography text={location?.phoneNumber}
                caption={"Phone"}
                class={"d-flex align-items-center"}
                icon={<CallIcon />} />
        </Grid>
        <Grid item xs={singleRow ? 2 : 12} className={"mb-2"}>
            <IconTextTypography
                text={location?.dateOfBirth?.split('T')[0].split("-").reverse().join("-")}
                caption={"Since"}
                class={"d-flex align-items-center"}
                icon={<CakeIcon />} />
        </Grid>
    </Grid>

export default LocationInfoGrid;