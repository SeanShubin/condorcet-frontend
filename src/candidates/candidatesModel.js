import {lensPathWithDefault} from '../library/lens-util';

const candidatesModel = {
    electionName: lensPathWithDefault(['candidates', 'electionName'], ''),
    originalCandidates: lensPathWithDefault(['candidates', 'originalCandidates'], []),
    candidatesWithEdits: lensPathWithDefault(['candidates', 'candidatesWithEdits'], []),
    errors: lensPathWithDefault(['candidates', 'errors'], [])
}

export default candidatesModel
