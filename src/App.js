import './App.css';
import {initializeEvents, reducer, saga, Top} from './top/top'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, compose, createStore} from 'redux'
import {createBrowserHistory} from 'history';
import createEnvironment from './environment/environment';
import fetchSimulator from "./fake/fetchSimulator";

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
)
const history = createBrowserHistory()
const environment = createEnvironment({
  fetch: fetchSimulator, history, sessionStorage
})
sagaMiddleware.run(saga(environment))
initializeEvents.forEach(event => store.dispatch(event))
const App = () => <div className={'App'}>
  <Provider store={store}>
    <Top/>
  </Provider>
</div>

export default App;
