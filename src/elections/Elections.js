import './Elections.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import React from "react";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createElectionPagePath} from "../election/electionConstant";

const ElectionList = ({elections}) => {
    const createElectionListElement = election => {
        return <li key={election.name}><a href={createElectionPagePath(election.name)}>{election.name}</a></li>
    }
    const electionListElements = R.map(createElectionListElement, elections)
    return <ul className={'elements'}>
        {electionListElements}
    </ul>
}

const AddElection = ({electionName, electionNameChanged, addElectionRequest}) => {
    const onKeyUp = event => {
        if (R.trim(electionName) === '') return
        if (event.key !== 'Enter') return
        addElectionRequest(electionName)
    }
    const onChange = event => {
        electionNameChanged(event.target.value)
    }
    return <input value={electionName}
                  autoFocus={true}
                  placeholder={'<new election name>'}
                  onKeyUp={onKeyUp}
                  onChange={onChange}/>
}

const Elections = ({elections, electionName, errors, electionNameChanged, addElectionRequest}) => {
    return <div className={'Elections'}>
        <h1>Elections</h1>
        <ErrorComponent errors={errors}/>
        <AddElection electionName={electionName} electionNameChanged={electionNameChanged}
                     addElectionRequest={addElectionRequest}/>
        <ElectionList elections={elections}/>
        <hr/>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default Elections
