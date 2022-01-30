import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {isoDateToLocal} from "../library/date-time-util";
import {Link} from "../library/uri-util";
import {electionsPagePath} from "../elections/electionsConstant";
import React from "react";

const StrengthTable = ({preferences}) => {
    const createCell = preference => <td key={preference.destination}>{preference.strength}</td>
    const createRow = row => {
        const firstPreference = row[0]
        const key = firstPreference.origin
        return <tr key={key}>{R.map(createCell, row)}</tr>
    }
    const tableRows = R.map(createRow, preferences)
    return <table>
        <tbody>
        {tableRows}
        </tbody>
    </table>
}

const formatPreference = preference => {
    const {
        path, strengths
    } = preference
    const pathStart = path[0]
    const formatStrength = strength => `-(${strength})-`
    const formattedStrengths = R.map(formatStrength, strengths)
    const asString = R.join('')(R.prepend(pathStart, R.flatten(R.zip(formattedStrengths, R.tail(path)))))
    return asString
}

const PreferenceTable = ({preferences}) => {
    const flattened = R.flatten(preferences)
    const createRow = preference => {
        if (preference.origin === preference.destination) return null
        const key = '' + preference.origin + '-' + preference.destination
        return <tr key={key}>
            <td>{preference.origin}</td>
            <td>{preference.strength}</td>
            <td>{preference.destination}</td>
            <td>{formatPreference(preference)}</td>
        </tr>
    }
    const tableRows = R.map(createRow, flattened)
    return <table>
        <tbody>
        {tableRows}
        </tbody>
    </table>
}

const CandidateTable = ({candidateNames}) => {
    const createCandidateRow = candidateName => {
        return <tr key={candidateName}>
            <td>{candidateName}</td>
        </tr>
    }
    const candidateRows = R.map(createCandidateRow, candidateNames)
    return <table>
        <tbody>
        {candidateRows}
        </tbody>
    </table>
}

const PlacesTable = ({places}) => {
    const createPlaceRow = ({rank, candidateName}) => {
        return <tr key={candidateName}>
            <td>{rank}</td>
            <td>{candidateName}</td>
        </tr>
    }
    const placeRows = R.map(createPlaceRow, places)
    return <table>
        <thead>
        <tr>
            <th>rank</th>
            <th>name</th>
        </tr>
        </thead>
        <tbody>
        {placeRows}
        </tbody>
    </table>
}

const BallotsTable = ({candidateNames, ballots, secretBallot}) => {
    const createRow = ({voterName, confirmation, whenCast, rankings}) => {
        const createCandidateRankEntry = ranking => [ranking.candidateName, ranking.rank]
        const candidateRankingMap = R.fromPairs(R.map(createCandidateRankEntry, rankings))
        const createRankingCell = candidateName => {
            const rank = candidateRankingMap[candidateName]
            return <td key={candidateName}>{rank}</td>
        }
        const rankingCells = R.map(createRankingCell, candidateNames)
        if(secretBallot){
            return <tr key={confirmation}>
                <td>{confirmation}</td>
                {rankingCells}
            </tr>
        }else {
            return <tr key={confirmation}>
                <td>{voterName}</td>
                <td>{confirmation}</td>
                {rankingCells}
                <td>{isoDateToLocal(whenCast)}</td>
            </tr>
        }
    }
    const createTableHeader = secretBallot => {
        const createCandidateNameHeader = candidateName => <td key={candidateName}>{candidateName}</td>
        const candidateNameHeaders = R.map(createCandidateNameHeader, candidateNames)
        if(secretBallot) {
            return <>
                <tr>
                    <th>confirmation</th>
                    <th colSpan={candidateNames.length}>rankings</th>
                </tr>
                <tr>
                    <th/>
                    {candidateNameHeaders}
                </tr>
            </>
        } else {
            return <>
                <tr>
                    <th>voter</th>
                    <th>confirmation</th>
                    <th colSpan={candidateNames.length}>rankings</th>
                    <th>when cast</th>
                </tr>
                <tr>
                    <th/>
                    <th/>
                    {candidateNameHeaders}
                    <th/>
                </tr>
            </>
        }
    }
    const tableRows = R.map(createRow, ballots)
    const tableHeader = createTableHeader(secretBallot)
    return <table>
        <thead>
        {tableHeader}
        </thead>
        <tbody>
        {tableRows}
        </tbody>
    </table>
}

const VoterTable = ({voters, secretBallot}) => {
    if(!secretBallot) return null
    const createVoterRow = voter => {
        return <tr key={voter}>
            <td>{voter}</td>
        </tr>
    }
    const voterRows = R.map(createVoterRow, voters)
    return <>
        <h2>Who Voted</h2>
        <table>
            <tbody>
            {voterRows}
            </tbody>
        </table>
    </>
}

const rankedPairStrengths = ({preferences, candidates}) => firstIndex => secondIndex => {
    const firstCandidate = candidates[firstIndex]
    const secondCandidate = candidates[secondIndex]
    const firstStrength = preferences[firstIndex][secondIndex].strength
    const secondStrength = preferences[secondIndex][firstIndex].strength
    return {
        first:{index:firstIndex, candidate:firstCandidate, strength:firstStrength},
        second:{index:secondIndex, candidate:secondCandidate, strength: secondStrength}
    }
}

const formatRankedPair = rankedPair => {
    const firstStrength = rankedPair.first.strength
    const secondStrength = rankedPair.second.strength
    const totalStrength = firstStrength + secondStrength
    const relativeStrength = firstStrength / totalStrength
    const percentageStrength = (relativeStrength * 100).toFixed(2) + '%'
    const description = `${firstStrength}/${totalStrength} vs ${secondStrength}/${totalStrength}`
    return {
        first: rankedPair.first.candidate,
        percentage: percentageStrength,
        second: rankedPair.second.candidate,
        description
    }
}

const rankedPairsForCandidate = ({preferences, candidates}) => candidateIndex => {
    const indices = R.filter(i => i !== candidateIndex, R.range(0, candidates.length))
    const strengths = R.map(rankedPairStrengths({preferences, candidates})(candidateIndex), indices)
    const isGreater = rankedPairStrength => {
        if(rankedPairStrength.first.strength < rankedPairStrength.second.strength) return false
        if(rankedPairStrength.first.strength > rankedPairStrength.second.strength) return true
        return rankedPairStrength.first.index > rankedPairStrength.second.index
    }
    const greaterStrengths = R.filter(isGreater, strengths)
    const formatted = R.map(formatRankedPair, greaterStrengths)
    return formatted
}

const rankedPairsRows = ({candidates, preferences}) => {
    const indices = R.range(0, candidates.length)
    return R.chain(rankedPairsForCandidate({preferences, candidates}), indices)
}

const RankedPairsReport = ({candidateNames, preferences}) => {
    const dataRows = rankedPairsRows({preferences, candidates:candidateNames})
    const createRenderedRow = row => {
        const key = `${row.first}-${row.second}`
        return <tr key={key}><td>{row.percentage}</td><td>{row.first}</td><td>{row.second}</td><td>{row.description}</td></tr>
    }
    const renderedRows = R.map(createRenderedRow, dataRows)
    return <table>
        <tbody>
        {renderedRows}
        </tbody>
    </table>
}

const TallyBody = ({tally}) => {
    if(!tally) return null
    const {
        electionName, candidateNames, secretBallot, ballots, preferences, strongestPathMatrix, places, whoVoted
    } = tally
    return <>
        <h2>Election: {electionName}</h2>
        <h2>Rankings</h2>
        <PlacesTable places={places}/>
        <h2>Ballots</h2>
        <BallotsTable candidateNames={candidateNames} ballots={ballots} secretBallot={secretBallot}/>
        <h2>Preferences</h2>
        <RankedPairsReport candidateNames={candidateNames} preferences={preferences}/>
        <StrengthTable preferences={preferences}/>
        <PreferenceTable preferences={preferences}/>
        <h2>Strongest Paths</h2>
        <RankedPairsReport candidateNames={candidateNames} preferences={strongestPathMatrix}/>
        <StrengthTable preferences={strongestPathMatrix}/>
        <PreferenceTable preferences={strongestPathMatrix}/>
        <VoterTable voters={whoVoted} secretBallot={secretBallot}/>
    </>
}

const Tally = args => {
    const {
        electionName,
        tally,
        errors,
        globalSetUri
    } = args
    return <div className={'Tally flex-column-outer'}>
        <h1>Tally</h1>
        <ErrorComponent errors={errors}/>
        <TallyBody tally={tally}/>
        <hr/>
        <Link href={createElectionPagePath(electionName)} setUri={globalSetUri}>election {electionName}</Link>
        <Link href={electionsPagePath} setUri={globalSetUri}>elections</Link>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </div>
}

export default Tally
