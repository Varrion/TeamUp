import { TextField } from "@material-ui/core";
import { SearchUsers } from "../../services/UserService";
import { UserRole } from "../../services/UserService";
import { Grid } from "@material-ui/core";

const SearchBar = (props) => {

    const handleChange = (e) => {
    let input = e.target.value
        if(input.length >= 3 || input.length == 0) {
            SearchUsers(input, UserRole.User).then((res) => props.setUsers(res.data))
        }
    }

   return ( 
        <Grid container justify="centered">
            <TextField
            onChange = { e => handleChange(e) } 
            label="Search"
            justify="center"
            />
        </Grid>
   )
};

export default SearchBar;