import ErrorComponent from "../error/ErrorComponent";
import {createDebugTablesPagePath} from "./debugTablesConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {Link} from "../library/uri-util";

const TableSelector = ({tableName, selectedTableName, setUri}) => {
    let className
    if (selectedTableName === tableName) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <Link href={createDebugTablesPagePath(tableName)} className={className} setUri={setUri}>{tableName}</Link>
}

const TableSelectors = ({tableNames, selectedTableName, setUri}) => {
    return <div>
        {tableNames.map(tableName => <TableSelector
            key={tableName}
            tableName={tableName}
            selectedTableName={selectedTableName}
        setUri={setUri}/>)}
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

const DebugTables = (
    {
        tableNames,
        selectedTableName,
        selectedTableData,
        errors,
        globalSetUri
    }) => {
    return <div className={'DebugTables columns-1-outer-left'}>
        <h1>Debug Tables</h1>
        <ErrorComponent errors={errors}/>
        <TableSelectors tableNames={tableNames} selectedTableName={selectedTableName} setUri={globalSetUri}/>
        <TableContent headers={selectedTableData.columnNames} rows={selectedTableData.rows}/>
        <hr/>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </div>
}

export default DebugTables
