import './App.css';
import {historyEvent, initializeEvents, reducer, saga, Top} from './top/top'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, compose, createStore} from 'redux'
import {createBrowserHistory} from 'history';
import createEnvironment from './environment/environment';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
)
const history = createBrowserHistory()
history.listen(({location, action}) => {
  const event = historyEvent({location, action})
  store.dispatch(event)
})
const environment = createEnvironment({
  fetch,
  history,
  console,
  location:window.location
})
sagaMiddleware.run(saga(environment))
initializeEvents.forEach(event => store.dispatch(event))

const App = () => <div className={'App'}>
  <Provider store={store}>
    <Top/>
  </Provider>
</div>

export default App;
