import {lensPathWithDefault} from '../library/lens-util';

const electionModel = {
    election: lensPathWithDefault(['election', 'election'], {}),
    errors: lensPathWithDefault(['election', 'errors'], [])
}

export default electionModel
