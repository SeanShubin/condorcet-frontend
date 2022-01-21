import dashboardEvent from './dashboardEvent';
import dashboardModel from "./dashboardModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchCountsSuccess = (state, event) => R.pipe(
    R.set(dashboardModel.canManageUsers, event.canManageUsers),
    R.set(dashboardModel.canViewSecrets, event.canViewSecrets),
    R.set(dashboardModel.userCount, event.userCount),
    R.set(dashboardModel.electionCount, event.electionCount),
    R.set(dashboardModel.tableCount, event.tableCount),
    R.set(dashboardModel.eventCount, event.eventCount),
)(state)

const clearErrors = (state, event) => R.set(dashboardModel.errors, [], state)
const errorAdded = (state, event) => appendToArray(dashboardModel.errors, event.message, state)

const dashboardReducer = {
    [dashboardEvent.FETCH_COUNTS_SUCCESS]: fetchCountsSuccess,
    [dashboardEvent.ERROR_ADDED]: errorAdded,
    [dashboardEvent.CLEAR_ERRORS]: clearErrors
}

export default dashboardReducer
