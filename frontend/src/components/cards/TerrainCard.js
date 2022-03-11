import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {truncate} from "../Functions";
import CustomCarousel from "../carousel/CustomCarousel";
import {CarouselItem} from "react-bootstrap";
import React from "react";
import Button from "@material-ui/core/Button";

const TerrainCard = ({terrain}) => {
    return (
        <Card
            // onClick={() => navigate(`/terrains/${terrain.id}`)}
            className={`card-zoom card-height m-2`}>
            <CardMedia
                children={<CustomCarousel>
                    <CarouselItem className={"carousel-item-height"}>
                        <img
                            className="d-block w-100 h-100 object-fit-cover"
                            src="https://scontent.fskp4-1.fna.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=drKZ0xp5Cy0AX8mKnUX&_nc_ht=scontent.fskp4-1.fna&oh=00_AT86j8YsOneGisQAXV46AK2Qn7Q00G7AtglstCZ5-NOk_w&oe=624CE88E"
                            alt="First slide"
                        />
                    </CarouselItem>
                    <CarouselItem className={"carousel-item-height"}>
                        <img
                            className="d-block w-100 h-100 object-fit-cover"
                            src="https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg"
                            alt="Second slide"
                        />
                    </CarouselItem>
                </CustomCarousel>}
            />
            <CardContent>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-2"}>{truncate(terrain.name)}
                </Typography>
                <Typography className={"text-left card-description"}
                            variant={"subtitle1"}>{truncate(terrain.description, 50, 50)}</Typography>
            </CardContent>
            <CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default TerrainCard;
