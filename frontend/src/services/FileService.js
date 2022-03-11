import axios from "axios";

const FileType = {
    Profile: 'Profile',
    Cover: 'Cover',
    Document: 'Document',
    Photo: 'Photo',
    Video: 'Video',
    Other: 'Other'
}


const UploadFile = (route, id, file, fileType) => {
    return axios.post(`${route}/${id}/file`, file, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            'FileType': fileType
        }
    });
}

const BulkUploadFiles = (route, id, files, fileType) => {
    return axios.post(`${route}/${id}/files`, files, {
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
    BulkUploadFiles,
    GetAllEntityFiles
}
