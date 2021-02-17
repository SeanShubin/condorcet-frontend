import './Events.css'
import ErrorComponent from "../error/ErrorComponent";

const TableHeader = ({header}) => <th>{header}</th>

const TableRow = ({row}) => <tr>{row.map(cell => <td>{cell}</td>)}</tr>

const TableContent = ({headers, rows}) => {
    return <table>
        <thead>
        <tr>{headers.map(header => <TableHeader header={header}/>)}</tr>
        </thead>
        <tbody>
        {rows.map(row => <TableRow row={row}/>)}
        </tbody>
    </table>
}

const Events = ({table, errors}) => {
    return <div className={'Events'}>
        <h1>Events</h1>
        <ErrorComponent errors={errors}/>
        <TableContent headers={table.columnNames} rows={table.rows}/>
        <a href={'/dashboard'}>dashboard</a>
    </div>
}

export default Events
