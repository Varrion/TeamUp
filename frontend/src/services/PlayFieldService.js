import axios from "axios";

const defaultPath = "/fields";

const GetAllLFieldsForLocation = (locationId) => {
    return axios.get(`${defaultPath}/location/${locationId}`);
}

const GetOneField = (fieldId) => {
    return axios.get(`${defaultPath}/${fieldId}`);
}

const AddField = (locationId, fieldForm) => {
    return axios.post(`${defaultPath}/location/${locationId}`, fieldForm);
}

const EditField = (fieldId, fieldForm) => {
    return axios.put(`${defaultPath}/${fieldId}`, fieldForm);
}

const DeleteField = (fieldId) => {
    return axios.delete(`${defaultPath}/${fieldId}`);
}

export {GetAllLFieldsForLocation, GetOneField, AddField, EditField, DeleteField}
