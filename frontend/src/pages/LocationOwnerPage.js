import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";

const LocationOwnerPage = () => {
    return (
        <div>
            <Typography variant={"h3"} className={"text-center mt-3"}>Location Owner</Typography>
            <Grid container className={"mt-5"}>
                <Grid item md={5} xl={6}>
                    <img src={require('../assets/images/business-owner.jpg')} className={"full-width"} alt={"photo"}/>
                </Grid>
                <Grid item md={7} xl={6} className={"p-4"}>
                    <Typography variant={"h6"}>
                        Our goal is to performing duties within the sport in a legal, efficient, rational and transparent
                        manner in order to improve the sports life of all citizens. We promote the values ​​in sports, we
                        create conditions for achieving top results,
                        protection and promotion of the interests of sports, athletes and sports clubs.
                    </Typography>
                    <Typography variant={"h6"}>
                        Sports Centers challenge and directs young people towards a proper and healthy lifestyle
                        through the numerous contents offered by the centers.<br/>
                        If you have some kind of a sports center or terrain why not use our app and rent it out.
                    </Typography>
                    <div className={"text-center mt-5"}>
                        <Button variant="contained" size={"large"}
                                onClick={() => navigate("/register", {state: {roleType: true}})}
                                className={"role-card-button"}> JOIN US NOW
                        </Button>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}
export default LocationOwnerPage;