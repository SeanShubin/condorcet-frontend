import {lensPathWithDefault} from '../library/lens-util';

const sampleNames = ['int_variable', 'role_permission', 'user']
const sampleHeaders = ['id', 'name', 'email', 'salt', 'hash', 'role']
const sampleRows = [
    ['1', 'Alice', 'alice@email.com', '8d027cff-d538-4078-8de9-b15c0c46d383', '972A59B9F4F03166E3023CFE496F179F1AEACBAC0D8BEA2A5E28676D384A2BC4', 'OWNER'],
    ['2', 'Bob', 'bob@email.com', '9cfdf833-a1cb-487a-bf8e-a2efd8b209a4', '7961966BF84F86F943E0B56DB8CF66075CB7B160811FF2995107F7715D4F9D6C', 'USER']
]

const tablesModel = {
    selectedName: lensPathWithDefault(['tables', 'selectedName'], 'user'),
    names: lensPathWithDefault(['tables', 'names'], sampleNames),
    headers: lensPathWithDefault(['tables', 'headers'], sampleHeaders),
    rows: lensPathWithDefault(['tables', 'rows'], sampleRows),
    errors: lensPathWithDefault(['tables', 'errors'], [])
}

export default tablesModel
