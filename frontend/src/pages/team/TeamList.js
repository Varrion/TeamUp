import {useEffect, useState} from "react";
import {GetAllTeams} from "../../services/TeamService";

const TeamList = (props) => {
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        GetAllTeams(null)
            .then(res => setTeams(res.data))
    }, [])

    return (
        <div>
            Test
        </div>
    )
}

export default TeamList;
