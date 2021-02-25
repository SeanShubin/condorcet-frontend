import './Election.css'
import ErrorComponent from "../error/ErrorComponent";

const Election = ({election, errors, modifyElectionRequest, setUri}) => {
    const onClickElections = event => {
        event.preventDefault()
        setUri('/elections')
    }
    const onClickDashboard = event => {
        event.preventDefault()
        setUri('/dashboard')
    }
    return <div className={'Election'}>
        <h1>Election</h1>
        <ErrorComponent errors={errors}/>
        <pre>{JSON.stringify(election, null, 2)}</pre>
        <a onClick={onClickElections}>elections</a>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Election
