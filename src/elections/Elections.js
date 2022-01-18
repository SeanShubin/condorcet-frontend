import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import React from "react";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createElectionPagePath} from "../election/electionConstant";

const ElectionList = ({elections, onClickAnchor}) => {
    const createElectionListElement = election => {
        return <li key={election.electionName}><a href={createElectionPagePath(election.electionName)} onClick={onClickAnchor}>{election.electionName}</a></li>
    }
    const electionListElements = R.map(createElectionListElement, elections)
    return <ul className={'columns-1-inner'}>
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

const Elections = (
    {
        elections,
        electionName,
        errors,
        electionNameChanged,
        addElectionRequest,
        globalSetUri
    }) => {
    const onClickAnchor = event => {
        event.preventDefault()
        const target = event.target
        const origin = target.origin
        const href = target.href
        const uri = href.substring(origin.length)
        globalSetUri(uri)
    }
    return <div className={'Elections columns-1-outer'}>
        <h1>Elections</h1>
        <ErrorComponent errors={errors}/>
        <AddElection electionName={electionName} electionNameChanged={electionNameChanged}
                     addElectionRequest={addElectionRequest}/>
        <ElectionList elections={elections} onClickAnchor={onClickAnchor}/>
        <hr/>
        <a href={dashboardPagePath} onClick={onClickAnchor}>dashboard</a>
    </div>
}

export default Elections
