import {Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {truncate} from "../Functions";
import CustomCarousel from "../carousel/CustomCarousel";
import {CarouselItem} from "react-bootstrap";
import React from "react";
import Button from "@material-ui/core/Button";
import {FileType} from "../../services/FileService";
import {navigate} from "@reach/router";
import {DummyTerrainPictures} from "../DummyTerrainPicturesArray";


const TerrainCard = ({terrain}) => {
    return (
        <Card
            className={`card-zoom card-height m-2`}>
            <CardMedia
                className={"card-media-height"}
                children={<CustomCarousel height={360}>
                    {terrain.files && terrain.files.length > 0
                        ? terrain.files.map(file => <CarouselItem key={file.id}>
                            {file.fileType !== FileType.Video
                                ? <img height={"100%"}
                                       width={"100%"}
                                       className="d-block object-fit-cover"
                                       src={file.filePath} alt={"Media"}/>
                                : <video height={"100%"}
                                         width={"100%"}
                                         autoPlay loop muted className={"d-block object-fit-cover"}>
                                    <source src={file.filePath} type="video/mp4"/>
                                </video>}
                        </CarouselItem>)
                        : DummyTerrainPictures}
                </CustomCarousel>}
            />
            <CardContent>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-2"}>{truncate(terrain.name)}
                </Typography>
                <Typography className={"text-left card-description"}
                            variant={"subtitle1"}>{truncate(terrain.description, 50, 50)}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => navigate(`/terrains/${terrain.id}`)}>
                    Show More
                </Button>
            </CardActions>
        </Card>
    )
}

export default TerrainCard;
