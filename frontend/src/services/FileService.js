import axios from "axios";

const FileType = {
    Profile: 'Profile',
    Cover: 'Cover',
    Document: 'Document',
    Photo: 'Photo',
    Video: 'Video',
    Other: 'Other'
}

const GetLastFilePath = (files) => {
    return files && files.length > 0 &&
        files.filter(file => file.fileType === FileType.Profile)?.sort((a, b) => (a.id > b.id) ? 1 : -1)
            .splice(-1)[0].filePath;
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
    GetAllEntityFiles,
    GetLastFilePath
}
