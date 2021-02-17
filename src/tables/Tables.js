import './Tables.css'
import ErrorComponent from "../error/ErrorComponent";

const TableSelector = ({name, selectedName}) => {
    let className
    if (selectedName === name) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <label className={className}>{name}</label>
}

const TableSelectors = ({names, selectedName}) => {
    return <div>
        {names.map(name => <TableSelector name={name} selectedName={selectedName}/>)}
    </div>
}

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

const Tables = ({selectedName, names, headers, rows, errors}) => {
    console.log({selectedName, names, headers, rows, errors})
    return <div className={'Tables'}>
        <h1>Tables</h1>
        <ErrorComponent errors={errors}/>
        <TableSelectors names={names} selectedName={selectedName}/>
        <TableContent headers={headers} rows={rows}/>
        <a href={'/dashboard'}>dashboard</a>
    </div>
}

export default Tables
