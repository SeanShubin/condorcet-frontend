import './Dashboard.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {pluralize} from "../library/text-util";
import {manageUsersPagePath} from "../manageUsers/manageUsersConstant";
import {electionsPagePath} from "../elections/electionsConstant";
import {tablesPagePath} from "../tables/tablesConstant";
import {eventsPagePath} from "../events/eventsConstant";
import {debugTablesPagePath} from "../debugTables/debugTablesConstant";

const Dashboard = (
    {
        userCount,
        electionCount,
        tableCount,
        eventCount,
        errors,
        logoutRequest
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
    return <div className={'Dashboard'}>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <a href={manageUsersPagePath}>{userCountText}</a>
        <a href={electionsPagePath}>{electionCountText}</a>
        <a href={tablesPagePath}>{tableCountText}</a>
        <a href={debugTablesPagePath}>{debugTableCountText}</a>
        <a href={eventsPagePath}>{eventCountText}</a>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
