import navigationDispatch from '../navigation/navigationDispatch'
import createLoginConnected from '../login/loginConnected'
import createRegisterConnected from '../register/registerConnected'
import createDashboardConnected from '../dashboard/dashboardConnected'
import createNavigationConnected from '../navigation/navigationConnected'
import {composeReducer, composeSaga} from "../library/compose-util";
import createManageUsersConnected from "../manageUsers/manageUsersConnected";
import createTablesConnected from "../tables/tablesConnected";

const loginConnected = createLoginConnected()
const registerConnected = createRegisterConnected()
const dashboardConnected = createDashboardConnected()
const manageUsersConnected = createManageUsersConnected()
const tablesConnected = createTablesConnected()
const navigationConnected = createNavigationConnected({
    Login: loginConnected.Component,
    Register: registerConnected.Component,
    Dashboard: dashboardConnected.Component,
    ManageUsers: manageUsersConnected.Component,
    Tables: tablesConnected.Component
})
const connectedArray = [
    loginConnected,
    registerConnected,
    dashboardConnected,
    navigationConnected,
    manageUsersConnected,
    tablesConnected
]

const initializeEvents = [
    navigationDispatch.fetchPageRequest()
]
const Top = navigationConnected.Component
const reducer = composeReducer(connectedArray)
const saga = composeSaga(connectedArray)

export {Top, reducer, saga, initializeEvents}
