import {useEffect, useState} from "react";
import {GetAllLocations} from "../../services/LocationService";

const LocationList = ({locationId}) => {
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        GetAllLocations(locationId).then(r => setLocations(r.data))
    }, [])

    return (
        <>
            test list
        </>
    )
}

export default LocationList;