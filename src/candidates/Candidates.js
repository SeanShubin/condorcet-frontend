import './Candidates.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'

const Candidates = (
    {
        electionName,
        candidates,
        changeCandidates,
        errors
    }) => {
    const candidatesString = R.join('\n', candidates)
    const onCandidatesChanged = event => {
        const candidates = R.split(/\n/, event.target.value)
        changeCandidates(candidates)
    }
    return <div className={'Candidates'}>
        <h1>Candidates for {electionName}</h1>
        <ErrorComponent errors={errors}/>
        <textarea
            rows={"4"}
            cols={"100"}
            value={candidatesString}
            onChange={onCandidatesChanged}/>
        <button type={"submit"}>Apply Changes</button>
        <button type={"submit"}>Discard Changes</button>
        <a>election {electionName}</a>
        <a>dashboard</a>
    </div>
}

export default Candidates
