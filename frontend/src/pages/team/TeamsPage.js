import {useEffect, useState} from 'react';
import {GetAllTeams} from '../../services/TeamService';
import TeamList from './TeamList';
import SearchBar from "../user/SearchBar";
import {Typography} from "@material-ui/core";

const TeamsPage = () => {
    const [teams, setTeams] = useState(null)

    useEffect(() => {
        GetAllTeams(null, "").then((res) => setTeams(res.data))
    }, [])

    return (
        <div>
            <Typography variant={"h3"} align={"center"}>Teams</Typography>
            <SearchBar setTeams={setTeams}/>
            <TeamList teams={teams}/>
        </div>
    )
}

export default TeamsPage
