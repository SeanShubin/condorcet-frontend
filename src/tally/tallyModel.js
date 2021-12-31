import {lensPathWithDefault} from '../library/lens-util';

const tallyModel = {
    election: lensPathWithDefault(['tally', 'election'], ''),
    tally: lensPathWithDefault(['tally', 'tally']),
    errors: lensPathWithDefault(['tally', 'errors'], [])
}

export default tallyModel
