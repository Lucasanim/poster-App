import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {MainReducer} from './Reducers'

export const Store = createStore(
    MainReducer,
    applyMiddleware(thunk)
)