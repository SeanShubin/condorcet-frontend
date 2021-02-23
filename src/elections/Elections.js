import './Elections.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'

const ElectionList = ({elections}) => {
    const createElectionListElement = election => <li key={election.name}>{election.name}</li>
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

const Elections = ({elections, electionName, errors, setUri, electionNameChanged, addElectionRequest}) => {
    const onClickDashboard = event => {
        event.preventDefault()
        setUri('/dashboard')
    }
    return <div className={'Elections'}>
        <h1>Elections</h1>
        <ErrorComponent errors={errors}/>
        <a onClick={onClickDashboard}>dashboard</a>
        <AddElection electionName={electionName} electionNameChanged={electionNameChanged}
                     addElectionRequest={addElectionRequest}/>
        <ElectionList elections={elections}/>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Elections
