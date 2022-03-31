import changePasswordEvent from './changePasswordEvent';
import changePasswordModel from "./changePasswordModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const passwordChanged = (state, event) => R.set(changePasswordModel.password, event.password, state)
const confirmationPasswordChanged = (state, event) => R.set(changePasswordModel.confirmationPassword, event.confirmationPassword, state)
const passwordDoesNotMatchConfirmationPassword = (state, event) =>
    appendToArray(changePasswordModel.errors, 'password does not match confirmation password', state)
const errorAdded = (state, event) => appendToArray(changePasswordModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(changePasswordModel.errors, [], state)

const changePasswordReducer = {
    [changePasswordEvent.PASSWORD_CHANGED]: passwordChanged,
    [changePasswordEvent.CONFIRMATION_PASSWORD_CHANGED]: confirmationPasswordChanged,
    [changePasswordEvent.PASSWORD_DOES_NOT_MATCH_CONFIRMATION_PASSWORD]: passwordDoesNotMatchConfirmationPassword,
    [changePasswordEvent.ERROR_ADDED]: errorAdded,
    [changePasswordEvent.CLEAR_ERRORS]: errorsCleared
}

export default changePasswordReducer
