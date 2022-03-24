import {CarouselItem} from "react-bootstrap";
import Terrain1 from "../assets/images/terrain/VN-Flixecourt-Terrain-multisports.jpg";
import Terrain2 from "../assets/images/terrain/multisport04.jpg";
import Terrain3 from "../assets/images/terrain/playing-zone.jpg";
import React from "react";

export const DummyTerrainPictures = [
    <CarouselItem key={1}>
        <img
            height={"100%"}
            width={"100%"}
            className="d-block object-fit-cover"
            src={Terrain1}
            alt="Media"
        />
    </CarouselItem>,
    <CarouselItem key={2}>
        <img
            height={"100%"}
            width={"100%"}
            className="d-block object-fit-cover"
            src={Terrain2}
            alt="Media"
        />
    </CarouselItem>,
    <CarouselItem key={3}>
        <img
            height={"100%"}
            width={"100%"}
            className="d-block object-fit-cover"
            src={Terrain3}
            alt="Media"
        />
    </CarouselItem>
];