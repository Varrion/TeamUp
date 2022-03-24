import React, {useEffect, useState} from "react";
import {DeleteTerrain, GetAllPlayingIntervalsForTerrain, GetTerrain} from "../../services/PlayingFieldService";
import {CarouselItem} from "react-bootstrap";
import {FileType} from "../../services/FileService";
import CustomCarousel from "../../components/carousel/CustomCarousel";
import {DummyTerrainPictures} from "../../components/DummyTerrainPicturesArray";
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import SplitButton from "../../components/buttons/SplitButton";
import {Delete, Edit} from "@material-ui/icons";

const TerrainDetails = (props) => {
    const [terrain, setTerrain] = useState(null);
    const [playingIntervals, setPlayingIntervals] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(null);

    const locationMenuButtonActions = [
        {
            text: <><Delete/> Delete </>,
            action: () => onTerrainDelete()
        }]

    useEffect(() => {
        GetTerrain(props.id)
            .then(r => {
                setTerrain(r.data);
                GetAllPlayingIntervalsForTerrain(r.data.id)
                    .then(res => setPlayingIntervals(res.data))
            })
    }, [openUpdateModal])

    const onTerrainDelete = () => {
        return DeleteTerrain(terrain.id)
        // .then(() => navigate("/"));
    }

    return (terrain &&
        <>
            <div className={"position-relative"}>
                <CustomCarousel height={"400px"}>
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
                </CustomCarousel>
                <Tooltip placement={"left"} title={terrain.fieldFor}>
                    <img width={160} height={160}
                         className={"rounded-cover-image mini-image2"}
                         src={require(`../../assets/images/sport/${terrain.fieldFor}.jpg`)} alt={terrain.fieldFor}/>
                </Tooltip>
            </div>
            <Grid container justify={"space-between"} className={"mt-4"}>
                <Grid item md={4}>
                    <Card>
                        <CardContent>
                            <Grid container alignItems={"baseline"} justify={"space-between"}>
                                <Grid item md={4}>
                                    <Typography variant={"h2"}>{terrain.name}</Typography>
                                </Grid>
                                <Grid item md={8}>
                                    <SplitButton buttonColor={"secondary"} buttonVariant={"contained"}
                                                 text={<><Edit/> Edit</>}
                                                 menuOptions={locationMenuButtonActions}
                                                 classes={"float-right"}
                                                 mainOption={() => setOpenUpdateModal(true)}
                                    />
                                </Grid>
                            </Grid>
                            <Typography className={"mt-2"} variant={"body2"}>{terrain.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={7}>
                    <Card>
                        <CardHeader title={"Intervals"}/>
                        <CardContent>
                            <List className={"d-flex p-0"}>
                                {playingIntervals && playingIntervals.length > 0 &&
                                    playingIntervals.map(interval =>
                                        <div key={interval.id} className={"d-flex align-baseline m-2"}>
                                            <Divider orientation={"vertical"}/>
                                            <ListItem divider>
                                                <span
                                                    className="badge badge-pill badge-success text-center mr-3">OPEN</span>
                                                <ListItemText
                                                    primary={moment(interval.gameStartTime).format("DD.MM.YYYY HH:mm")}
                                                    secondary={moment(interval.gameEndTime).format("DD.MM.YYYY HH:mm")}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider orientation={"vertical"}/>
                                        </div>
                                    )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default TerrainDetails;