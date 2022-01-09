import './DebugTables.css'
import ErrorComponent from "../error/ErrorComponent";
import {createDebugTablesPagePath} from "./debugTablesConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const TableSelector = ({name, selectedName}) => {
    let className
    if (selectedName === name) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <a href={createDebugTablesPagePath(name)}  className={className}>{name}</a>
}

const TableSelectors = ({names, selectedName}) => {
    return <div>
        {names.map(name => <TableSelector
            key={name}
            name={name}
            selectedName={selectedName}/>)}
    </div>
}

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

const DebugTables = ({selectedName, names, table, errors}) => {
    return <div className={'DebugTables'}>
        <h1>Debug Tables</h1>
        <ErrorComponent errors={errors}/>
        <TableSelectors names={names} selectedName={selectedName}/>
        <TableContent headers={table.columnNames} rows={table.rows}/>
        <hr/>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default DebugTables
