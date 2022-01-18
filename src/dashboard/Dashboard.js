import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {pluralize} from "../library/text-util";
import {manageUsersPagePath} from "../manageUsers/manageUsersConstant";
import {electionsPagePath} from "../elections/electionsConstant";
import {tablesPagePath} from "../tables/tablesConstant";
import {debugTablesPagePath} from "../debugTables/debugTablesConstant";
import {eventsPagePath} from "../events/eventsConstant";

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
    const onClickAnchor = event => {
        event.preventDefault()
        const target = event.target
        const origin = target.origin
        const href = target.href
        const uri = href.substring(origin.length)
        globalSetUri(uri)
    }
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
        <a href={manageUsersPagePath} onClick={onClickAnchor}>{userCountText}</a>
        <a href={electionsPagePath} onClick={onClickAnchor}>{electionCountText}</a>
        <a href={tablesPagePath} onClick={onClickAnchor}>{tableCountText}</a>
        <a href={debugTablesPagePath} onClick={onClickAnchor}>{debugTableCountText}</a>
        <a href={eventsPagePath} onClick={onClickAnchor}>{eventCountText}</a>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
