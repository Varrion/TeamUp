import { TextField } from "@material-ui/core";
import { SearchUsers } from "../../services/UserService";
import { UserRole } from "../../services/UserService";

const SearchBar = (props) => {

    const handleChange = (e) => {
    let input = e.target.value
        if(input.length >= 3) {
            SearchUsers(input, UserRole.User).then((res) => props.setUsers(res.data))
        }
    }

   return ( 
   <div>
        <div>
            <TextField
            onChange = { e => handleChange(e) } 
            label="Search"
            />
        </div>
    </div>
   )
};

export default SearchBar;