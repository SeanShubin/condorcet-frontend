import './Tally.css'
import ErrorComponent from "../error/ErrorComponent";
import util from "util";


const Tally = (
    {
        electionName,
        tally,
        errors,
        navigateElection,
        navigateDashboard
    }) => {
    const onClickElection = event => {
        event.preventDefault()
        navigateElection(electionName)
    }

    const onClickDashboard = event => {
        event.preventDefault()
        navigateDashboard();
    }

    const showHidden = false
    const depth = null

    return <div className={'Tally'}>
        <h1>Tally</h1>
        <ErrorComponent errors={errors}/>
        <pre>
            {util.inspect(tally, showHidden, depth)}
        </pre>
        <a onClick={onClickElection}>election</a>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Tally
