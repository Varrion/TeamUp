import axios from "axios";

const terrainRoute = "/fields";

const GetAllTerrainsForLocation = (locationId) => {
    return axios.get(`${terrainRoute}/location/${locationId}`);
}

const GetTerrain = (terrainId) => {
    return axios.get(`${terrainRoute}/${terrainId}`);
}

const AddTerrain = (terrainForm, locationId) => {
    return axios.post(`${terrainRoute}/location/${locationId}`, terrainForm);
}

const EditTerrain = (terrainForm, terrainId) => {
    return axios.put(`${terrainRoute}/${terrainId}`, terrainForm);
}

const DeleteTerrain = (terrainId) => {
    return axios.delete(`${terrainRoute}/${terrainId}`);
}

export {GetAllTerrainsForLocation, GetTerrain, AddTerrain, EditTerrain, DeleteTerrain}
