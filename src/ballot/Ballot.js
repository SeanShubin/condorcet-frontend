import React, {Fragment} from "react";
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
    return <>
        <h2>Edit Rankings</h2>
        <p>1 for first place 2 for second place, and so on</p>
        <div className={"columns-2"}>{list}</div>
    </>
}

const EffectiveRanking = ({candidateName, rank, effectiveRank}) => {
    return <Fragment key={candidateName}>
        <span>{effectiveRank}</span>
        <span>{candidateName}</span>
    </Fragment>
}

const EffectiveRankings = ({rankings}) => {
    const sortedRankings = R.sortBy(R.prop('effectiveRank'), rankings)
    const createEffectiveRanking = ({candidateName, rank, effectiveRank}) => {
        return EffectiveRanking({candidateName, rank, effectiveRank})
    }
    const list = R.map(createEffectiveRanking, sortedRankings)
    return <>
        <h2>Effective Rankings</h2>
        <div className={"columns-2"}>{list}</div>
    </>
}

const BallotSummary = ({ballot}) => {
    if (ballot === null) return null
    const {voterName, electionName, confirmation, whenCast} = ballot
    const whenCastLocal = isoDateToLocal(whenCast)
    return <>
        <p>Ballot for voter {voterName} in election {electionName}</p>
        <table>
            <tbody>
            <tr>
                <td>voter</td>
                <td>{voterName}</td>
            </tr>
            <tr>
                <td>election</td>
                <td>{electionName}</td>
            </tr>
            <tr>
                <td>confirmation</td>
                <td>{confirmation}</td>
            </tr>
            <tr>
                <td>when cast</td>
                <td>{whenCastLocal}</td>
            </tr>
            </tbody>
        </table>
    </>
}

const effectiveRankingsFrom = rankings => {
    const ranks = R.map(R.prop('rank'), rankings)
    const notNullRanks = R.reject(R.isNil, ranks)
    const distinctRanks = R.uniq(notNullRanks)
    const distinctOrderedRanks = R.sortBy(R.identity, distinctRanks)
    const normalized = R.range(1, distinctOrderedRanks.length + 1)
    const newRankMap = R.zipObj(distinctOrderedRanks, normalized)
    const lastRank = distinctOrderedRanks.length + 1
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
                    updateRank,
                    globalSetUri
                }) => {
    const onClickAnchor = event => {
        event.preventDefault()
        globalSetUri(event.target.href)
    }

    const hasPendingEdits = !R.equals(originalRankings, editedRankings)
    const effectiveRankings = effectiveRankingsFrom(editedRankings)

    const onClickCastBallot = event => {
        castBallotRequest({voterName, electionName, rankings: editedRankings})
    }
    const onClickDiscardChanges = event => {
        fetchBallotRequest({voterName, electionName})
    }

    return <div className={'Ballot columns-1-outer'}>
        <h1>Ballot</h1>
        <ErrorComponent errors={errors}/>
        <BallotSummary ballot={ballot}/>
        <Rankings rankings={effectiveRankings} updateRank={updateRank}/>
        <EffectiveRankings rankings={effectiveRankings}/>
        <button type={"submit"} onClick={onClickCastBallot} disabled={!hasPendingEdits}>Cast Ballot</button>
        <button type={"submit"} onClick={onClickDiscardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <hr/>
        <a href={createElectionPagePath(electionName)} onClick={onClickAnchor}>election {electionName}</a>
        <a href={dashboardPagePath} onClick={onClickAnchor}>dashboard</a>
    </div>
}

export default Ballot
