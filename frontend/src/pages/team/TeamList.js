import {useEffect, useState} from "react";
import {GetAllTeams} from "../../services/TeamService";
import TeamCard from "../../components/cards/TeamCard";
import {Grid} from "@material-ui/core";

const TeamList = () => {
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        GetAllTeams(null)
            .then(res => setTeams(res.data))
    }, [])

    return (
        <Grid container>
            {teams && teams.length > 0 && teams.map(team => <Grid key={team.id} item lg={4}>
                <TeamCard team={team}/>
            </Grid>)}
        </Grid>
    )
}

export default TeamList;
