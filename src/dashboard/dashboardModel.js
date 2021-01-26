import {lensPathWithDefault} from '../library/lens-util';

const dashboardModel = {
    name: lensPathWithDefault(['dashboard', 'name'], ''),
    errors: lensPathWithDefault(['dashboard', 'errors'], [])
}

export default dashboardModel
