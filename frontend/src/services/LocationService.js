import axios from "axios";

const locationRoute = "/locations";

const GetAllLocations = () => {
    return axios.get(locationRoute);
}

const GetOneLocation = (locationId) => {
    return axios.get(`${locationRoute}/${locationId}`);
}

const GetLocationByOwnerUsername = (username) => {
    return axios.get(`${locationRoute}/owner/${username}`)
}

const AddLocation = (locationForm) => {
    return axios.post(`${locationRoute}`, locationForm);
}

const EditLocation = (locationId, locationForm) => {
    return axios.put(`${locationRoute}/${locationId}`, locationForm);
}

const DeleteLocation = (locationId) => {
    return axios.delete(`${locationRoute}/${locationId}`);
}

export {locationRoute, GetAllLocations, GetOneLocation, GetLocationByOwnerUsername, AddLocation, EditLocation, DeleteLocation}
