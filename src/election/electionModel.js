import {lensPathWithDefault} from '../library/lens-util';

const electionModel = {
    canUpdate: lensPathWithDefault(['election', 'canUpdate'], false),
    originalElection: lensPathWithDefault(['election', 'originalElection'], {}),
    electionWithEdits: lensPathWithDefault(['election', 'electionWithEdits'], {}),
    errors: lensPathWithDefault(['election', 'errors'], [])
}

export default electionModel
