import { applyMiddleware, combineReducers, createStore } from 'redux'
// import {  } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const initialState = {
    nomor: 1,
    huruf: []
}


export const reducerSatu = ( state = initialState.nomor , action ) => {
    switch( action.type )
    {
        case 'INCREMENT':
            return state + 1

        case 'DECREMENT':
            return state - 1
        
        default:
            return state
    }
}

export const reducerDua = ( state = initialState.huruf, action ) => {
    switch( action.type )
    {
        case 'TAMBAH':
            return state.push(1)
        
        case 'KURANG':
            return state.pop()
        
        default:
            return state
        
    }
}

export const combine = combineReducers({
    reducerSatu,
    reducerDua,
})

export const store   = createStore( combine, applyMiddleware(logger) )

export default store