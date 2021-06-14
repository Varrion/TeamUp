import axios from "axios";

const defaultPath = "/locations";

const GetAllLocations = () => {
    return axios.get(defaultPath);
}

const GetOneLocation = (locationId) => {
    return axios.get(`${defaultPath}//${locationId}`);
}

const AddLocation = (locationForm) => {
    return axios.post(`${defaultPath}`, locationForm);
}

const EditLocation = (locationId, locationForm) => {
    return axios.put(`${defaultPath}/${locationId}`, locationForm);
}

const DeleteLocation = (locationId) => {
    return axios.delete(`${defaultPath}/${locationId}`);
}

export {GetAllLocations, GetOneLocation, AddLocation, EditLocation, DeleteLocation}
