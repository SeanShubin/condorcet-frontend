import './Events.css'
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

const Events = ({table, errors}) => {
    return <div className={'Events'}>
        <h1>Events</h1>
        <ErrorComponent errors={errors}/>
        <a href={dashboardPagePath}>dashboard</a>
        <TableContent headers={table.columnNames} rows={table.rows}/>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default Events
