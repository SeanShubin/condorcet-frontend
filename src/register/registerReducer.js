import registerEvent from './registerEvent';
import registerModel from "./registerModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const nameChanged = (state, event) => R.set(registerModel.name, event.name, state)
const emailChanged = (state, event) => R.set(registerModel.email, event.email, state)
const passwordChanged = (state, event) => R.set(registerModel.password, event.password, state)
const confirmationPasswordChanged = (state, event) => R.set(registerModel.confirmationPassword, event.confirmationPassword, state)
const passwordDoesNotMatchConfirmationPassword = (state, event) =>
    appendToArray(registerModel.errors, 'password does not match confirmation password', state)
const errorAdded = (state, event) => appendToArray(registerModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(registerModel.errors, [], state)

const registerReducer = {
    [registerEvent.NAME_CHANGED]: nameChanged,
    [registerEvent.EMAIL_CHANGED]: emailChanged,
    [registerEvent.PASSWORD_CHANGED]: passwordChanged,
    [registerEvent.CONFIRMATION_PASSWORD_CHANGED]: confirmationPasswordChanged,
    [registerEvent.PASSWORD_DOES_NOT_MATCH_CONFIRMATION_PASSWORD]: passwordDoesNotMatchConfirmationPassword,
    [registerEvent.ERROR_ADDED]: errorAdded,
    [registerEvent.CLEAR_ERRORS]: errorsCleared
}

export default registerReducer
