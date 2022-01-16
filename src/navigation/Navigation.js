import ErrorComponent from '../error/ErrorComponent';
import React from "react";
import * as R from 'ramda'

const PageNotFound = ({page}) => <h1>{`Page '${page}' not found`}</h1>

const LoggedInAs = ({userName, role, permissions}) => {
    if (userName === null) return null
    else {
        const createPermissionElement = permission => <li className={'subtle-text'} key={permission}>{permission}</li>
        const permissionElements= R.map(createPermissionElement, permissions)
        return <>
            <hr/>
            <p className={'subtle-text'}>Logged in as user {userName} with role {role}</p>
            <ul>{permissionElements}</ul>
        </>
    }
}

const Navigation = (
    {
        pageName,
        userName,
        role,
        permissions,
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
        Style,
        Candidates,
        Ballot,
        Tally,
        Voters
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
        style: Style,
        candidates: Candidates,
        ballot: Ballot,
        tally: Tally,
        voters: Voters
    }
    const Component = pageMap[pageName] || PageNotFound
    return <div className={'Navigation'}>
        <ErrorComponent errors={errors}/>
        <Component/>
        <div className={'columns-1-outer'}>
            <LoggedInAs userName={userName} role={role} permissions={permissions}/>
        </div>
    </div>
}

export default Navigation;
