import axios from "axios";

const FileType = {
    Profile: 'Profile',
    Cover: 'Cover',
    Logo: 'Logo',
    Document: 'Document',
    Video: 'Video',
    Other: 'Other'
}


const UploadFile = (route, id, file, fileType) => {
    return axios.post(`${route}/${id}/files`, file, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            'FileType': fileType
        }
    });
}

const GetAllEntityFiles = (route, id, fileType) => {
    return axios.get(`${route}/${id}/files`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            'FileType': fileType
        }
    })
}

export {
    FileType,
    UploadFile,
    GetAllEntityFiles
}
