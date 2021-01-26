import navigationEvent from './navigationEvent';
import navigationModel from "./navigationModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const fetchPage = (state, event) => R.set(navigationModel.page, event.page, state)
const errorAdded = (state, event) => appendToArray(navigationModel.errors, event.message, state)

const navigationReducer = {
    [navigationEvent.FETCH_PAGE_SUCCESS]: fetchPage,
    [navigationEvent.ERROR_ADDED]: errorAdded
}

export default navigationReducer
