import {lensPathWithDefault} from '../library/lens-util';

const tallyModel = {
    electionName: lensPathWithDefault(['tally', 'electionName'], ''),
    tally: lensPathWithDefault(['tally', 'tally']),
    errors: lensPathWithDefault(['tally', 'errors'], [])
}

export default tallyModel
