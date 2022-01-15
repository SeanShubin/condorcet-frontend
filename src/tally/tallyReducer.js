import tallyEvent from './tallyEvent';
import tallyModel from "./tallyModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTallySuccess = (state, event) => R.pipe(
    R.set(tallyModel.secretBallot, event.secretBallot),
    R.set(tallyModel.tally, event.tally),
    R.set(tallyModel.electionName, event.electionName))(state)
const errorAdded = (state, event) => appendToArray(tallyModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(tallyModel.errors, [], state)

const tallyReducer = {
    [tallyEvent.FETCH_TALLY_SUCCESS]: fetchTallySuccess,
    [tallyEvent.ERROR_ADDED]: errorAdded,
    [tallyEvent.CLEAR_ERRORS]:clearErrors
}

export default tallyReducer
