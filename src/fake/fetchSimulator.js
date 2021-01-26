import * as R from 'ramda'
import util from 'util'

const statusCode = {
    ok: 200,
    unauthorized: 401,
    notFound: 404,
    conflict: 409
}

const composeResponse = ({status, bodyJson}) => {
    const json = () => Promise.resolve(bodyJson)
    const ok = status >= 200 && status <= 299
    const result = Promise.resolve({status, ok, json})
    return result
}

const users = []
const addUser = ({name, email, password}) => {
    users.push({name, email, password})
}
const findByName = name => R.find(R.propEq('name', name), users)
const findByEmail = email => R.find(R.propEq('email', email), users)
const nameExists = name => !!findByName(name)
const emailExists = email => !!findByEmail(email)
const loginRequest = ({nameOrEmail, password}) => {
    let found
    if (!found) found = findByName(nameOrEmail)
    if (!found) found = findByEmail(nameOrEmail)
    if (found) {
        if (found.password === password) {
            return {
                status: statusCode.ok,
                bodyJson: {name: found.name}
            }
        } else {
            return {
                status: statusCode.unauthorized,
                bodyJson: {userMessage: `Wrong password for user '${nameOrEmail}'`}
            }
        }
    } else {
        return {
            status: statusCode.notFound,
            bodyJson: {userMessage: `User '${nameOrEmail}' not found`}
        }
    }
}
const registerRequest = ({name, email, password}) => {
    if (nameExists(name)) {
        return {
            status: statusCode.conflict,
            bodyJson: {userMessage: `User name '${name}' is unavailable`}
        }
    } else if (emailExists(email)) {
        return {
            status: statusCode.conflict,
            bodyJson: {userMessage: `User with email '${email}' is already registered`}
        }
    } else {
        addUser({name, email, password})
        return {
            status: statusCode.ok,
            bodyJson: {name}
        }
    }
}

addUser({name: 'foo', email: 'foo@email.com', password: 'bar'})

const fetchSimulator = (resource, init) => {
    let result
    if (resource === '/proxy/login-request' && init.method === 'POST') {
        const {nameOrEmail, password} = JSON.parse(init.body)
        result = loginRequest({nameOrEmail, password})
    } else if (resource === '/proxy/register-request' && init.method === 'POST') {
        const {name, email, password} = JSON.parse(init.body)
        result = registerRequest({name, email, password})
    } else {
        throw Error(`No response defined for ${util.inspect({resource, init})}`)
    }
    return composeResponse(result)
}

export default fetchSimulator
