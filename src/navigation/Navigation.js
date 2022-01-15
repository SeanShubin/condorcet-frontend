import ErrorComponent from '../error/ErrorComponent';
import React from "react";

const PageNotFound = ({page}) => <h1>{`Page '${page}' not found`}</h1>

const LoggedInAs = ({userName, role}) => {
    if (userName === null) return null
    else return <p className={'subtle-text'}>Logged in as user {userName} and role {role}</p>
}

const Navigation = (
    {
        pageName,
        userName,
        role,
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
    console.log({
        pageName,
        userName,
        role,
        errors
    })
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
        <LoggedInAs userName={userName} role={role}/>
    </div>
}

export default Navigation;
