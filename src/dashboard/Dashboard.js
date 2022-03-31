import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {pluralize} from "../library/text-util";
import {usersPagePath} from "../users/usersConstant";
import {electionsPagePath} from "../elections/electionsConstant";
import {tablesPagePath} from "../tables/tablesConstant";
import {debugTablesPagePath} from "../debugTables/debugTablesConstant";
import {eventsPagePath} from "../events/eventsConstant";
import {changePasswordPagePath} from "../changePassword/changePasswordConstant";
import {Link} from "../library/uri-util";

const ManageUsersLink = ({setUri, canManageUsers, userCount}) => {
    if (canManageUsers) {
        const userCountText = `${userCount} ${pluralize({quantity: userCount, singular: 'user', plural: 'users'})}`
        return <Link href={usersPagePath} setUri={setUri}>{userCountText}</Link>
    } else {
        return null
    }
}

const DebugLinks = ({canViewSecrets, setUri, tableCount, eventCount}) => {
    const tableCountText = `${tableCount} ${pluralize({quantity: tableCount, singular: 'table', plural: 'tables'})}`
    const debugTableCountText = `${tableCount} ${pluralize({
        quantity: tableCount,
        singular: 'debug table',
        plural: 'debug tables'
    })}`
    const eventCountText = `${eventCount} ${pluralize({quantity: eventCount, singular: 'event', plural: 'events'})}`
    if (canViewSecrets) {
        return <>
            <Link href={tablesPagePath} setUri={setUri}>{tableCountText}</Link>
            <Link href={debugTablesPagePath} setUri={setUri}>{debugTableCountText}</Link>
            <Link href={eventsPagePath} setUri={setUri}>{eventCountText}</Link>
        </>
    } else {
        return null
    }
}

const Dashboard = args => {
    const {
        canViewSecrets,
        canManageUsers,
        userCount,
        electionCount,
        tableCount,
        eventCount,
        errors,
        logoutRequest,
        globalSetUri
    } = args
    const electionCountText = `${electionCount} ${pluralize({
        quantity: electionCount,
        singular: 'election',
        plural: 'elections'
    })}`

    return <div className={'Dashboard columns-1-outer'}>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <ManageUsersLink canManageUsers={canManageUsers} setUri={globalSetUri} userCount={userCount}/>
        <Link href={electionsPagePath} setUri={globalSetUri}>{electionCountText}</Link>
        <DebugLinks canViewSecrets={canViewSecrets} setUri={globalSetUri} tableCount={tableCount} eventCount={eventCount}/>
        <Link href={changePasswordPagePath} setUri={globalSetUri}>change password</Link>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
