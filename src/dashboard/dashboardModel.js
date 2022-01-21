import {lensPathWithDefault} from '../library/lens-util';

const dashboardModel = {
    canViewSecrets: lensPathWithDefault(['dashboard', 'canViewSecrets'], false),
    canManageUsers: lensPathWithDefault(['dashboard', 'canManageUsers'], false),
    userCount: lensPathWithDefault(['dashboard', 'userCount'], 0),
    electionCount: lensPathWithDefault(['dashboard', 'electionCount'], 0),
    tableCount: lensPathWithDefault(['dashboard', 'tableCount'], 0),
    eventCount: lensPathWithDefault(['dashboard', 'eventCount'], 0),
    errors: lensPathWithDefault(['dashboard', 'errors'], [])
}

export default dashboardModel
