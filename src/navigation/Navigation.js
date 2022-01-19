import ErrorComponent from '../error/ErrorComponent';
import React from "react";
import * as R from 'ramda'
import {Link} from "../library/uri-util";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {loginPagePath} from "../login/loginConstant";

const PageNotFound = ({pageName, setUri}) => <div className={'columns-1-outer'}>
    <h1>{`Page '${pageName}' not found`}</h1>
    <Link setUri={setUri} href={dashboardPagePath}>dashboard</Link>
    <Link setUri={setUri} href={loginPagePath}>login</Link>
</div>

const LoggedInAs = ({loginInformation}) => {
    if (loginInformation === null) return null
    const {
        userName,
        role,
        permissions
    } = loginInformation
    const createPermissionElement = permission => <li key={permission}>{permission}</li>
    const permissionElements = R.map(createPermissionElement, permissions)
    return <div className={'columns-1-outer subtle-text'}>
        <hr/>
        <p>Logged in as user {userName} with role {role}</p>
        <fieldset>
            <legend>permissions</legend>
            <ul>{permissionElements}</ul>
        </fieldset>
    </div>
}

const Navigation = args => {
    const {
        pageName,
        loginInformation,
        errors,
        Login,
        Register,
        Dashboard,
        Users,
        Tables,
        Events,
        Elections,
        Election,
        DebugTables,
        Style,
        Candidates,
        Ballot,
        Tally,
        Voters,
        setUri
    } = args
    const pageMap = {
        login: Login,
        register: Register,
        dashboard: Dashboard,
        users: Users,
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
    const AppliedPageNotFound = () => <PageNotFound setUri={setUri} pageName={pageName}/>
    const Component = pageMap[pageName] || AppliedPageNotFound
    return <div className={'Navigation'}>
        <ErrorComponent errors={errors}/>
        <Component/>
        <LoggedInAs loginInformation={loginInformation}/>
    </div>
}

export default Navigation;
