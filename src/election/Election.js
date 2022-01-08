import './Election.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {delta} from "../library/collection-util";
import {pluralize} from "../library/text-util";
import {userDateToLocal, userDateToUtc, userDateToWellFormed, dateFormat} from "../library/date-time-util";
import {electionsPageName} from "../elections/electionsConstant";
import {dashboardPageName} from "../dashboard/dashboardConstant";
import {createCandidatesPagePath} from "../candidates/candidatesConstant";
import {createBallotPagePath} from "../ballot/ballotConstant";
import {createTallyPagePath} from "../tally/tallyConstant";

const NoYes = ({caption, value, changeValue, canUpdate}) => {
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
    const disabled = !canUpdate
    return <>
        <span>{caption}</span>
        <div className={'option'}>
            <button onClick={onClickNo} className={noClass} disabled={disabled}>No</button>
            <button onClick={onClickYes} className={yesClass} disabled={disabled}>Yes</button>
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

const DateUtc = ({value}) => {
    const utc = userDateToUtc(value)
    if(utc == null) return null
    return <span className={'subtle-text col-span-2'}>{utc}</span>
}

const DateLocal = ({value}) => {
    const localDate = userDateToLocal(value)
    if(localDate == null) return null
    return <span className={'subtle-text col-span-2'}>{localDate}</span>
}

const Election = (
    {
        user,
        canUpdate,
        originalElection,
        electionWithEdits,
        errors,
        fetchElectionRequest,
        updateElectionRequest,
        updateElectionEdits,
        deleteElectionRequest,
        errorAdded
    }) => {
    const hasPendingEdits = !R.equals(originalElection, electionWithEdits)
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
    const blurScheduledStart = event => {
        const scheduledStart = userDateToWellFormed(event.target.value)
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            scheduledStart
        }))
    }
    const blurScheduledEnd = event => {
        const scheduledEnd = userDateToWellFormed(event.target.value)
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            scheduledEnd
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
    const updateAllowChangesAfterVote = allowChangesAfterVote => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {allowChangesAfterVote}))
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
    const canDelete = canUpdate && !hasPendingEdits
    const candidateCount = originalElection.candidateCount
    const candidateCountText = `${candidateCount} ${pluralize({
        quantity: candidateCount,
        singular: 'candidate',
        plural: 'candidates'
    })}`

    return <div className={'Election'}>
        <h1>Election</h1>
        <ErrorComponent errors={errors}/>
        <div className={'elements'}>
            <span>Owner</span>
            <span>{originalElection.ownerName}</span>
            <span>Name</span>
            <input onChange={updateElectionName} value={name} readOnly={!canUpdate}/>
            <span>Scheduled Start</span>
            <input onChange={updateScheduledStart} onBlur={blurScheduledStart} size={25} placeholder={dateFormat} value={scheduledStart} readOnly={!canUpdate}/>
            <DateLocal className={'col-span-2'} value={scheduledStart}/>
            <DateUtc className={'col-span-2'} value={scheduledStart}/>
            <span>Scheduled End</span>
            <input onChange={updateScheduledEnd} onBlur={blurScheduledEnd} size={25} placeholder={dateFormat} value={scheduledEnd} readOnly={!canUpdate}/>
            <DateLocal className={'col-span-2'} value={scheduledEnd}/>
            <DateUtc className={'col-span-2'} value={scheduledEnd}/>
        </div>
        <div className={'elements'}>
            <NoYes caption={'Secret ballot'}
                   value={electionWithEdits.secretBallot}
                   changeValue={updateSecretBallot}
                   canUpdate={canUpdate}/>
            <NoYes caption={'Restrict who can vote'}
                   value={electionWithEdits.restrictWhoCanVote}
                   changeValue={updateRestrictWhoCanVote}
                   canUpdate={canUpdate}/>
            <NoYes caption={'Owner can delete ballots'}
                   value={electionWithEdits.ownerCanDeleteBallots}
                   changeValue={updateOwnerCanDeleteBallots}
                   canUpdate={canUpdate}/>
            <NoYes caption={'Auditor can delete ballots'}
                   value={electionWithEdits.auditorCanDeleteBallots}
                   changeValue={updateAuditorCanDeleteBallots}
                   canUpdate={canUpdate}/>
            <NoYes caption={'Is template'}
                   value={electionWithEdits.isTemplate}
                   changeValue={updateIsTemplate}
                   canUpdate={canUpdate}/>
            <NoYes caption={'Allow changes after vote'}
                   value={electionWithEdits.allowChangesAfterVote}
                   changeValue={updateAllowChangesAfterVote}
                   canUpdate={canUpdate}/>
            <NoYes caption={'Is open for voting'}
                   value={electionWithEdits.isOpen}
                   changeValue={updateIsOpen}
                   canUpdate={canUpdate}/>
        </div>
        <a href={createCandidatesPagePath(originalElection.name)}>{candidateCountText}</a>
        <a href={createBallotPagePath({voter:user, election:originalElection.name})}>ballot</a>
        <a href={createTallyPagePath(originalElection.name)}>tally</a>
        <button type={"submit"} onClick={applyChanges} disabled={!hasPendingEdits}>Apply Changes</button>
        <button type={"submit"} onClick={fetchElectionRequest} disabled={!hasPendingEdits}>Discard Changes</button>
        <button type={"submit"} onClick={deleteElectionClicked} disabled={!canDelete}>Delete Election</button>
        <a href={electionsPageName}>elections</a>
        <a href={dashboardPageName}>dashboard</a>
    </div>
}

export default Election
