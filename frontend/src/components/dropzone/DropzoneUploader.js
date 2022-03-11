import Dropzone from "react-dropzone-uploader";
import {Add} from "@material-ui/icons";

const DropzoneUploader = ({files}) => {
    // specify upload params and url for your files
    const getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'}
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({meta, file}, status) => {
        if (status === "done") {
            files.push(file);
        }
    }


    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            accept="image/*,audio/*,video/*"
            inputContent="Choose Files"
            inputWithFilesContent={<Add/>}
            styles={{
                dropzone: {width: '80vh', height: '50vh'},
                dropzoneActive: {borderColor: 'green'},
            }}
        />
    )
}

export default DropzoneUploader