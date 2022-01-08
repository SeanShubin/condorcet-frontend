import React from 'react';
import './Style.css'

const Style = () => {
    return <div className={'Style'}>
        <a href={'/login'}>Login</a>
        <div className={'example'}>
            <fieldset>
                <legend>Header</legend>
                <h1>Header</h1>
            </fieldset>
            <fieldset>
                <legend>Input</legend>
                <input value={'input value'}
                       autoFocus={true}
                       placeholder={'input placeholder'}/>
                <input value={''}
                       autoFocus={true}
                       placeholder={'input placeholder'}/>
            </fieldset>
            <fieldset>
                <legend>Action</legend>
                <button type={'submit'}>Enabled</button>
                <button disabled type={'submit'}>Disabled</button>
            </fieldset>
            <fieldset>
                <legend>Selection</legend>
                <button className={'selected'}>Enabled Selected</button>
                <button disabled className={'selected'}>Disabled Selected</button>
                <button className={'not-selected'}>Enabled Not Selected</button>
                <button disabled className={'not-selected'}>Disabled Not Selected className={'not-selected'}</button>
            </fieldset>
            <fieldset>
                <legend>Link</legend>
                <a href={'/style'}>Link</a>
            </fieldset>
            <fieldset>
                <legend>Table</legend>
                <table>
                    <thead>
                    <tr>
                        <th>aaa</th>
                        <th>bbb</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ccc</td>
                        <td>ddd</td>
                    </tr>
                    <tr>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    </tbody>
                </table>
            </fieldset>
            <fieldset>
                <legend>Table with dropdowns</legend>
                <table>
                    <thead>
                    <tr>
                        <th>aaa</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <select value={'ddd'}>
                                <option>ccc</option>
                                <option>ddd</option>
                                <option>eee</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select value={'ggg'}>
                                <option>fff</option>
                                <option>ggg</option>
                                <option>hhh</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </fieldset>
        </div>
        <a href={'/login'}>Login</a>
    </div>
}

export default Style
