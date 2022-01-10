import {lensPathWithDefault} from '../library/lens-util';

const electionModel = {
    user: lensPathWithDefault(['election', 'user'], ''),
    originalElection: lensPathWithDefault(['election', 'originalElection'], {}),
    electionWithEdits: lensPathWithDefault(['election', 'electionWithEdits'], {}),
    errors: lensPathWithDefault(['election', 'errors'], [])
}

export default electionModel
