import { useState, useEffect } from 'react';
import TeamsSearchBar from './TeamsSearchBar';
import { GetAllTeams } from '../../services/TeamService';
import TeamList from './TeamList';

const TeamsPage = (props) => {
    const [teams, setTeams] = useState(null)

    useEffect(() => {
      GetAllTeams(null, "").then((res) => setTeams(res.data))
    }, [])

  return (
    <div>
      <TeamsSearchBar setTeams={setTeams} />
      <TeamList teams={teams} />
    </div>
  )
}

export default TeamsPage
