import React, {useEffect, useState} from "react";
import {GetAllLocations} from "../../services/LocationService";
import {Grid, Typography} from "@material-ui/core";
import LocationCard from "../../components/cards/LocationCard";

const LocationList = ({locationId}) => {
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        GetAllLocations(locationId).then(r => setLocations(r.data))
    }, [locationId])

    return (locations &&
        <Grid container direction={"column"}>
            <Typography variant={"h2"} align={"center"}>Locations</Typography>
            <hr className={"horizontal-fancy"}/>

            {locations && locations.length > 0 && locations.map(location => <Grid item md={4} sm={6} key={location.id}>
                <LocationCard location={location}/>
            </Grid>)
            }
        </Grid>
    )
}

export default LocationList;