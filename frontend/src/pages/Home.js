import React from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import {Grid, Typography} from "@material-ui/core";
import "../styles/Home.css";
import TeamUpLogo from "../assets/images/TeamUpLogo2Transparent.png";
import AttributeCard from "../components/cards/AttributeCard";
import RoleCard from "../components/cards/RoleCard";
import {Link} from "@reach/router";

const Home = () => {
    let attributes = ["Stamina", "Speed", "Strength", "Skills", "Spirit"];

    return (
        <>
            <BackgroundVideo/>
            <div className={"text-center pt-3"}>
                <Typography variant={"h5"}>
                    "The five S’s of sports training are:
                </Typography>
                <Grid container justify={"center"} className={"mt-2"}>
                    {attributes.map((attribute, key) => <Grid className={"mr-3"} key={key} item lg={2} sm={6}>
                        <AttributeCard attribute={attribute}/>
                    </Grid>)}
                </Grid>
                <div className={"quote-text"}>
                    <Typography variant={"h5"} className={"mt-2"}>
                        {/*Win If You Can, Lose If You Must, <br/> But NEVER QUIT!*/}
                        {/*If you have everything under control, you’re not moving fast enough.*/}
                        But the greatest of these is the Spirit.”
                    </Typography>
                    <Typography variant={"body2"} align={"right"} className={"blockquote-footer"}>
                        Ken Doherty
                    </Typography>
                </div>
            </div>
            <div className={"d-flex flex-column justify-content-center pt-3 pb-3 team-up-section"}>
                <img className={"center-position pt-2"} src={TeamUpLogo} alt={"team-up"} height={180}/>
                <Typography variant={"h3"} className={"text-center"}>
                    Team Up
                </Typography>
                <Typography className={"pl-5 pr-5 pt-2 text-justify text-center"} variant={"body1"}>
                    Grab your chance to be part of our community.
                    Get to know people near you who love the same sports as you and have fun!
                </Typography>
            </div>
            <Grid container>
                <Grid item lg={6} xs={12}>
                    <RoleCard isOwner={false} chooseRole={false}/>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <RoleCard isOwner={true} chooseRole={false}/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
