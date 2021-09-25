import UploadPhotoIcon from "./UploadPhotoIcon";

const UploadShowProfilePicture = ({width, height, src, alt, onUpload}) => {
    return (
        <div className={"position-relative d-flex align-items-end"}>
            <img className={"rounded-cover-image"} width={width} height={height} src={src} alt={alt}/>
            <UploadPhotoIcon onUpload={onUpload}/>
        </div>
    )
}

export default UploadShowProfilePicture;
