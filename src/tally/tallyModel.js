import {lensPathWithDefault} from '../library/lens-util';

const tallyModel = {
    tally: lensPathWithDefault(['tally', 'tally'], {}),
    errors: lensPathWithDefault(['tally', 'errors'], [])
}

export default tallyModel
