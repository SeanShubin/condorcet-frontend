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
        <LoggedInAs loginInformation={loginInformation}/>
    </div>
}

export default Navigation;
