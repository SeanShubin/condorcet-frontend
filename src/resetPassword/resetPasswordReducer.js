import resetPasswordEvent from './resetPasswordEvent';
import resetPasswordModel from "./resetPasswordModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const setMessage = (state, event) => R.set(resetPasswordModel.message, event.message, state)
const emailChanged = (state, event) => R.set(resetPasswordModel.email, event.email, state)
const errorAdded = (state, event) => appendToArray(resetPasswordModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(resetPasswordModel.errors, [], state)

const resetPasswordReducer = {
    [resetPasswordEvent.SET_MESSAGE]: setMessage,
    [resetPasswordEvent.EMAIL_CHANGED]: emailChanged,
    [resetPasswordEvent.ERROR_ADDED]: errorAdded,
    [resetPasswordEvent.CLEAR_ERRORS]: errorsCleared
}

export default resetPasswordReducer
