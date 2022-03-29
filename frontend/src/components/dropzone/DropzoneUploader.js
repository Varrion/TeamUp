import Dropzone from "react-dropzone-uploader";
import {Add} from "@material-ui/icons";
import {useEffect, useState} from "react";

const DropzoneUploader = ({files, setFiles}) => {
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [initialFiles, setInitialFiles] = useState([]);

    useEffect(() => {
        shouldUpdate && setInitialFiles(files);
        setShouldUpdate(false);
    }, [files, shouldUpdate])

    // specify upload params and url for your files
    const getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'}
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({meta, file}, status) => {
        if (status !== "done" && status !== "removed") {
            return;
        }

        if (status === "done") {
            if (!files.includes(file)) {
                setFiles([...files, file]);
            }
        } else {
            setFiles(files.filter(arFile => arFile !== file));
        }
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            initialFiles={initialFiles}
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