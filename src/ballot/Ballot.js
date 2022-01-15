import React, {Fragment} from "react";
import './Ballot.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {isoDateToLocal} from "../library/date-time-util";

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

const Ranking = ({candidateName, rank, updateRank}) => {
    const onChangeRank = event => {
        updateRank({candidateName, rank: stringToRank(event.target.value)})
    }
    const parsedRank = rankToString(rank)
    return <Fragment key={candidateName}>
        <input value={parsedRank} onChange={onChangeRank}/>
        <span>{candidateName}</span>
    </Fragment>
}

const Rankings = ({rankings, updateRank}) => {
    const createRanking = ({candidateName, rank}) => {
        return Ranking({candidateName, rank, updateRank})
    }
    const list = R.map(createRanking, rankings)
    return <div className={"two-columns"}>{list}</div>
}

const BallotSummary = ({ballot}) => {
    if(Ballot == null) return null
    const {voterName,electionName,confirmation,whenCast}=ballot
    const whenCastLocal = isoDateToLocal(whenCast)
    return <table>
        <tbody>
        <tr><td>voter</td><td>{voterName}</td></tr>
        <tr><td>election</td><td>{electionName}</td></tr>
        <tr><td>confirmation</td><td>{confirmation}</td></tr>
        <tr><td>when cast</td><td>{whenCastLocal}</td></tr>
        </tbody>
    </table>
}

const Ballot = ({
                    voterName,
                    electionName,
                    ballot,
                    originalRankings,
                    editedRankings,
                    errors,
                    fetchBallotRequest,
                    castBallotRequest,
                    updateRank
                }) => {
    const hasPendingEdits = !R.equals(originalRankings, editedRankings)

    const onClickCastBallot = event => {
        castBallotRequest({voterName, electionName, rankings: editedRankings})
    }
    const onClickDiscardChanges = event => {
        fetchBallotRequest({voterName, electionName})
    }

    return <div className={'Ballot'}>
        <h1>Ballot</h1>
        <p>Ballot for voter {voterName} in election {electionName}</p>
        <ErrorComponent errors={errors}/>
        <BallotSummary ballot={ballot}/>
        <Rankings rankings={editedRankings} updateRank={updateRank}/>
        <button type={"submit"} onClick={onClickCastBallot} disabled={!hasPendingEdits}>Cast Ballot</button>
        <button type={"submit"} onClick={onClickDiscardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <hr/>
        <a href={createElectionPagePath(electionName)}>election {electionName}</a>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default Ballot
