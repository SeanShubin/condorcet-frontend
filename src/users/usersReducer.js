import usersEvent from './usersEvent';
import usersModel from "./usersModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const usersChanged = (state, event) => R.set(usersModel.users, event.users, state)
const errorAdded = (state, event) => appendToArray(usersModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(usersModel.errors, [], state)

const usersReducer = {
    [usersEvent.USERS_CHANGED]: usersChanged,
    [usersEvent.ERROR_ADDED]: errorAdded,
    [usersEvent.CLEAR_ERRORS]: clearErrors
}

export default usersReducer
