import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";

const SportsmanPage = () => {
    return (
        <div>
            <Typography variant={"h3"} className={"text-center mt-5 "}>Sportsman</Typography>
            <Grid container className={"mt-5"}>
                <Grid item xs={6} style={{ padding: "0px 40px 20px 60px" }}>
                    <Typography variant={"h6"} style={{ fontWeight: "600", maxWidth: "700px" }}>
                        <p>
                            Sport’s main purposes are to promote physical activity and improve
                            motor skills for health and performance and psychosocial development.
                        </p>
                        <p>
                            Positive effects from sports are achieved primarily through physical activity, but
                            secondary effects bring health benefits such as psychosocial and personal development
                            and less alcohol consumption.
                        </p>
                        <p>  Human biology requires a certain amount of physical activity to maintain good health and wellbeing.</p>
                        <p>  Participants also gain a chance to be part of a community, develop new social circles, and create social norms and attitudes.</p>
                        <p> Taking part in sport can help us feel fitter, healthier and mentally strong, and that is just the start of it. Sport can also be fun,
                            especially when played as part of a team or with family or friends.<br /><br /></p>
                    </Typography>


                </Grid>

                <Grid item xs={6} className="pr-4"  >
                    <img src={require('../assets/images/sportsman.jpg')} className={"full-width"} alt={"photo"} style={{borderRadius:"10px"}} />
                </Grid>
                <Grid item xs={12}>
                    <div className={"text-center mt-5"}>
                        <Button variant="contained" size={"large"}
                            onClick={() => navigate("/register", { state: { roleType: false } })}
                            className={"role-card-button"}> JOIN US NOW
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} className={"mt-5 text-center"}>
                    <Typography variant={"h4"}>Benefits od playing sports:</Typography>
                    <Typography variant={"h6"} className="mt-4">
                        - Better Sleep <br />
                        - A Strong Heart<br />
                        - New Connections<br />
                        - Improved Lung Function<br />
                        - Reduces Stress<br />
                        - Improve Mental Health<br />
                    </Typography>

                    <br /><br /><br />
                </Grid>
            </Grid>

        </div>
    )
}
export default SportsmanPage;