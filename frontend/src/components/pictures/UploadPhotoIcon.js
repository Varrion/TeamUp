import {Fab, Input} from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const UploadPhotoIcon = ({onUpload}) => {
    return (
        <label htmlFor="icon-button-file" className={"mini-image"}>
            <Input onChange={onUpload} style={{display: "none"}} accept="image/*" id="icon-button-file"
                   type="file"/>
            <Fab className={"photo-icon-color"} size="small" component="span" aria-label="add">
                <AddAPhotoIcon/>
            </Fab>
        </label>
    )
}

export default UploadPhotoIcon;
