import React from 'react';
import "../styles/BackgroundImage.css";
import VideoSource from "../assets/videos/TeamUpVideo.mp4"
import {Button, Typography} from "@material-ui/core";

const BackgroundVideo = () => {
    return (
        <div className={'Container'}>
            <video autoPlay="autoplay" loop="loop" muted className={"Video"}>
                <source src={VideoSource} type="video/mp4"/>
            </video>

            <div className={'Content'}>
                <div className={"SubContent"}>
                    <Typography variant={"h3"}>Make each day your masterpiece.</Typography>
                    <Button variant={"outlined"}>Join Us Now</Button>
                    {/*<img*/}
                    {/*    src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"*/}
                    {/*    alt="profile"/>*/}
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo;
