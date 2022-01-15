import {lensPathWithDefault} from '../library/lens-util';

const ballotModel = {
    ballot: lensPathWithDefault('ballot', 'ballot', {}),
    voterName: lensPathWithDefault(['ballot', 'voterName']),
    electionName: lensPathWithDefault(['ballot', 'electionName']),
    originalRankings: lensPathWithDefault(['ballot', 'originalRankings'], []),
    editedRankings: lensPathWithDefault(['ballot', 'editedRankings'], []),
    errors: lensPathWithDefault(['ballot', 'errors'], [])
}

export default ballotModel
