import axios from "axios";

const terrainRoute = "/fields";

const Sport = {
    Basketball: 'Basketball',
    Football: 'Football',
    HandBall: 'HandBall',
    WaterPolo: 'WaterPolo',
    Tennis: 'Tennis',
    ValleyBall: 'ValleyBall',
    Other: 'Other'
}

const FieldType = {
    Public: 'Public',
    Private: 'Private'
}

const FieldStatus = {
    Open: 'Open',
    Reserved: 'Reserved',
    Closed: 'Closed'
}

const GetAllTerrains = (fieldType) => {
    return axios.get(`${terrainRoute}`, {
        params: {"type": fieldType}
    });
}

const GetAllTerrainsForLocation = (locationId) => {
    return axios.get(`${terrainRoute}/location/${locationId}`);
}

const GetTerrain = (terrainId) => {
    return axios.get(`${terrainRoute}/${terrainId}`);
}

const AddLocationTerrain = (terrainForm, locationId) => {
    return axios.post(`${terrainRoute}/location/${locationId}`, terrainForm);
}

const AddPublicTerrain = (terrainForm) => {
    return axios.post(`${terrainRoute}`, terrainForm);
}

const EditTerrain = (terrainForm, terrainId) => {
    return axios.put(`${terrainRoute}/${terrainId}`, terrainForm);
}

const DeleteTerrain = (terrainId) => {
    return axios.delete(`${terrainRoute}/${terrainId}`);
}

export {
    terrainRoute,
    Sport,
    FieldType,
    FieldStatus,
    GetAllTerrains,
    GetAllTerrainsForLocation,
    GetTerrain,
    AddLocationTerrain,
    AddPublicTerrain,
    EditTerrain,
    DeleteTerrain
}
