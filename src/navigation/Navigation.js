import ErrorComponent from '../error/ErrorComponent';
import React from "react";

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
                        DebugTables,
                        Style
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
        debugTables: DebugTables,
        style: Style
    }
    const Component = pageMap[page] || PageNotFound
    return <div className={'Navigation'}>
        <ErrorComponent errors={errors}/>
        <Component/>
    </div>
}

export default Navigation;
