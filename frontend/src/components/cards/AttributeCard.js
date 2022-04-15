import {Card, CardContent, Typography} from "@material-ui/core";
import Speed from "../../assets/images/speed.png";
import Stamina from "../../assets/images/stamina.png";
import Spirit from "../../assets/images/spirit.png";
import Skills from "../../assets/images/skills.png";
import Strength from "../../assets/images/strenght.png";
import React from "react";

const AttributeCard = (props) => {
    let image;
    switch (props.attribute) {
        case "Speed":
            image = Speed;
            break;
        case "Stamina":
            image = Stamina;
            break;
        case "Strength":
            image = Strength;
            break;
        case "Spirit":
            image = Spirit;
            break;
        case "Skills":
            image = Skills;
            break;
        default:
            image = Stamina;
    }
    return (
        <Card className={"card-zoom"}>
            <CardContent>
                <img src={image} alt={props.attribute}
                     width={props.attribute === "Speed" ? 200 : 180} height={180}/>
                <Typography variant={"h5"} className={"mt-1"}>{props.attribute}</Typography>
            </CardContent>
        </Card>
    )
}

export default AttributeCard;
