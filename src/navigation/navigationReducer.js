import navigationEvent from './navigationEvent';
import navigationModel from "./navigationModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const fetchPageSuccess = (state, event) => R.pipe(
    R.set(navigationModel.pageName, event.pageName),
    R.set(navigationModel.loginInformation, event.loginInformation))(state)
const errorAdded = (state, event) => appendToArray(navigationModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(navigationModel.errors, [], state)

const navigationReducer = {
    [navigationEvent.FETCH_PAGE_SUCCESS]: fetchPageSuccess,
    [navigationEvent.ERROR_ADDED]: errorAdded,
    [navigationEvent.CLEAR_ERRORS]: clearErrors
}

export default navigationReducer
