import navigationDispatch from '../navigation/navigationDispatch'
import createLoginConnected from '../login/loginConnected'
import createRegisterConnected from '../register/registerConnected'
import createDashboardConnected from '../dashboard/dashboardConnected'
import createNavigationConnected from '../navigation/navigationConnected'
import {composeReducer, composeSagaFromArray} from "../library/compose-util";
import createManageUsersConnected from "../manageUsers/manageUsersConnected";
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

const loginConnected = createLoginConnected({})
const registerConnected = createRegisterConnected({})
const dashboardConnected = createDashboardConnected({})
const manageUsersConnected = createManageUsersConnected({})
const tablesConnected = createTablesConnected({})
const debugTablesConnected = createDebugTablesConnected({})
const eventsConnected = createEventsConnected({})
const electionsConnected = createElectionsConnected({})
const electionConnected = createElectionConnected({})
const styleConnected = createStyleConnected({})
const candidatesConnected = createCandidatesConnected({})
const ballotConnected = createBallotConnected({})
const tallyConnected = createTallyConnected({})
const votersConnected = createVotersConnected({})
const navigableComponents ={
    loginConnected,
    registerConnected,
    dashboardConnected,
    manageUsersConnected,
    tablesConnected,
    debugTablesConnected,
    eventsConnected,
    electionsConnected,
    electionConnected,
    styleConnected,
    candidatesConnected,
    ballotConnected,
    tallyConnected,
    votersConnected
}
const navigationConnected = createNavigationConnected({
    extraState: navigableComponents
})
const connectedArray = [
    loginConnected,
    registerConnected,
    dashboardConnected,
    navigationConnected,
    manageUsersConnected,
    tablesConnected,
    debugTablesConnected,
    eventsConnected,
    electionsConnected,
    electionConnected,
    styleConnected,
    candidatesConnected,
    ballotConnected,
    tallyConnected,
    votersConnected
]

const initializeEvents = [
    navigationDispatch.fetchPageRequest(navigableComponents)
]
const historyEvent = ({location, action}) => {
    return navigationDispatch.history({location, action})
}
const Top = navigationConnected.Component
const reducer = composeReducer(connectedArray)
const saga = composeSagaFromArray(connectedArray)

export {Top, reducer, saga, initializeEvents, historyEvent}
