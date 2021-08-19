import './Election.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {delta} from "../library/collection-util";

const NoYes = ({caption, value, changeValue}) => {
    let noClass;
    let yesClass;
    if (value) {
        noClass = 'not-selected'
        yesClass = 'selected'
    } else {
        noClass = 'selected'
        yesClass = 'not-selected'
    }
    const onClickNo = () => {
        changeValue(false)
    }
    const onClickYes = () => {
        changeValue(true)
    }
    return <>
        <span>{caption}</span>
        <div className={'option'}>
            <button onClick={onClickNo} className={noClass}>No</button>
            <button onClick={onClickYes} className={yesClass}>Yes</button>
        </div>
    </>
}

const nullIfBlank = value => {
    if (R.trim(value) === '') return null
    return value
}

const blankIfFalsy = value => {
    if (value) return value
    return ''
}

const Election = (
    {
        originalElection,
        electionWithEdits,
        errors,
        fetchElectionRequest,
        updateElectionRequest,
        updateElectionEdits,
        deleteElectionRequest,
        errorAdded,
        setUri
    }) => {
    const hasPendingEdits = !R.equals(originalElection, electionWithEdits)
    const onClickElections = event => {
        event.preventDefault()
        setUri('/elections')
    }
    const onClickDashboard = event => {
        event.preventDefault()
        setUri('/dashboard')
    }
    const updateElectionName = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            name: nullIfBlank(event.target.value)
        }))
    }
    const updateScheduledStart = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            scheduledStart: nullIfBlank(event.target.value)
        }))
    }
    const updateScheduledEnd = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            scheduledEnd: nullIfBlank(event.target.value)
        }))
    }
    const updateSecretBallot = secretBallot => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {secretBallot}))
    }
    const updateRestrictWhoCanVote = restrictWhoCanVote => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {restrictWhoCanVote}))
    }
    const updateOwnerCanDeleteBallots = ownerCanDeleteBallots => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {ownerCanDeleteBallots}))
    }
    const updateAuditorCanDeleteBallots = auditorCanDeleteBallots => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {auditorCanDeleteBallots}))
    }
    const updateIsTemplate = isTemplate => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {isTemplate}))
    }
    const updateNoChangesAfterVote = noChangesAfterVote => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {noChangesAfterVote}))
    }
    const updateIsOpen = isOpen => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {isOpen}))
    }
    const applyChangesWithRename = changes => {
        const request = R.mergeRight(changes, {
            name: originalElection.name,
            newName: electionWithEdits.name
        })
        updateElectionRequest(request)
    }
    const applyChangesWithoutRename = changes => {
        const request = R.mergeRight(changes, {
            name: originalElection.name
        })
        updateElectionRequest(request)
    }
    const applyChanges = () => {
        const changes = delta({fromValue: originalElection, toValue: electionWithEdits})
        if (changes.name) {
            applyChangesWithRename(changes)
        } else {
            applyChangesWithoutRename(changes)
        }
    }
    const deleteElectionClicked = () => {
        if (originalElection.name === electionWithEdits.name) {
            deleteElectionRequest(originalElection.name)
        } else {
            errorAdded('Can not delete an election with pending edits')
        }
    }
    const name = blankIfFalsy(electionWithEdits.name)
    const scheduledStart = blankIfFalsy(electionWithEdits.scheduledStart)
    const scheduledEnd = blankIfFalsy(electionWithEdits.scheduledEnd)
    return <div className={'Election'}>
        <h1>Election</h1>
        <ErrorComponent errors={errors}/>
        <div className={'elements'}>
            <span>Owner</span>
            <span>{originalElection.ownerName}</span>
            <span>Name</span>
            <input onChange={updateElectionName} value={name}/>
            <span>Scheduled Start</span>
            <input onChange={updateScheduledStart} value={scheduledStart}/>
            <span>Scheduled End</span>
            <input onChange={updateScheduledEnd} value={scheduledEnd}/>
        </div>
        <div className={'elements'}>
            <NoYes caption={'Secret ballot'}
                   value={electionWithEdits.secretBallot}
                   changeValue={updateSecretBallot}/>
            <NoYes caption={'Restrict who can vote'}
                   value={electionWithEdits.restrictWhoCanVote}
                   changeValue={updateRestrictWhoCanVote}/>
            <NoYes caption={'Owner can delete ballots'}
                   value={electionWithEdits.ownerCanDeleteBallots}
                   changeValue={updateOwnerCanDeleteBallots}/>
            <NoYes caption={'Auditor can delete ballots'}
                   value={electionWithEdits.auditorCanDeleteBallots}
                   changeValue={updateAuditorCanDeleteBallots}/>
            <NoYes caption={'Is template'}
                   value={electionWithEdits.isTemplate}
                   changeValue={updateIsTemplate}/>
            <NoYes caption={'No changes after vote'}
                   value={electionWithEdits.noChangesAfterVote}
                   changeValue={updateNoChangesAfterVote}/>
            <NoYes caption={'Is open for voting'}
                   value={electionWithEdits.isOpen}
                   changeValue={updateIsOpen}/>
        </div>
        <button type={"submit"} onClick={applyChanges} disabled={!hasPendingEdits}>Apply Changes</button>
        <button type={"submit"} onClick={fetchElectionRequest} disabled={!hasPendingEdits}>Discard Changes</button>
        <button type={"submit"} onClick={deleteElectionClicked} disabled={hasPendingEdits}>Delete Election</button>
        <a onClick={onClickElections}>elections</a>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Election
