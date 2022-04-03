import {Grid} from "@material-ui/core";
import Footer from "../components/Footer";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";

const SportsmanPage = () => {
    return (
        <div>
            <h1 className={"text-center mt-3"}>Sportsman</h1>
            <Grid container className={"mt-5"}>
                <Grid item md={5}>
                    <img src={require('../assets/images/sportsman.jpg')} alt={"photo"}/>
                </Grid>
                <Grid item md={7}>
                    Sport’s main purposes are to promote physical activity and improve
                    motor skills for health and performance and psychosocial development. <br/>
                    Positive effects from sports are achieved primarily through physical activity, but
                    secondary effects bring health benefits such as psychosocial and personal development
                    and less alcohol consumption.
                    Human biology requires a certain amount of physical activity to maintain good health and wellbeing.<br/>
                    Participants also gain a chance to be part of a community, develop new social circles, and create social norms and attitudes.
                    Taking part in sport can help us feel fitter, healthier and mentally strong, and that is just the start of it. Sport can also be fun,
                    especially when played as part of a team or with family or friends.<br/><br/>
                    <h6>Benefits od playing sports: <br/></h6>
                    - Better Sleep <br/>
                    - A Strong Heart<br/>
                    - New Connections<br/>
                    - Improved Lung Function<br/>
                    - Reduces Stress<br/>
                    - Improve Mental Health<br/>
                    <br/><br/><br/>
                    <Button variant="contained" size={"large"}
                            onClick={() => navigate("/register", {state: {roleType: false}})}
                            className={"role-card-button"}> JOIN US NOW
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}
export default SportsmanPage;