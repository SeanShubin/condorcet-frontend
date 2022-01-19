import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {pluralize} from "../library/text-util";
import {usersPagePath} from "../users/usersConstant";
import {electionsPagePath} from "../elections/electionsConstant";
import {tablesPagePath} from "../tables/tablesConstant";
import {debugTablesPagePath} from "../debugTables/debugTablesConstant";
import {eventsPagePath} from "../events/eventsConstant";
import {Link} from "../library/uri-util";

const Dashboard = (
    {
        userCount,
        electionCount,
        tableCount,
        eventCount,
        errors,
        logoutRequest,
        globalSetUri
    }) => {
    const userCountText = `${userCount} ${pluralize({quantity: userCount, singular: 'user', plural: 'users'})}`
    const electionCountText = `${electionCount} ${pluralize({
        quantity: electionCount,
        singular: 'election',
        plural: 'elections'
    })}`
    const tableCountText = `${tableCount} ${pluralize({quantity: tableCount, singular: 'table', plural: 'tables'})}`
    const debugTableCountText = `${tableCount} ${pluralize({
        quantity: tableCount,
        singular: 'debug table',
        plural: 'debug tables'
    })}`
    const eventCountText = `${eventCount} ${pluralize({quantity: eventCount, singular: 'event', plural: 'events'})}`
    return <div className={'Dashboard columns-1-outer' }>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <Link href={usersPagePath} setUri={globalSetUri}>{userCountText}</Link>
        <Link href={electionsPagePath} setUri={globalSetUri}>{electionCountText}</Link>
        <Link href={tablesPagePath} setUri={globalSetUri}>{tableCountText}</Link>
        <Link href={debugTablesPagePath} setUri={globalSetUri}>{debugTableCountText}</Link>
        <Link href={eventsPagePath} setUri={globalSetUri}>{eventCountText}</Link>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
