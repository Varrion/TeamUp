import React, {useEffect, useState} from "react";
import {DeleteTerrain, GetTerrain} from "../../services/PlayingFieldService";
import {CarouselItem} from "react-bootstrap";
import {FileType} from "../../services/FileService";
import CustomCarousel from "../../components/carousel/CustomCarousel";
import {DummyTerrainPictures} from "../../components/DummyTerrainPicturesArray";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Link,
    List,
    Tooltip,
    Typography
} from "@material-ui/core";
import SplitButton from "../../components/buttons/SplitButton";
import {AddCircle, Delete, Edit} from "@material-ui/icons";
import CreateEditTerrainModal from "./modal/CreateEditTerrainModal";
import {navigate} from "@reach/router";
import PlayIntervalListItem from "../../components/lists/PlayIntervalListItem";
import {DeletePlayingInterval, GetAllPlayingIntervalsForTerrain} from "../../services/PlayingIntervalService";
import CreateEditPlayingIntervalModal from "./modal/CreateEditPlayingIntervalModal";
import TitleWithButtonGrid from "../../components/grids/TitleWithButtonGrid";

const TerrainDetails = (props) => {
    const [terrain, setTerrain] = useState(null);
    const [playingIntervals, setPlayingIntervals] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(null);

    const terrainMenuButtonActions = [
        {
            text: <><Delete/> Delete </>,
            action: () => onTerrainDelete()
        }]

    const onTerrainDelete = () => {
        return DeleteTerrain(terrain.id)
            .then(() => navigate(terrain.location ? `/locations/${terrain.location.id}` : '/'));
    }

    //intervals
    const [selectedInterval, setSelectedInterval] = useState(null)
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [openPlayingIntervalModal, setOpenPlayingIntervalModal] = useState(false);
    const [hasIntervalUpdate, setHasIntervalUpdate] = useState(true);

    const terrainIntervalMenuButtonActions = [
        {
            text: <><Edit/> Edit </>,
            action: (interval) => onIntervalUpdate(interval)
        },
        {
            text: <><Delete/> Delete </>,
            action: (interval) => onIntervalDelete(interval)
        }]


    useEffect(() => {
        GetTerrain(props.id)
            .then(r => {
                setTerrain(r.data);
            })
    }, [openUpdateModal])

    useEffect(() => {
        terrain != null && hasIntervalUpdate && GetAllPlayingIntervalsForTerrain(terrain.id)
            .then(res => {
                setPlayingIntervals(res.data);
                setHasIntervalUpdate(false);
            })
    }, [terrain, hasIntervalUpdate])


    const onIntervalUpdate = (interval) => {
        setSelectedInterval(interval);
        setIsModalUpdate(true);
        setHasIntervalUpdate(true);
        setOpenPlayingIntervalModal(true);
    }

    const onIntervalDelete = (interval) => {
        return DeletePlayingInterval(terrain.id, interval.id)
            .then(() => setHasIntervalUpdate(true));
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
            <Typography variant={"h4"} className={"m-5 bold font-weight-bold text-uppercase"} align={"center"}>
                {terrain.fieldType} Terrain
            </Typography>
            <Grid container justify={"space-between"} className={"mt-4"}>
                <Grid item md={4} sm={12} className={"pr-4"}>
                    <Card>
                        <CardContent>
                            <TitleWithButtonGrid title={terrain.name}
                                                 variant={"h4"}
                                                 button={<SplitButton buttonColor={"secondary"}
                                                                      buttonVariant={"contained"}
                                                                      text={<><Edit/> Edit</>}
                                                                      menuOptions={terrainMenuButtonActions}
                                                                      classes={"float-right"}
                                                                      mainOption={() => setOpenUpdateModal(true)}/>}
                            />
                            <Typography className={"mt-2"} variant={"body1"}>{terrain.description}</Typography>
                        </CardContent>
                        <CardActions>
                            {terrain.location &&
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigate(`/locations/${terrain.location.id}`)}
                                >
                                    Back to {terrain.location.name.toUpperCase()}
                                </Link>}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={8} sm={12}>
                    <Card>
                        <CardHeader title={<TitleWithButtonGrid title={"Intervals"}
                                                                variant={"h5"}
                                                                button={<Tooltip title={"Add"} placement={"left"}>
                                                                    <IconButton color="inherit"
                                                                                onClick={() => setOpenPlayingIntervalModal(true)}><AddCircle
                                                                        fontSize="default"/></IconButton>
                                                                </Tooltip>}
                        />}/>
                        <CardContent>
                            {playingIntervals && playingIntervals.length > 0 ? <List className={"d-flex flex-wrap"}>
                                    {playingIntervals.map(interval =>
                                        <PlayIntervalListItem
                                            key={interval.id}
                                            menuOptions={terrainIntervalMenuButtonActions}
                                            interval={interval}/>)}
                                </List>
                                : <div>
                                    No elements yet
                                </div>}

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {openUpdateModal && <CreateEditTerrainModal field={terrain}
                                                        locationId={terrain?.location?.id}
                                                        onIntervalUpdate={() => setHasIntervalUpdate(true)}
                                                        open={openUpdateModal}
                                                        onClose={() => setOpenUpdateModal(false)}/>}
            {openPlayingIntervalModal && <CreateEditPlayingIntervalModal terrainId={terrain.id} isEdit={isModalUpdate}
                                                                         playingInterval={selectedInterval}
                                                                         open={openPlayingIntervalModal}
                                                                         onClose={() => {
                                                                             setSelectedInterval(null);
                                                                             setOpenPlayingIntervalModal(false);
                                                                             setHasIntervalUpdate(true)
                                                                         }}/>}
        </>
    )
}

export default TerrainDetails;