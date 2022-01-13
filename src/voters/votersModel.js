import {lensPathWithDefault} from '../library/lens-util';

const votersModel = {
    electionName: lensPathWithDefault(['voters', 'electionName'], ''),
    originalVoters: lensPathWithDefault(['voters', 'originalVoters'], []),
    votersWithEdits: lensPathWithDefault(['voters', 'votersWithEdits'], []),
    errors: lensPathWithDefault(['voters', 'errors'], [])
}

export default votersModel
