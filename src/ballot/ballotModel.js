import {lensPathWithDefault} from '../library/lens-util';

const ballotModel = {
    ballot: lensPathWithDefault(['ballot', 'ballot'],  null),
    voterName: lensPathWithDefault(['ballot', 'voterName']),
    electionName: lensPathWithDefault(['ballot', 'electionName']),
    originalRankings: lensPathWithDefault(['ballot', 'originalRankings'], []),
    editedRankings: lensPathWithDefault(['ballot', 'editedRankings'], []),
    moveFromRank: lensPathWithDefault(['ballot', 'moveFromRank'], null),
    errors: lensPathWithDefault(['ballot', 'errors'], [])
}

export default ballotModel
