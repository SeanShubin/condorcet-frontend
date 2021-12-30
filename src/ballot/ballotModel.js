import {lensPathWithDefault} from '../library/lens-util';

const ballotModel = {
    voter: lensPathWithDefault(['ballot', 'voter']),
    election: lensPathWithDefault(['ballot', 'election']),
    originalRankings: lensPathWithDefault(['ballot', 'originalRankings'], []),
    editedRankings: lensPathWithDefault(['ballot', 'editedRankings'], []),
    errors: lensPathWithDefault(['ballot', 'errors'], [])
}

export default ballotModel
