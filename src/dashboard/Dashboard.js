import './Dashboard.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {pluralize} from "../library/text-util";
import {manageUsersPagePath} from "../manageUsers/manageUsersConstant";
import {electionsPagePath} from "../elections/electionsConstant";
import {tablesPagePath} from "../tables/tablesConstant";
import {eventsPagePath} from "../events/eventsConstant";

const Dashboard = ({userCount, electionCount, tableCount, eventCount, errors, setUri, logoutRequest}) => {
    const onClickManageUsers = event => {
        event.preventDefault()
        setUri(manageUsersPagePath)
    }
    const onClickElections = event => {
        event.preventDefault()
        setUri(electionsPagePath)
    }
    const onClickTables = event => {
        event.preventDefault()
        setUri(tablesPagePath)
    }
    const onClickEvents = event => {
        event.preventDefault()
        setUri(eventsPagePath)
    }
    const userCountText = `${userCount} ${pluralize({quantity: userCount, singular: 'user', plural: 'users'})}`
    const electionCountText = `${electionCount} ${pluralize({
        quantity: electionCount,
        singular: 'election',
        plural: 'elections'
    })}`
    const tableCountText = `${tableCount} ${pluralize({quantity: tableCount, singular: 'table', plural: 'tables'})}`
    const eventCountText = `${eventCount} ${pluralize({quantity: eventCount, singular: 'event', plural: 'events'})}`
    return <div className={'Dashboard'}>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <a onClick={onClickManageUsers}>{userCountText}</a>
        <a onClick={onClickElections}>{electionCountText}</a>
        <a onClick={onClickTables}>{tableCountText}</a>
        <a onClick={onClickEvents}>{eventCountText}</a>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
