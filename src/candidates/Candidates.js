import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {Link} from "../library/uri-util";

const Candidates = (
    {
        electionName,
        originalCandidates,
        candidatesWithEdits,
        updateCandidateEdits,
        setCandidatesRequest,
        fetchCandidatesRequest,
        errors,
        globalSetUri
    }) => {
    const hasPendingEdits = !R.equals(originalCandidates, candidatesWithEdits)
    const candidatesString = R.join('\n', candidatesWithEdits)
    const candidatesCount = candidatesWithEdits.length
    const maxCandidateLength = R.reduce(R.max, 0, R.map(R.length, candidatesWithEdits))

    const onCandidatesChanged = event => {
        const candidateNames = R.split(/\n/, event.target.value)
        updateCandidateEdits(candidateNames)
    }
    const applyChanges = () => {
        setCandidatesRequest(electionName, candidatesWithEdits)
    }
    const discardChanges = () => {
        fetchCandidatesRequest(electionName)
    }
    return <div className={'Candidates columns-1-outer'}>
        <h1>Candidates for {electionName}</h1>
        <ErrorComponent errors={errors}/>
        <textarea
            rows={candidatesCount}
            cols={maxCandidateLength}
            value={candidatesString}
            onChange={onCandidatesChanged}/>
        <button type={"submit"} onClick={applyChanges} disabled={!hasPendingEdits}>Apply Changes</button>
        <button type={"submit"} onClick={discardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <hr/>
        <Link href={createElectionPagePath(electionName)} setUri={globalSetUri}>election {electionName}</Link>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </div>
}

export default Candidates
