import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@material-ui/core";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import React from "react";
import {FieldStatus} from "../../../services/PlayingFieldService";
import moment from "moment";

const CreateUpdatePlayingIntervalForm = ({
                                             formId,
                                             formSubmit,
                                             playingInterval,
                                             handlePlayingIntervalChange,
                                             ButtonText,
                                             ButtonType,
                                             onButtonClick
                                         }) => {
    const fieldStatuses = Object.keys(FieldStatus);

    return (<form id={formId} className={"d-flex align-items-center flex-column"}
                  onSubmit={formSubmit}>
        <Grid container justify={"space-between"}>
            <Grid item xl={6} className={"pr-4"}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        label="From"
                        format="DD/MM/YYYY HH:mm:ss"
                        fullWidth
                        disabled
                        className={"mt-2"}
                        value={moment(new Date(playingInterval.gameStartTime)).utc().format("DD.MM.YYYY HH:mm")}
                        onChange={handlePlayingIntervalChange("gameStartTime")}
                    />
                </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xl={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        disabled
                        label="To"
                        format="DD/MM/YYYY HH:mm:ss"
                        fullWidth
                        className={"mt-2"}
                        value={moment(new Date(playingInterval.gameEndTime)).utc().format("DD.MM.YYYY HH:mm")}
                        onChange={handlePlayingIntervalChange("gameEndTime")}
                    />
                </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} className={"mt-4 text-center"}>
                <FormControl component="fieldset">
                    <FormLabel color={playingInterval.fieldStatus === FieldStatus.Open ? "primary" : "secondary"}
                               component="legend">Status</FormLabel>
                    <RadioGroup row aria-label="fieldStatus" name="fieldStatus" value={playingInterval.fieldStatus}
                                onChange={handlePlayingIntervalChange("fieldStatus")}>
                        {fieldStatuses.filter(status => status !== FieldStatus.Open).map((status, index) =>
                            <FormControlLabel key={index}
                                              value={status}
                                              label={status}
                                              control={<Radio
                                                  color={"secondary"}/>
                                              }/>
                        )}
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>

        <Button type={ButtonType} className={"mt-3"} onClick={onButtonClick}>
            {ButtonText}
        </Button>
    </form>)
}

export default CreateUpdatePlayingIntervalForm;