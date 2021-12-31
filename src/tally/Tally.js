import './Tally.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'

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

const CandidateTable = ({candidates}) => {
    const createCandidateRow = candidate => {
        return <tr key={candidate}>
            <td>{candidate}</td>
        </tr>
    }
    const candidateRows = R.map(createCandidateRow, candidates)
    return <table>
        <tbody>
        {candidateRows}
        </tbody>
    </table>
}

const PlacesTable = ({places}) => {
    const createPlaceRow = ({rank, candidate}) => {
        return <tr key={candidate}>
            <td>{rank}</td>
            <td>{candidate}</td>
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

const BallotsTable = ({ballots}) => {
    const createCell = ({candidateName, rank}) => {
        return <td>[{rank}] {candidateName}</td>
    }
    const createRow = ballot => {
        const cells = R.map(createCell, ballot.rankings)
        return <tr>{cells}</tr>
    }
    const tableRows = R.map(createRow, ballots)
    return <table>
        <tbody>
        {tableRows}
        </tbody>
    </table>
}

const Tally = args => {
    const {
        election,
        tally,
        errors,
        navigateElection,
        navigateDashboard
    } = args
    if (!tally) return <h1>No Data</h1>
    const {
        candidates, ballots, preferences, strongestPathMatrix, places
    } = tally
    const onClickElection = event => {
        event.preventDefault()
        navigateElection(election)
    }
    const onClickDashboard = event => {
        event.preventDefault()
        navigateDashboard();
    }
    return <div className={'Tally'}>
        <h1>Tally</h1>
        <ErrorComponent errors={errors}/>
        <a onClick={onClickElection}>election</a>
        <a onClick={onClickDashboard}>dashboard</a>
        <h2>Rankings</h2>
        <PlacesTable places={places}/>
        <h2>Candidates</h2>
        <CandidateTable candidates={candidates}/>
        <h2>Ballots</h2>
        <BallotsTable ballots={ballots}/>
        <h2>Strengths</h2>
        <StrengthTable preferences={preferences}/>
        <PreferenceTable preferences={preferences}/>
        <h2>Strongest Paths</h2>
        <StrengthTable preferences={strongestPathMatrix}/>
        <PreferenceTable preferences={strongestPathMatrix}/>
        <a onClick={onClickElection}>election</a>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Tally
