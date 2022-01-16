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
        loginConnected,
        registerConnected,
        dashboardConnected,
        manageUsersConnected,
        tablesConnected,
        debugTablesConnected,
        eventsConnected,
        electionsConnected,
        electionConnected,
        styleConnected,
        candidatesConnected,
        ballotConnected,
        tallyConnected,
        votersConnected
    }) => {
    const pageMap = {
        login: loginConnected.Component,
        register: registerConnected.Component,
        dashboard: dashboardConnected.Component,
        manageUsers: manageUsersConnected.Component,
        tables: tablesConnected.Component,
        events: eventsConnected.Component,
        elections: electionsConnected.Component,
        election: electionConnected.Component,
        debugTables: debugTablesConnected.Component,
        style: styleConnected.Component,
        candidates: candidatesConnected.Component,
        ballot: ballotConnected.Component,
        tally: tallyConnected.Component,
        voters: votersConnected.Component
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
