import {TextField} from "@material-ui/core";
import {SearchUsers, usersRoute} from "../../services/UserService";
import {UserRole} from "../../services/UserService";
import {Grid} from "@material-ui/core";
import {useLocation} from "@reach/router";
import {GetAllTeams, teamsRoute} from "../../services/TeamService";

const SearchBar = (props) => {
    const location = useLocation();

    const handleChange = (e) => {
        let input = e.target.value
        if (input.length >= 2 || input.length === 0) {
            console.log(location.pathname);
            // eslint-disable-next-line default-case
            switch (location.pathname) {
                case usersRoute:
                    SearchUsers(input, UserRole.User)
                        .then(res => {
                            console.log("users");
                            props.setUsers(res.data)
                        })
                    break;
                case teamsRoute:
                    GetAllTeams(null, input)
                        .then(res => {
                            props.setTeams(res.data);
                            console.log("teams", res.data);
                        })
                    break;
            }
        }
    }

    return (
        <Grid container className="mb-5">
            <TextField
                id="standard-full-width"
                // label="Search"
                style={{margin: "10px auto",maxWidth:'450px'}}
                placeholder="Search something..."
                onChange={e => handleChange(e)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>
    )
};

export default SearchBar;