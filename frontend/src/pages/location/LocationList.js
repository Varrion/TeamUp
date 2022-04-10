import React, { useEffect, useState } from "react";
import { GetAllLocations } from "../../services/LocationService";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import LocationCard from "../../components/cards/LocationCard";
import { AddCircle } from "@material-ui/icons";
import { useAuthContext } from "../../configurations/AuthContext";
import { UserRole } from "../../services/UserService";
import CreateEditTerrainModal from "../terrain/modal/CreateEditTerrainModal";
import { FieldType, GetAllTerrains } from "../../services/PlayingFieldService";
import TerrainCard from "../../components/cards/TerrainCard";

const LocationList = ({ locationId }) => {
    const { loggedUserRole } = useAuthContext();
    const [locations, setLocations] = useState(null);
    const [publicTerrains, setPublicTerrains] = useState(null);
    const [createCustomTerrainModal, setCreateCustomTerrainModal] = useState(false);

    useEffect(() => {
        GetAllLocations(locationId).then(r => setLocations(r.data))
        GetAllTerrains(FieldType.Public).then(r => setPublicTerrains(r.data))
    }, [locationId])

    return (
        <Grid>
            <Typography variant={"h2"} align={"center"}>Locations</Typography>
            <hr className={"horizontal-fancy"} />
            {locations &&
                <Grid container >
                    {locations && locations.length > 0 &&
                        locations.map(location => <Grid item xs={12} md={6} lg={4}
                            key={location.id}>
                            <LocationCard location={location} />
                        </Grid>)}
                </Grid>}

            {publicTerrains &&
                <Grid container direction={"column"} className={"mt-5"}>
                    <Typography variant={"h2"} align={"center"}>Public Terrains</Typography>
                    <hr className={"horizontal-fancy"} />

                    <Grid container justify={"flex-end"}>
                        {loggedUserRole === UserRole.User &&
                            <Tooltip title={"Public Terrain"} placement={"left"}>
                                <IconButton color="inherit" onClick={() => setCreateCustomTerrainModal(true)}><AddCircle
                                    fontSize="large" /></IconButton>
                            </Tooltip>}
                    </Grid>

                    {publicTerrains && publicTerrains.length > 0 &&
                        publicTerrains.map(terrain => <Grid item md={4} sm={6}
                            key={terrain.id}>
                            <TerrainCard terrain={terrain} />
                        </Grid>)}
                </Grid>}

            {createCustomTerrainModal && <CreateEditTerrainModal open={createCustomTerrainModal}
                onClose={() => setCreateCustomTerrainModal(false)} />}
        </Grid>
    )
}

export default LocationList;