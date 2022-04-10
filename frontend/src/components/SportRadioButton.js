import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip } from "@material-ui/core";
import { Sport } from "../services/PlayingFieldService";

const SportRadioButton = ({ value, handleChange }) => {
    const sports = Object.keys(Sport);

    return (
        <FormControl component="fieldset" style={{ marginTop: "25px" }}>
            <FormLabel component="legend" className="text-center" style={{ fontSize: "18px" }} >Sport</FormLabel>
            <RadioGroup row aria-label="sport" name="sport" value={value} onChange={handleChange} style={{ maxWidth: "860px", marginTop: "15px" }}>
                {sports.map(sport =>
                    <FormControlLabel key={sport} value={sport}
                        control={<Radio checked={value === sport} value={sport}
                            className={"input-hidden"} />}
                        label={<Tooltip title={sport}>
                            <img width={180} height={180}
                                className={"m-4"}
                                src={require(`../assets/images/sport/${sport}.jpg`)} alt={sport} />
                        </Tooltip>} />
                )}
            </RadioGroup>
        </FormControl>
    )
}

export default SportRadioButton