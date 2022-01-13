import './Voters.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const equalsIgnoreCase = (first, second) => {
    return first.toLowerCase() === second.toLowerCase()
}

const matchesFilter = filter => target => {
    if (filter === '') return true
    let filterIndex = 0
    let targetIndex = 0
    while (filterIndex < filter.length && targetIndex < target.length) {
        if (equalsIgnoreCase(filter[filterIndex], target[targetIndex])) {
            filterIndex++
            targetIndex++
        } else {
            targetIndex++
        }
    }
    return filterIndex >= filter.length
}

const eligibleClass = eligible => {
    if(eligible){
        return 'selected'
    } else {
        return 'not-selected'
    }
}

const Voter = ({name, eligible, onClick}) => {
    const theClass = eligibleClass(eligible)
    return <li className={theClass} onClick={onClick}>{name}</li>
}

const VoterList = ({voters, setVoterEligibility, filter}) => {
    const createVoterElement = voter =>{
        const onClick = () => {
            setVoterEligibility({name:voter.name, eligible:!voter.eligible})
        }
        return <Voter key={voter.name} name={voter.name} eligible={voter.eligible} onClick={onClick}/>
    }
    const nameMatchesFilter = voter => matchesFilter(filter)(voter.name)
    const filteredVoters = R.filter(nameMatchesFilter, voters)
    const voterElements = R.map(createVoterElement, filteredVoters)
    return <ul className={'flex'}>
        {voterElements}
    </ul>
}

const Voters = (
    {
        electionName,
        filter,
        originalVoters,
        votersWithEdits,
        filterChanged,
        updateVoterEdits,
        setVotersRequest,
        fetchVotersRequest,
        errors
    }) => {
    const hasPendingEdits = !R.equals(originalVoters, votersWithEdits)
    const applyChanges = () => {
        const eligibleVoters = R.filter(R.prop('eligible'), votersWithEdits)
        const eligibleVoterNames = R.map(R.prop('name'), eligibleVoters)
        setVotersRequest({election:electionName, voters:eligibleVoterNames})
    }
    const discardChanges = () => {
        fetchVotersRequest(electionName)
    }
    const setVoterEligibility = updatedVoter => {
        const updateVoter = originalVoter => {
            if(updatedVoter.name === originalVoter.name){
                return updatedVoter
            } else {
                return originalVoter
            }
        }
        const newVotersWithEdits = R.map(updateVoter, votersWithEdits)
        updateVoterEdits(newVotersWithEdits)
    }
    const onChangeFilter = event => {
        filterChanged(event.target.value)
    }
    return <div className={'Voters center-page'}>
        <div className={'single-column'}>
            <h1>Voters for {electionName}</h1>
            <ErrorComponent errors={errors}/>
            <span>Filter</span>
            <input onChange={onChangeFilter}/>
            <VoterList voters={votersWithEdits} setVoterEligibility={setVoterEligibility} filter={filter}/>
            <button type={"submit"} onClick={applyChanges} disabled={!hasPendingEdits}>Apply Changes</button>
            <button type={"submit"} onClick={discardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
            <hr/>
            <a href={createElectionPagePath(electionName)}>election {electionName}</a>
            <a href={dashboardPagePath}>dashboard</a>
        </div>
    </div>
}

export default Voters
