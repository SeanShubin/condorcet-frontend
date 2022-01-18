import ErrorComponent from "../error/ErrorComponent";
import {createTablesPagePath} from "./tablesConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const TableSelector = ({tableName, selectedTableName, onClickAnchor}) => {
    let className
    if (selectedTableName === tableName) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <a href={createTablesPagePath(tableName)} className={className} onClick={onClickAnchor}>{tableName}</a>
}

const TableSelectors = ({tableNames, selectedTableName, onClickAnchor}) => {
    return <div>
        {tableNames.map(tableName => <TableSelector
            key={tableName}
            tableName={tableName}
            selectedTableName={selectedTableName}
            onClickAnchor={onClickAnchor}/>)}
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

const Tables = (
    {
        selectedTableName,
        tableNames,
        tableData,
        errors,
        globalSetUri
    }) => {
    const onClickAnchor = event => {
        event.preventDefault()
        globalSetUri(event.target.href)
    }
    return <div className={'Tables columns-1-outer-left'}>
        <h1>Tables</h1>
        <ErrorComponent errors={errors}/>
        <TableSelectors tableNames={tableNames} selectedTableName={selectedTableName} onClickAnchor={onClickAnchor}/>
        <TableContent headers={tableData.columnNames} rows={tableData.rows}/>
        <hr/>
        <a href={dashboardPagePath} onClick={onClickAnchor}>dashboard</a>
    </div>
}

export default Tables
