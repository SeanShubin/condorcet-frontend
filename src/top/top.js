import navigationDispatch from '../navigation/navigationDispatch'
import createLoginConnected from '../login/loginConnected'
import createRegisterConnected from '../register/registerConnected'
import createDashboardConnected from '../dashboard/dashboardConnected'
import createNavigationConnected from '../navigation/navigationConnected'
import {composeReducer, composeSagaFromArray} from "../library/compose-util";
import createUsersConnected from "../users/usersConnected";
import createTablesConnected from "../tables/tablesConnected";
import createEventsConnected from "../events/eventsConnected";
import createElectionsConnected from "../elections/electionsConnected";
import createDebugTablesConnected from "../debugTables/debugTablesConnected";
import createElectionConnected from "../election/electionConnected";
import createStyleConnected from "../style/styleConnected";
import createCandidatesConnected from "../candidates/candidatesConnected";
import createBallotConnected from "../ballot/ballotConnected";
import createTallyConnected from "../tally/tallyConnected";
import createVotersConnected from "../voters/votersConnected";
import createChangePasswordConnected from "../changePassword/changePasswordConnected";
import createResetPasswordConnected from "../resetPassword/resetPasswordConnected";

const loginConnected = createLoginConnected({})
const registerConnected = createRegisterConnected({})
const dashboardConnected = createDashboardConnected({})
const usersConnected = createUsersConnected({})
const electionsConnected = createElectionsConnected({})
const electionConnected = createElectionConnected({})
const candidatesConnected = createCandidatesConnected({})
const votersConnected = createVotersConnected({})
const ballotConnected = createBallotConnected({})
const tallyConnected = createTallyConnected({})
const tablesConnected = createTablesConnected({})
const debugTablesConnected = createDebugTablesConnected({})
const eventsConnected = createEventsConnected({})
const styleConnected = createStyleConnected({})
const changePasswordConnected = createChangePasswordConnected({})
const resetPasswordConnected = createResetPasswordConnected({})

const navigationConnected = createNavigationConnected({
    extraState: {
        Login: loginConnected.Component,
        Register: registerConnected.Component,
        Dashboard: dashboardConnected.Component,
        Users: usersConnected.Component,
        Elections: electionsConnected.Component,
        Election: electionConnected.Component,
        Candidates: candidatesConnected.Component,
        Voters: votersConnected.Component,
        Ballot: ballotConnected.Component,
        Tally: tallyConnected.Component,
        Tables: tablesConnected.Component,
        DebugTables: debugTablesConnected.Component,
        Events: eventsConnected.Component,
        Style: styleConnected.Component,
        ChangePassword: changePasswordConnected.Component,
        ResetPassword: resetPasswordConnected.Component
    }
})
const connectedArray = [
    navigationConnected,
    loginConnected,
    registerConnected,
    dashboardConnected,
    usersConnected,
    electionsConnected,
    electionConnected,
    candidatesConnected,
    votersConnected,
    ballotConnected,
    tallyConnected,
    tablesConnected,
    debugTablesConnected,
    eventsConnected,
    styleConnected,
    changePasswordConnected,
    resetPasswordConnected
]

const initializeEvents = [
    navigationDispatch.fetchPageRequest()
]
const historyEvent = ({location, action}) => {
    return navigationDispatch.history({location, action})
}
const Top = navigationConnected.Component
const reducer = composeReducer(connectedArray)
const saga = composeSagaFromArray(connectedArray)

export {Top, reducer, saga, initializeEvents, historyEvent}
