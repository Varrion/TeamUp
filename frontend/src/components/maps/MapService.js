import axios from "axios";

const GetLongitudeLatitudeFromAddress = address => {
    return axios.get(`http://api.positionstack.com/v1/forward?access_key=1153bc67c89ff095121f4b87537a00f8&query=${address}`)
}

const GetAddressFromLongitudeAndLatitude = (latitude, longitude) => {
    return axios.get(`http://api.positionstack.com/v1/reverse?access_key=1153bc67c89ff095121f4b87537a00f8&query=${latitude},${longitude}`)
}

export {GetLongitudeLatitudeFromAddress, GetAddressFromLongitudeAndLatitude}