import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import React from "react";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createElectionPagePath} from "../election/electionConstant";
import {Link} from "../library/uri-util";

const ElectionList = ({elections, setUri}) => {
    const createElectionListElement = election => {
        return <li key={election.electionName}><Link href={createElectionPagePath(election.electionName)} setUri={setUri}>{election.electionName}</Link></li>
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
    return <div className={'Elections columns-1-outer'}>
        <h1>Elections</h1>
        <ErrorComponent errors={errors}/>
        <AddElection electionName={electionName} electionNameChanged={electionNameChanged}
                     addElectionRequest={addElectionRequest}/>
        <ElectionList elections={elections} setUri={globalSetUri}/>
        <hr/>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </div>
}

export default Elections
