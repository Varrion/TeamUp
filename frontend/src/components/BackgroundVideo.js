import React from 'react';
import "../styles/BackgroundImage.css";
import VideoSource from "../assets/videos/TeamUpVideo.mp4"
import {Button, Typography} from "@material-ui/core";
import {navigate} from "@reach/router";
import {useAuthContext} from "../configurations/AuthContext";

const BackgroundVideo = () => {
    const {loggedUser} = useAuthContext();

    return (
        <div className={'Container'}>
            <video autoPlay loop muted className={"Video"}>
                <source src={VideoSource} type="video/mp4"/>
            </video>

            <div className={'Content'}>
                <div className={"SubContent"}>
                    <Typography variant={"h3"}>Make each day your masterpiece.</Typography>
                    {!loggedUser &&
                    <Button variant={"outlined"} onClick={() => navigate("/register")}>Join Us Now</Button>}
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo;
