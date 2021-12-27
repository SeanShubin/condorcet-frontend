import {lensPathWithDefault} from '../library/lens-util';

const candidatesModel = {
    electionName: lensPathWithDefault(['candidates', 'electionName'], ''),
    candidates: lensPathWithDefault(['candidates', 'candidates'], []),
    errors: lensPathWithDefault(['candidates', 'errors'], [])
}

export default candidatesModel
