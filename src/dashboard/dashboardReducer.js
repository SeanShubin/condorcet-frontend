import dashboardEvent from './dashboardEvent';
import dashboardModel from "./dashboardModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchCountsSuccess = (state, event) => R.pipe(
    R.set(dashboardModel.userCount, event.counts.userCount),
    R.set(dashboardModel.electionCount, event.counts.electionCount),
    R.set(dashboardModel.tableCount, event.counts.tableCount),
    R.set(dashboardModel.eventCount, event.counts.eventCount),
)(state)

const errorAdded = (state, event) => appendToArray(dashboardModel.errors, event.message, state)

const dashboardReducer = {
    [dashboardEvent.FETCH_COUNTS_SUCCESS]: fetchCountsSuccess,
    [dashboardEvent.ERROR_ADDED]: errorAdded
}

export default dashboardReducer
