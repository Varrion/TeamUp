import React from "react";
import {Button, Card, CardContent, Typography} from "@material-ui/core";
import Sportsman from "./../assets/images/sportsman.jpg";
import LocationOwner from "./../assets/images/business-owner.jpg";
import SportTeam from "./../assets/images/SportTeam.png";
import OwnersTeam from "./../assets/images/OwnersTeam.png";

const RoleCard = (props) => {
    return (
        <Card variant="outlined" className={"role-card"}
              style={{backgroundImage: `url(${!props.chooseRole && `${props.isOwner ? LocationOwner : Sportsman}`}`}}>
            {props.chooseRole === true ?
                <CardContent className={"d-flex flex-column align-content-center justify-content-center"}>
                    <img src={props.isOwner ? OwnersTeam : SportTeam} alt={"team"} height={320} width={500}/>
                    <Typography variant="h5" className={!props.chooseRole ? "role-card-text" : null}>
                        {props.isOwner ? "Business" : "Sport"}
                    </Typography>
                </CardContent>
                :
                <CardContent className={"d-flex flex-column align-content-center justify-content-center"}>
                    <Typography variant="h3" component="h2" className={"role-card-text"}>
                        {props.isOwner ? "Location Owner" : "Sportsman"}
                    </Typography>
                    <Button variant="contained" size={"large"}
                            className={"role-card-button"}>{props.isOwner ? "Find out more" : "Start Sporting"}  </Button>
                </CardContent>}
        </Card>
    )
}

export default RoleCard;
