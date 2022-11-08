import React, {Fragment} from "react";
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {isoDateToLocal} from "../library/date-time-util";
import {Link} from "../library/uri-util";

const RankedItem = ({rankedItem, selectCandidate, moveFromRank}) => {
    const {candidateName, rank} = rankedItem
    const onSelectCandidate = () => {
        selectCandidate(rankedItem)
    }
    let moveClass
    if(R.isNil(moveFromRank)) {
        moveClass = 'can-move'
    }else if(rankedItem.rank === moveFromRank){
        moveClass = 'can-move move-from'
    } else {
        moveClass = 'can-move move-to'
    }
    return <Fragment>
        <span>{rank}</span>
        <span className={moveClass} onClick={onSelectCandidate}>{candidateName}</span>
    </Fragment>
}

const RankedList = ({rankedList, selectCandidate, moveFromRank}) => {
    const createRankedItem = rankedItem => <RankedItem key={rankedItem.candidateName} rankedItem={rankedItem} selectCandidate={selectCandidate} moveFromRank={moveFromRank}/>
    const rankedItems = R.map(createRankedItem, rankedList)
    if(rankedList.length === 0) return null
    return <>
        <h2>Ranked</h2>
        <div className={"columns-2"}>
            {rankedItems}
        </div>
    </>
}

const UnrankedItem = ({unrankedItem, selectCandidate}) => {
    const {candidateName} = unrankedItem
    const onSelectCandidate = () => {
        selectCandidate(unrankedItem)
    }
    return <Fragment>
        <span className={'can-move'} onClick={onSelectCandidate}>{candidateName}</span>
    </Fragment>
}

const UnrankedList = ({unrankedList, selectCandidate}) => {
    if(unrankedList.length === 0) return null
    const createUnrankedItem = unrankedItem => <UnrankedItem key={unrankedItem.candidateName} unrankedItem={unrankedItem} selectCandidate={selectCandidate}/>
    const unrankedItems = unrankedList.map(createUnrankedItem)
    return <>
        <h2>Unranked</h2>
        <div className={"columns-1-outer"}>
            {unrankedItems}
        </div>
    </>
}

const Rankings = ({rankings, selectCandidate, moveFromRank}) => {
    const isRanked = ranking => ranking.rank
    const [rankedList, unrankedList] = R.partition(isRanked, rankings)
    return <>
        <h2>Edit Rankings</h2>
        <p>1 for first place 2 for second place, and so on</p>
        <RankedList rankedList={rankedList} selectCandidate={selectCandidate} moveFromRank={moveFromRank}/>
        <UnrankedList unrankedList={unrankedList} selectCandidate={selectCandidate}/>
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

const Ballot = props => {
    const {
        voterName,
        electionName,
        ballot,
        originalRankings,
        editedRankings,
        moveFromRank,
        errors,
        fetchBallotRequest,
        castBallotRequest,
        selectCandidate,
        clearBallot,
        globalSetUri
    } = props
    const hasPendingEdits = !R.equals(originalRankings, editedRankings)
    const rankIsNil = R.compose(R.isNil, R.prop('rank'))
    const noneRanked = R.all(rankIsNil, editedRankings)

    const onClickCastBallot = event => {
        castBallotRequest({voterName, electionName, rankings: editedRankings})
    }
    const onClickDiscardChanges = event => {
        fetchBallotRequest({voterName, electionName})
    }
    const onClickStartOver = event => {
        clearBallot()
    }
    return <div className={'Ballot columns-1-outer'}>
        <h1>Ballot</h1>
        <ErrorComponent errors={errors}/>
        <BallotSummary ballot={ballot}/>
        <Rankings rankings={editedRankings} selectCandidate={selectCandidate} moveFromRank={moveFromRank}/>
        <button type={"submit"} onClick={onClickCastBallot} disabled={!hasPendingEdits}>Cast Ballot</button>
        <button type={"submit"} onClick={onClickDiscardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <button type={"submit"} onClick={onClickStartOver} disabled={noneRanked}>Clear Ballot</button>
        <hr/>
        <Link href={createElectionPagePath(electionName)} setUri={globalSetUri}>election {electionName}</Link>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </div>
}

export default Ballot
