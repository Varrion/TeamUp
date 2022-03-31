import {Card, CardContent, Divider, Typography} from "@material-ui/core";
import {navigate} from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import {FileType, GetLastFilePath} from "../../services/FileService";
import React from "react";
import LocationInfoGrid from "../grids/LocationInfoGrid";
import GoogleMap from "../maps/GoogleMap";

const LocationCard = ({location}) => {
    return (
        <>

            <Card onClick={() => navigate(`/locations/${location.id}`)}>
                <CardContent>
                    <Avatar className={"profile-avatar"}
                            src={GetLastFilePath(location.files, "https://i.pravatar.cc/300")}
                            alt={FileType.Profile}/>
                    <Typography variant={"h4"}
                                className={"font-weight-bold text-center mt-2"}>{location.name.toUpperCase()}
                    </Typography>

                    <Typography variant={"body1"} className={"mt-2"}>{location.description.substring(0, 50)}
                    </Typography>

                    <GoogleMap height={"300px"} latitude={location.latitude} longitude={location.longitude}
                               hideLongitudeLatitude={true}/>
                </CardContent>
                <Divider light/>
                <LocationInfoGrid location={location}/>
            </Card>
        </>
    )
}

export default LocationCard