import navigationDispatch from '../navigation/navigationDispatch'
import createLoginConnected from '../login/loginConnected'
import createRegisterConnected from '../register/registerConnected'
import createDashboardConnected from '../dashboard/dashboardConnected'
import createNavigationConnected from '../navigation/navigationConnected'
import {composeReducer, composeSaga} from "../library/compose-util";
import createManageUsersConnected from "../manageUsers/manageUsersConnected";
import createTablesConnected from "../tables/tablesConnected";
import createEventsConnected from "../events/eventsConnected";
import createElectionsConnected from "../elections/electionsConnected";
import createDebugTablesConnected from "../debugTables/debugTablesConnected";

const loginConnected = createLoginConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const registerConnected = createRegisterConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const dashboardConnected = createDashboardConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const manageUsersConnected = createManageUsersConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const tablesConnected = createTablesConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const debugTablesConnected = createDebugTablesConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const eventsConnected = createEventsConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const electionsConnected = createElectionsConnected({
    extraDispatch: {
        setUri: navigationDispatch.setUri
    }
})
const navigationConnected = createNavigationConnected({
    extraState: {
        Login: loginConnected.Component,
        Register: registerConnected.Component,
        Dashboard: dashboardConnected.Component,
        ManageUsers: manageUsersConnected.Component,
        Tables: tablesConnected.Component,
        DebugTables: debugTablesConnected.Component,
        Events: eventsConnected.Component,
        Elections: electionsConnected.Component
    }
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
    electionsConnected
]

const initializeEvents = [
    navigationDispatch.fetchPageRequest()
]
const historyEvent = ({location, action}) => {
    return navigationDispatch.history({location, action})
}
const Top = navigationConnected.Component
const reducer = composeReducer(connectedArray)
const saga = composeSaga(connectedArray)

export {Top, reducer, saga, initializeEvents, historyEvent}
