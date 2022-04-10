import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";

const LocationOwnerPage = () => {
    return (
        <div>
            <Typography variant={"h3"} className={"text-center mt-3"}>Location Owner</Typography>
            <Grid container className={"mt-5"}>
                <Grid item xs={6} className="pl-4">
                    <img src={require('../assets/images/business-owner.jpg')} className={"full-width"} alt={"photo"} style={{ borderRadius: "10px" }} />
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 60px 20px 40px" }}>
                    <Typography variant={"h6"} style={{ fontWeight: "600", maxWidth: "700px" }}>
                        <p>
                            Our goal is to performing duties within the sport in a legal, efficient, rational and transparent
                            manner in order to improve the sports life of all citizens.
                        </p>
                        <p>
                            We promote the values ​​in sports, we
                            create conditions for achieving top results,
                            protection and promotion of the interests of sports, athletes and sports clubs.
                        </p>
                        <p>
                            Sports Centers challenge and directs young people towards a proper and healthy lifestyle
                            through the numerous contents offered by the centers.<br />
                        </p>
                        <p>
                            If you have some kind of a sports center or terrain why not use our app and rent it out.
                        </p>
                    </Typography>
                </Grid>

            </Grid>
            <Grid item xs={12} className="mb-5 pt-2">
                <div className={"text-center mt-5"}>
                    <Button variant="contained" size={"large"}
                        onClick={() => navigate("/register", { state: { roleType: false } })}
                        className={"role-card-button"}> JOIN US NOW
                    </Button>
                </div>
            </Grid>
        </div>
    )
}
export default LocationOwnerPage;