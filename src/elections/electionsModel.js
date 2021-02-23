import {lensPathWithDefault} from '../library/lens-util';

const electionsModel = {
    elections: lensPathWithDefault(['elections', 'elections'], []),
    electionName: lensPathWithDefault(['elections', 'electionName'], ''),
    errors: lensPathWithDefault(['elections', 'errors'], [])
}

export default electionsModel
