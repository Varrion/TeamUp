import axios from "axios";
import {terrainRoute} from "./PlayingFieldService";

const ReserveClosePlayingInterval = (terrainId, playingInterval) => {
    return axios.post(`${terrainRoute}/${terrainId}/playing-intervals`, playingInterval)
}

const UpdatePlayingInterval = (terrainId, intervalId, playingInterval) => {
    return axios.put(`${terrainRoute}/${terrainId}/playing-intervals/${intervalId}`, playingInterval)
}

const DeletePlayingInterval = (terrainId, intervalId) => {
    return axios.delete(`${terrainRoute}/${terrainId}/playing-intervals/${intervalId}`)
}

const GetAllPlayingIntervalsForTerrain = (terrainId) => {
    return axios.get(`${terrainRoute}/${terrainId}/playing-intervals`)
}

export {
    ReserveClosePlayingInterval,
    UpdatePlayingInterval,
    DeletePlayingInterval,
    GetAllPlayingIntervalsForTerrain,
}