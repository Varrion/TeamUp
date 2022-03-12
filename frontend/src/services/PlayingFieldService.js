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

const AddPlayingInterval = (terrainId, playingInterval) => {
    return axios.post(`${terrainRoute}/${terrainId}/playing-intervals`, playingInterval)
}


const GetAllPlayingIntervalsForTerrain = (terrainId) => {
    return axios.get(`${terrainRoute}/${terrainId}/playing-intervals`)
}

export {
    terrainRoute,
    Sport,
    FieldType,
    FieldStatus,
    GetAllTerrainsForLocation,
    GetTerrain,
    AddTerrain,
    EditTerrain,
    DeleteTerrain,
    AddPlayingInterval,
    GetAllPlayingIntervalsForTerrain
}
