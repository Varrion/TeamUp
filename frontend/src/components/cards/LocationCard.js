import {Card, CardContent, Typography} from "@material-ui/core";
import {navigate} from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import {FileType, GetLastFilePath} from "../../services/FileService";
import React from "react";
import LocationInfoGrid from "../grids/LocationInfoGrid";
import GoogleMap from "../maps/GoogleMap";
import LocationLogo from "../../assets/images/business_profile-cover.jpg";


const LocationCard = ({ location }) => {
    return (
        <>

            <Card onClick={() => navigate(`/locations/${location.id}`)}
                className={`card-zoom cursor-pointer card-height m-3 text-center`}>
                <CardContent>
                    <Avatar className={"profile-avatar"}
                        src={GetLastFilePath(location.files, LocationLogo)}
                        alt={FileType.Profile} />
                    <Typography variant={"h4"}
                        className={"font-weight-bold text-center mt-2"}>{location.name.toUpperCase()}
                    </Typography>

                    <Typography variant={"body1"} className={"mt-2"}>{location.description.substring(0, 50)}
                    </Typography>

                    <GoogleMap height={"300px"} latitude={location.latitude} longitude={location.longitude}
                        hideLongitudeLatitude={true} />
                </CardContent>
                <hr style={{ maxWidth: "90%" }} />
                <LocationInfoGrid location={location} />
            </Card>
        </>
    )
}

export default LocationCard