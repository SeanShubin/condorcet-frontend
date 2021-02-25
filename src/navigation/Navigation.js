import ErrorComponent from '../error/ErrorComponent';

const PageNotFound = ({page}) => <h1>{`Page '${page}' not found`}</h1>

const Navigation = ({
                        page,
                        errors,
                        Login,
                        Register,
                        Dashboard,
                        ManageUsers,
                        Tables,
                        Events,
                        Elections,
                        Election,
                        DebugTables
                    }) => {
    const pageMap = {
        login: Login,
        register: Register,
        dashboard: Dashboard,
        manageUsers: ManageUsers,
        tables: Tables,
        events: Events,
        elections: Elections,
        election: Election,
        debugTables: DebugTables
    }
    const Component = pageMap[page] || PageNotFound
    return <div className={'Navigation'}>
        <ErrorComponent errors={errors}/>
        <Component/>
    </div>
}

export default Navigation;
