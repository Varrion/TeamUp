import {Grid, TextField} from "@material-ui/core";
import {SearchUsers, UserRole, usersRoute} from "../../services/UserService";
import {useLocation} from "@reach/router";
import {GetAllTeams, teamsRoute} from "../../services/TeamService";
import {useAuthContext} from "../../configurations/AuthContext";

const SearchBar = (props) => {
    const location = useLocation();
    const {loggedUserRole} = useAuthContext();

    const handleChange = (e) => {
        let input = e.target.value
        if (input.length >= 2 || input.length === 0) {
            // eslint-disable-next-line default-case
            switch (location.pathname) {
                case usersRoute:
                    SearchUsers(input, loggedUserRole ?? UserRole.User)
                        .then(res => {
                            props.setUsers(res.data)
                        })
                    break;
                case teamsRoute:
                    GetAllTeams(null, input)
                        .then(res => {
                            props.setTeams(res.data);
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
                style={{margin: "10px auto", maxWidth: '450px'}}
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