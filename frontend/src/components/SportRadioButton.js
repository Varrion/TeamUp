import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip} from "@material-ui/core";
import {Sport} from "../services/PlayingFieldService";

const SportRadioButton = ({value, handleChange}) => {
    const sports = Object.keys(Sport);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Sport</FormLabel>
            <RadioGroup row aria-label="sport" name="sport" value={value} onChange={handleChange}>
                {sports.map(sport =>
                    <FormControlLabel key={sport} value={sport}
                                      control={<Radio checked={value === sport} value={sport}
                                                      className={"input-hidden"}/>}
                                      label={<Tooltip title={sport}>
                                          <img width={180} height={180}
                                               className={"m-4"}
                                               src={require(`../assets/images/sport/${sport}.jpg`)} alt={sport}/>
                                      </Tooltip>}/>
                )}
            </RadioGroup>
        </FormControl>
    )
}

export default SportRadioButton