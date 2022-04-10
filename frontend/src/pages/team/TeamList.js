import TeamCard from "../../components/cards/TeamCard";
import {Grid} from "@material-ui/core";

const TeamList = (props) => {

    return (
        <Grid container>
          {props.teams &&
            props.teams.length > 0 &&
            props.teams.map((team) => (
              <Grid key={team.id} item  xs={12} md={6} lg={4}>
                <TeamCard team={team} />
              </Grid>
            ))}
        </Grid> 
    )
}

export default TeamList;
