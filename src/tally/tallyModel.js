import {lensPathWithDefault} from '../library/lens-util';

const tallyModel = {
    secretBallot: lensPathWithDefault(['tally', 'secretBallot'], true),
    election: lensPathWithDefault(['tally', 'election'], ''),
    tally: lensPathWithDefault(['tally', 'tally']),
    errors: lensPathWithDefault(['tally', 'errors'], [])
}

export default tallyModel
