import {lensPathWithDefault} from '../library/lens-util';

const dashboardModel = {
    errors: lensPathWithDefault(['dashboard', 'errors'], [])
}

export default dashboardModel
