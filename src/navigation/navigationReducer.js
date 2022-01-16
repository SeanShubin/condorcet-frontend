import navigationEvent from './navigationEvent';
import navigationModel from "./navigationModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const fetchPageSuccess = (state, event) => R.pipe(
    R.set(navigationModel.pageName, event.pageName),
    R.set(navigationModel.userName, event.userName),
    R.set(navigationModel.role, event.role),
    R.set(navigationModel.permissions, event.permissions))(state)
const errorAdded = (state, event) => appendToArray(navigationModel.errors, event.message, state)

const navigationReducer = {
    [navigationEvent.FETCH_PAGE_SUCCESS]: fetchPageSuccess,
    [navigationEvent.ERROR_ADDED]: errorAdded
}

export default navigationReducer
