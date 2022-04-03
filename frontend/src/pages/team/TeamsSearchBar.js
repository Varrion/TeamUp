import { Grid, TextField } from "@material-ui/core";
import { GetAllTeams } from "../../services/TeamService";

const TeamsSearchBar = (props) => {

    const handleChange = (e) => {
    let input = e.target.value
        if(input.length >= 3 || input.length == 0) {
            GetAllTeams(null, input).then((res) =>
              props.setTeams(res.data)
            )
        }
    }

   return (
     <Grid container justify='centered'>
       <TextField
         onChange={ e => handleChange(e)}
         label='Search'
         justify='center'
       />
     </Grid>
   )
};

export default TeamsSearchBar;