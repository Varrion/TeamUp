import {Grid, Typography} from "@material-ui/core";
import React from "react";

const TitleWithButtonGrid = ({title, variant, button, align, classes}) => {
    return (
        <Grid container alignItems={align ?? "baseline"} justify={"space-between"} className={classes}>
            <Grid item md={10}>
                <Typography variant={variant ?? "h2"} className={"width-80"}>{title}</Typography>
            </Grid>
            <Grid item md={1} className={"text-right"}>
                {button}
            </Grid>
        </Grid>
    )
}

export default TitleWithButtonGrid;