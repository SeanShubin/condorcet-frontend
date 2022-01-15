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

const Ranking = ({candidateName, rank, effectiveRank, updateRank}) => {
    const onChangeRank = event => {
        updateRank({candidateName, rank: stringToRank(event.target.value)})
    }
    const parsedRank = rankToString(rank)
    return <Fragment key={candidateName}>
        <input size={3} value={parsedRank} onChange={onChangeRank}/>
        <span>{candidateName}</span>
    </Fragment>
}

const Rankings = ({rankings, updateRank}) => {
    const createRanking = ({candidateName, rank, effectiveRank}) => {
        return Ranking({candidateName, rank, effectiveRank, updateRank})
    }
    const list = R.map(createRanking, rankings)
    return <div className={"columns-2"}>{list}</div>
}

const BallotSummary = ({ballot}) => {
    if(ballot === null) return null
    const {voterName,electionName,confirmation,whenCast}=ballot
    const whenCastLocal = isoDateToLocal(whenCast)
    return <>
        <p>Ballot for voter {voterName} in election {electionName}</p>
        <table>
            <tbody>
            <tr><td>voter</td><td>{voterName}</td></tr>
            <tr><td>election</td><td>{electionName}</td></tr>
            <tr><td>confirmation</td><td>{confirmation}</td></tr>
            <tr><td>when cast</td><td>{whenCastLocal}</td></tr>
            </tbody>
        </table>
    </>
}

const effectiveRankingsFrom = rankings => {
    const ranks = R.map(R.prop('rank'), rankings)
    const notNullRanks = R.reject(R.isNil, ranks)
    const distinctRanks = R.uniq(notNullRanks)
    const distinctOrderedRanks = R.sortBy(R.identity, distinctRanks)
    const normalized = R.range(1,distinctOrderedRanks.length+1)
    const newRankMap = R.zipObj(distinctOrderedRanks, normalized)
    const lastRank = distinctOrderedRanks.length+1
    const defaultToLastRank = R.defaultTo(lastRank)

    const toEffectiveRank = rank => {
        const effectiveRank = defaultToLastRank(newRankMap[rank])
        return effectiveRank
    }

    const updateRanking = ranking => {
        const effectiveRank = toEffectiveRank(ranking.rank)
        return R.assoc('effectiveRank', effectiveRank, ranking)
    }

    const effectiveRankings = R.map(updateRanking, rankings)
    return effectiveRankings
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
    const effectiveRankings = effectiveRankingsFrom(editedRankings)

    const onClickCastBallot = event => {
        castBallotRequest({voterName, electionName, rankings: effectiveRankings})
    }
    const onClickDiscardChanges = event => {
        fetchBallotRequest({voterName, electionName})
    }

    return <div className={'Ballot'}>
        <h1>Ballot</h1>
        <ErrorComponent errors={errors}/>
        <BallotSummary ballot={ballot}/>
        <Rankings rankings={effectiveRankings} updateRank={updateRank}/>
        <button type={"submit"} onClick={onClickCastBallot} disabled={!hasPendingEdits}>Cast Ballot</button>
        <button type={"submit"} onClick={onClickDiscardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <hr/>
        <a href={createElectionPagePath(electionName)}>election {electionName}</a>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default Ballot
