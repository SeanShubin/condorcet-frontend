import './Ballot.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'

const rankToString = rank => {
    const parsed = parseInt(rank)
    if (isNaN(parsed)) {
        return ''
    } else {
        return parsed.toString()
    }
}

const stringToRank = s => {
    const parsed = parseInt(s)
    if (isNaN(parsed)) {
        return null
    } else {
        return parsed
    }
}

const Ranking = ({name, rank, updateRank}) => {
    const onChangeRank = event => {
        updateRank({name, rank: stringToRank(event.target.value)})
    }
    const parsedRank = rankToString(rank)
    return <div key={name}>
        <input value={parsedRank} onChange={onChangeRank}/>
        <span>{name}</span>
    </div>
}

const Rankings = ({rankings, updateRank}) => {
    const createRanking = ({candidateName, rank}) => {
        return Ranking({name: candidateName, rank, updateRank})
    }
    const list = R.map(createRanking, rankings)
    return list
}

const Ballot = ({
                    voter,
                    election,
                    originalRankings,
                    editedRankings,
                    errors,
                    fetchBallotRequest,
                    castBallotRequest,
                    updateRank,
                    navigateDashboard,
                    navigateElection
                }) => {
    const hasPendingEdits = !R.equals(originalRankings, editedRankings)

    const onClickCastBallot = event => {
        castBallotRequest({voterName: voter, electionName: election, rankings: editedRankings})
    }
    const onClickDiscardChanges = event => {
        fetchBallotRequest({voterName: voter, electionName: election})
    }
    const onClickElection = event => {
        event.preventDefault()
        navigateElection(election)
    }
    const onClickDashboard = event => {
        event.preventDefault()
        navigateDashboard()
    }

    return <div className={'Ballot'}>
        <h1>Ballot</h1>
        <p>Ballot for voter {voter} in election {election}</p>
        <ErrorComponent errors={errors}/>
        <Rankings rankings={editedRankings} updateRank={updateRank}/>
        <button type={"submit"} onClick={onClickCastBallot} disabled={!hasPendingEdits}>Cast Ballot</button>
        <button type={"submit"} onClick={onClickDiscardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <a onClick={onClickElection}>election</a>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Ballot
