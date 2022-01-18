import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {isoDateToLocal} from "../library/date-time-util";

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
    const createRankingCell = ({confirmation, candidateName, rank}) => {
        return <td key={confirmation + candidateName}>[{rank}] {candidateName}</td>
    }
    const createRow = ({voterName, confirmation, whenCast, rankings}) => {
        const attachConfirmation = ({candidateName, rank}) => ({
            candidateName,
            rank,
            confirmation
        })
        const rankingsWithConfirmation = R.map(attachConfirmation, rankings)
        const rankingCells = R.map(createRankingCell, rankingsWithConfirmation)
        if(secretBallot){
            return <tr key={confirmation}>
                <td>{confirmation}</td>
                {rankingCells}
                <td>{isoDateToLocal(whenCast)}</td>
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
        if(secretBallot) {
            return <tr>
                <th>confirmation</th>
                <th colSpan={candidateNames.length}>rankings</th>
                <th>when cast</th>
            </tr>
        } else {
            return <tr>
                <th>voter</th>
                <th>confirmation</th>
                <th colSpan={candidateNames.length}>rankings</th>
                <th>when cast</th>
            </tr>
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

const Tally = args => {
    const {
        electionName,
        tally,
        errors,
        globalSetUri
    } = args
    const onClickAnchor = event => {
        event.preventDefault()
        const target = event.target
        const origin = target.origin
        const href = target.href
        const uri = href.substring(origin.length)
        globalSetUri(uri)
    }
    if (!tally) return <h1>No Data</h1>
    const {
        candidateNames, secretBallot, ballots, preferences, strongestPathMatrix, places, whoVoted
    } = tally
    return <div className={'Tally flex-column-outer'}>
        <h1>Tally</h1>
        <ErrorComponent errors={errors}/>
        <h2>Rankings</h2>
        <PlacesTable places={places}/>
        <h2>Candidates</h2>
        <CandidateTable candidateNames={candidateNames}/>
        <h2>Strengths</h2>
        <StrengthTable preferences={preferences}/>
        <PreferenceTable preferences={preferences}/>
        <h2>Strongest Paths</h2>
        <StrengthTable preferences={strongestPathMatrix}/>
        <PreferenceTable preferences={strongestPathMatrix}/>
        <VoterTable voters={whoVoted} secretBallot={secretBallot}/>
        <h2>Ballots</h2>
        <BallotsTable candidateNames={candidateNames} ballots={ballots} secretBallot={secretBallot}/>
        <hr/>
        <a href={createElectionPagePath(electionName)} onClick={onClickAnchor}>election {electionName}</a>
        <a href={dashboardPagePath} onClick={onClickAnchor}>dashboard</a>
    </div>
}

export default Tally
