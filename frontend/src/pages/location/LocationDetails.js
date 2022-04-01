import React, {useEffect, useState} from "react";
import {DeleteLocation, GetOneLocation} from "../../services/LocationService";
import {Grid, Grow, IconButton, Tooltip, Typography} from "@material-ui/core";
import GoogleMap from "../../components/maps/GoogleMap";
import UploadShowProfilePicture from "../../components/pictures/UploadShowProfilePicture";
import {useAuthContext} from "../../configurations/AuthContext";
import CreateEditLocationModal from "./modal/CreateEditLocationModal";
import CreateEditTerrainModal from "../terrain/modal/CreateEditTerrainModal";
import {GetAllTerrainsForLocation} from "../../services/PlayingFieldService";
import TerrainCard from "../../components/cards/TerrainCard";
import {AddCircle, Delete, EditLocation} from "@material-ui/icons";
import SplitButton from "../../components/buttons/SplitButton";
import {FileType, GetLastFilePath} from "../../services/FileService";
import LocationInfoGrid from "../../components/grids/LocationInfoGrid";

const LocationDetails = ({id}) => {
    const {isAuthorized} = useAuthContext();
    const [location, setLocation] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openUpdateTerrainModal, setOpenUpdateTerrainModal] = useState(false);
    const [checked, setChecked] = React.useState(false);

    const [terrains, setTerrains] = useState(null)

    const onLocationDelete = () => {
        return DeleteLocation(location.id)
        // .then(() => navigate("/"));
    }

    const locationMenuButtonActions = [
        {
            text: <><Delete/> Delete </>,
            action: () => onLocationDelete()
        }]


    useEffect(() => {
        GetOneLocation(id).then(r => {
            setLocation(r.data);
        })
    }, [id, openUpdateModal, openUpdateTerrainModal])

    useEffect(() => {
        if (!location) {
            return;
        }
        GetAllTerrainsForLocation(location.id).then(r => {
            setTerrains(r.data);
            setChecked(true);
        });
    }, [location, openUpdateTerrainModal])


    return (location &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid container alignItems={"center"} justify={"space-between"}>
                <Grid item lg={2}>
                    <UploadShowProfilePicture width={200} height={200} src={GetLastFilePath(location.files)}
                                              alt={FileType.Profile}/>
                </Grid>
                <Grid item lg={10}>
                    <Typography variant={"h1"}> {location.name}
                        {isAuthorized(location.owner?.username.trim()) &&
                            <SplitButton buttonColor={"secondary"} buttonVariant={"contained"}
                                         text={<><EditLocation/> Edit</>}
                                         menuOptions={locationMenuButtonActions}
                                         classes={"float-right"}
                                         mainOption={() => setOpenUpdateModal(true)}
                            />
                        }
                    </Typography>

                    <Typography className={"mt-3"} variant={"body1"}>
                        {location.description ?? "Nothing here for now"}
                    </Typography>
                </Grid>
            </Grid>

            <LocationInfoGrid location={location}/>
            <GoogleMap height={"600px"} latitude={location.latitude} longitude={location.longitude}
                       hideLongitudeLatitude={true}/>

            <Typography variant={"h2"}> Terrains </Typography>
            <hr className={"horizontal-fancy"}/>

            <Grid container justify={"flex-end"}>
                {isAuthorized(location.owner?.username.trim()) &&
                    <Tooltip title={"Add"} placement={"left"}>
                        <IconButton color="inherit" onClick={() => setOpenUpdateTerrainModal(true)}><AddCircle
                            fontSize="large"/></IconButton>
                    </Tooltip>}
            </Grid>

            <Grid container>
                {terrains && terrains.map((terrain, index) => <Grow key={index}
                                                                    in={checked}
                                                                    style={{transformOrigin: '0 0 0'}}
                                                                    {...(checked ? {timeout: 5000} : {})}>
                    <Grid item lg={4} xs={6}>
                        <TerrainCard terrain={terrain}/>
                    </Grid>
                </Grow>)}
            </Grid>

            {openUpdateModal &&
                <CreateEditLocationModal location={location} open={openUpdateModal}
                                         onClose={() => setOpenUpdateModal(false)}/>}

            {openUpdateTerrainModal &&
                <CreateEditTerrainModal open={openUpdateTerrainModal}
                                        onClose={() => setOpenUpdateTerrainModal(false)}
                                        locationId={location.id}/>}
        </Grid>
    )
}

export default LocationDetails;
