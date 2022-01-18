import ErrorComponent from "../error/ErrorComponent";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const TableHeader = ({header}) => <th>{header}</th>

const TableRow = ({row}) => <tr>{row.map((cell, index) => <td key={index}>{`${cell}`}</td>)}</tr>

const TableContent = ({headers, rows}) => {
    return <table>
        <thead>
        <tr>{headers.map((header, index) => <TableHeader key={index} header={header}/>)}</tr>
        </thead>
        <tbody>
        {rows.map((row, index) => <TableRow key={index} row={row}/>)}
        </tbody>
    </table>
}

const Events = (
    {
        tableData,
        errors,
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
    return <div className={'Events columns-1-outer-left'}>
        <h1>Events</h1>
        <ErrorComponent errors={errors}/>
        <TableContent headers={tableData.columnNames} rows={tableData.rows}/>
        <hr/>
        <a href={dashboardPagePath} onClick={onClickAnchor}>dashboard</a>
    </div>
}

export default Events
