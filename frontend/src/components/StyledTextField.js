import {TextField, withStyles} from "@material-ui/core";

const StyledTextField = withStyles({
    root: {
        "& label": {
            width: "100%",
            textAlign: "center",
            transformOrigin: "center",
            "&.Mui-focused": {
                transformOrigin: "center"
            }
        }
    }
})(TextField);

export default StyledTextField;
