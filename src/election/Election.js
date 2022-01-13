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
import {createVotersPagePath} from "../voters/votersConstant";

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

const statusOfElection = election => {
    if(election.allowEdit) {
        if(election.allowVote) {
            return "Waiting for votes (editable)"
        } else {
            return "Waiting for launch"
        }
    } else {
        if(election.allowVote) {
            return "Waiting for votes (fixed)"
        } else {
            return "Closed"
        }
    }
}

const Election = (
    {
        user,
        originalElection,
        electionWithEdits,
        errors,
        fetchElectionRequest,
        updateElectionRequest,
        updateElectionEdits,
        deleteElectionRequest,
        launchElectionRequest,
        finalizeElectionRequest,
        errorAdded
    }) => {
    const hasPendingEdits = !R.equals(originalElection, electionWithEdits)
    const isOwner = user === originalElection.ownerName
    const canEditElection = isOwner && originalElection.allowEdit && !originalElection.allowVote
    const canDelete = isOwner && !hasPendingEdits

    const updateElectionName = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            name: nullIfBlank(event.target.value)
        }))
    }
    const updateNoVotingBefore = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            noVotingBefore: nullIfBlank(event.target.value)
        }))
    }
    const updateNoVotingAfter = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            noVotingAfter: nullIfBlank(event.target.value)
        }))
    }
    const blurNoVotingBefore = event => {
        const noVotingBefore = userDateToWellFormed(event.target.value)
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            noVotingBefore
        }))
    }
    const blurNoVotingAfter = event => {
        const noVotingAfter = userDateToWellFormed(event.target.value)
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            noVotingAfter
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
    const applyChangesClicked = () => {
        const changes = delta({fromValue: originalElection, toValue: electionWithEdits})
        if (changes.name) {
            applyChangesWithRename(changes)
        } else {
            applyChangesWithoutRename(changes)
        }
    }
    const discardChangesClicked = () => {
        fetchElectionRequest(originalElection.name)
    }
    const deleteElectionClicked = () => {
        if (originalElection.name === electionWithEdits.name) {
            deleteElectionRequest(originalElection.name)
        } else {
            errorAdded('Can not delete an election with pending edits')
        }
    }
    const launchFixedClicked = () => {
        const election = originalElection.name
        const allowEdit = false
        launchElectionRequest({election, allowEdit})
    }

    const launchEditableClicked = () => {
        const election = originalElection.name
        const allowEdit = true
        launchElectionRequest({election, allowEdit})
    }

    const finalizeTallyClicked = () => {
        finalizeElectionRequest(originalElection.name)
    }
    const name = blankIfFalsy(electionWithEdits.name)
    const noVotingBefore = blankIfFalsy(electionWithEdits.noVotingBefore)
    const noVotingAfter = blankIfFalsy(electionWithEdits.noVotingAfter)
    const candidateCount = originalElection.candidateCount
    const voterCount = originalElection.voterCount
    const candidateCountText = `${candidateCount} ${pluralize({
        quantity: candidateCount,
        singular: 'candidate',
        plural: 'candidates'
    })}`
    const voterCountText = `${voterCount} ${pluralize({
        quantity: voterCount,
        singular: 'voter',
        plural: 'voters'
    })}`
    const status = statusOfElection(originalElection)
    const canLaunch = !hasPendingEdits && !originalElection.allowVote && originalElection.allowEdit
    const canFinalize = !hasPendingEdits && originalElection.allowVote

    return <div className={'Election'}>
        <h1>Election</h1>
        <ErrorComponent errors={errors}/>
        <div className={'elements'}>
            <span>Owner</span>
            <span>{originalElection.ownerName}</span>
            <span>Status</span>
            <span>{status}</span>
            <span>Name</span>
            <input onChange={updateElectionName}
                   value={name}
                   readOnly={!canEditElection}/>
            <span>No Voting Before</span>
            <input onChange={updateNoVotingBefore}
                   onBlur={blurNoVotingBefore}
                   size={25}
                   placeholder={dateFormat}
                   value={noVotingBefore}
                   readOnly={!canEditElection}/>
            <DateLocal className={'col-span-2'} value={noVotingBefore}/>
            <DateUtc className={'col-span-2'} value={noVotingBefore}/>
            <span>No Voting After</span>
            <input onChange={updateNoVotingAfter}
                   onBlur={blurNoVotingAfter}
                   size={25}
                   placeholder={dateFormat}
                   value={noVotingAfter}
                   readOnly={!canEditElection}/>
            <DateLocal className={'col-span-2'} value={noVotingAfter}/>
            <DateUtc className={'col-span-2'} value={noVotingAfter}/>
        </div>
        <div className={'elements'}>
            <NoYes caption={'Secret ballot'}
                   value={electionWithEdits.secretBallot}
                   changeValue={updateSecretBallot}
                   canUpdate={canEditElection}
                   disabled={!originalElection.allowEdit}
            />
            <NoYes caption={'Restrict who can vote'}
                   value={electionWithEdits.restrictWhoCanVote}
                   changeValue={updateRestrictWhoCanVote}
                   canUpdate={canEditElection}/>
            <NoYes caption={'Owner can delete ballots'}
                   value={electionWithEdits.ownerCanDeleteBallots}
                   changeValue={updateOwnerCanDeleteBallots}
                   canUpdate={canEditElection}/>
            <NoYes caption={'Auditor can delete ballots'}
                   value={electionWithEdits.auditorCanDeleteBallots}
                   changeValue={updateAuditorCanDeleteBallots}
                   canUpdate={canEditElection}/>
            <NoYes caption={'Is template'}
                   value={electionWithEdits.isTemplate}
                   changeValue={updateIsTemplate}
                   canUpdate={isOwner}/>
        </div>
        <a href={createCandidatesPagePath(originalElection.name)}>{candidateCountText}</a>
        <a href={createVotersPagePath(originalElection.name)}>{voterCountText}</a>
        <a href={createBallotPagePath({voter:user, election:originalElection.name})}>ballot</a>
        <a href={createTallyPagePath(originalElection.name)}>tally</a>
        <button type={"submit"} onClick={applyChangesClicked} disabled={!hasPendingEdits}>Apply Changes</button>
        <button type={"submit"} onClick={discardChangesClicked} disabled={!hasPendingEdits}>Discard Changes</button>
        <hr/>
        <button type={"submit"} onClick={launchFixedClicked} disabled={!canLaunch}>Launch (fixed)</button>
        <button type={"submit"} onClick={launchEditableClicked} disabled={!canLaunch}>Launch (editable)</button>
        <button type={"submit"} onClick={finalizeTallyClicked} disabled={!canFinalize}>Finalize Tally</button>
        <button type={"submit"} onClick={deleteElectionClicked} disabled={!canDelete}>Delete Election</button>
        <hr/>
        <a href={electionsPageName}>elections</a>
        <a href={dashboardPageName}>dashboard</a>
    </div>
}

export default Election
