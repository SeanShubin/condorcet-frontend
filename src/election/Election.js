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

const voterCountTextFor = voterCount => {
    if(voterCount === 0) {
        return 'anyone can vote'
    } else {
        return '' + voterCount + ' ' + pluralize({
            quantity: voterCount,
            singular: 'voter',
            plural: 'voters'
        })
    }
}

const Election = (
    {
        userName,
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
    const isOwner = userName === originalElection.ownerName
    const canEditElection = isOwner && originalElection.allowEdit && !originalElection.allowVote
    const canDelete = isOwner && !hasPendingEdits

    const updateElectionName = event => {
        updateElectionEdits(R.mergeRight(electionWithEdits, {
            electionName: nullIfBlank(event.target.value)
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
    const applyChangesWithRename = changes => {
        const request = R.mergeRight(changes, {
            electionName: originalElection.electionName,
            newElectionName: electionWithEdits.electionName
        })
        updateElectionRequest(request)
    }
    const applyChangesWithoutRename = changes => {
        const request = R.mergeRight(changes, {
            electionName: originalElection.electionName
        })
        updateElectionRequest(request)
    }
    const applyChangesClicked = () => {
        const changes = delta({fromValue: originalElection, toValue: electionWithEdits})
        if (changes.electionName) {
            applyChangesWithRename(changes)
        } else {
            applyChangesWithoutRename(changes)
        }
    }
    const discardChangesClicked = () => {
        fetchElectionRequest(originalElection.electionName)
    }
    const deleteElectionClicked = () => {
        if (originalElection.electionName === electionWithEdits.electionName) {
            deleteElectionRequest(originalElection.electionName)
        } else {
            errorAdded('Can not delete an election with pending edits')
        }
    }
    const launchFixedClicked = () => {
        const electionName = originalElection.electionName
        const allowEdit = false
        launchElectionRequest({electionName, allowEdit})
    }

    const launchEditableClicked = () => {
        const electionName = originalElection.electionName
        const allowEdit = true
        launchElectionRequest({electionName, allowEdit})
    }

    const finalizeTallyClicked = () => {
        finalizeElectionRequest(originalElection.electionName)
    }
    const electionName = blankIfFalsy(electionWithEdits.electionName)
    const noVotingBefore = blankIfFalsy(electionWithEdits.noVotingBefore)
    const noVotingAfter = blankIfFalsy(electionWithEdits.noVotingAfter)
    const candidateCount = originalElection.candidateCount
    const voterCount = originalElection.voterCount
    const candidateCountText = `${candidateCount} ${pluralize({
        quantity: candidateCount,
        singular: 'candidate',
        plural: 'candidates'
    })}`
    const voterCountText = voterCountTextFor(voterCount)
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
                   value={electionName}
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
        </div>
        <a href={createCandidatesPagePath(originalElection.electionName)}>{candidateCountText}</a>
        <a href={createVotersPagePath(originalElection.electionName)}>{voterCountText}</a>
        <a href={createBallotPagePath({voterName:userName, electionName:originalElection.electionName})}>ballot</a>
        <a href={createTallyPagePath(originalElection.electionName)}>tally</a>
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
