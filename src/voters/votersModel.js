import {lensPathWithDefault} from '../library/lens-util';

const votersModel = {
    userName: lensPathWithDefault(['voters', 'userName'], ''),
    election: lensPathWithDefault(['voters', 'election'], {}),
    filter: lensPathWithDefault(['voters', 'filter'], ''),
    originalVoters: lensPathWithDefault(['voters', 'originalVoters'], []),
    votersWithEdits: lensPathWithDefault(['voters', 'votersWithEdits'], []),
    errors: lensPathWithDefault(['voters', 'errors'], [])
}

export default votersModel
