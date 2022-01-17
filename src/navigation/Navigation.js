import ErrorComponent from '../error/ErrorComponent';
import React from "react";
import * as R from 'ramda'

const PageNotFound = ({page}) => <h1>{`Page '${page}' not found`}</h1>

const LoggedInAs = ({loginInformation}) => {
    if (loginInformation === null) return null
    const {
        userName,
        role,
        permissions
    } = loginInformation
    const createPermissionElement = permission => <li className={'subtle-text'} key={permission}>{permission}</li>
    const permissionElements = R.map(createPermissionElement, permissions)
    return <div className={'columns-1-outer'}>
        <hr/>
        <p className={'subtle-text'}>Logged in as user {userName} with role {role}</p>
        <ul>{permissionElements}</ul>
    </div>
}

const Navigation = (
    {
        pageName,
        loginInformation,
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
        <LoggedInAs loginInformation={loginInformation}/>
    </div>
}

export default Navigation;
