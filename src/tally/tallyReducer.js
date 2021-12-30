import tallyEvent from './tallyEvent';
import tallyModel from "./tallyModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTallySuccess = (state, event) => R.set(tallyModel.tally, event.tally, state)
const errorAdded = (state, event) => appendToArray(tallyModel.errors, event.message, state)

const tallyReducer = {
    [tallyEvent.FETCH_TALLY_SUCCESS]: fetchTallySuccess,
    [tallyEvent.ERROR_ADDED]: errorAdded
}

export default tallyReducer
