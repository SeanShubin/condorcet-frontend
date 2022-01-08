import './Candidates.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const Candidates = (
    {
        electionName,
        originalCandidates,
        candidatesWithEdits,
        updateCandidateEdits,
        setCandidatesRequest,
        fetchCandidatesRequest,
        errors
    }) => {
    const hasPendingEdits = !R.equals(originalCandidates, candidatesWithEdits)
    const candidatesString = R.join('\n', candidatesWithEdits)
    const candidatesCount = candidatesWithEdits.length
    const maxCandidateLength = R.reduce(R.max, 0, R.map(R.length, candidatesWithEdits))

    const onCandidatesChanged = event => {
        const candidates = R.split(/\n/, event.target.value)
        updateCandidateEdits(candidates)
    }
    const applyChanges = () => {
        setCandidatesRequest(electionName, candidatesWithEdits)
    }
    const discardChanges = () => {
        fetchCandidatesRequest(electionName)
    }
    return <div className={'Candidates'}>
        <h1>Candidates for {electionName}</h1>
        <ErrorComponent errors={errors}/>
        <textarea
            rows={candidatesCount}
            cols={maxCandidateLength}
            value={candidatesString}
            onChange={onCandidatesChanged}/>
        <button type={"submit"} onClick={applyChanges} disabled={!hasPendingEdits}>Apply Changes</button>
        <button type={"submit"} onClick={discardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
        <a href={createElectionPagePath(electionName)}>election {electionName}</a>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default Candidates
