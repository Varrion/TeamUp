import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";

const LocationOwnerPage = () => {
    return(
        <div>
            <h1 className={"text-center mt-3"}>Location Owner</h1>
            <Grid container className={"mt-5"}>
                <Grid item md={5}>
                    <img src={require('../assets/images/business-owner.jpg')} alt={"photo"}/>
                </Grid>
                <Grid item md={7}>
                    Our goal is to performing duties within the sport in a legal, efficient, rational and transparent manner in order to improve the sports life of all citizens. We promote the values ​​in sports, we create conditions for achieving top results,
                    protection and promotion of the interests of sports, athletes and sports clubs.<br/>
                    Sports Centers challenge and directs young people towards a proper and healthy lifestyle
                    through the numerous contents offered by the centers.<br/>
                    If you have some kind of a sports center or terrain why not use our app and rent it out.
                    <br/><br/><br/><br/><br/>
                    <Button variant="contained" size={"large"}
                            onClick={() => navigate("/register", {state: {roleType: true}})}
                            className={"role-card-button"}> JOIN US NOW
                    </Button>

                </Grid>

            </Grid>
        </div>
    )
}
export default LocationOwnerPage;