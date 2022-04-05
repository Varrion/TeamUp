import UploadPhotoIcon from "./UploadPhotoIcon";

const UploadShowProfilePicture = ({width, height, src, alt, onUpload, classes}) => {
    return (
        <div className={classes ?? "d-flex align-content-center"}>
            <div className={"position-relative d-flex align-items-end mt-4"}>
                <img className={"rounded-cover-image"} width={width} height={height} src={src} alt={alt}/>
                {onUpload && <UploadPhotoIcon onUpload={onUpload}/>}
            </div>
        </div>
    )
}

export default UploadShowProfilePicture;
