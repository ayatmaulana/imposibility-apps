import { applyMiddleware, combineReducers, createStore } from 'redux'
// import {  } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const initialState = {
    result: null,
    input: {
        baseName: null,
        o: 'Suffix',
        k: 'Nouns'
    }
}


export const result = ( state = initialState.result , action ) => {
    switch( action.type )
    {
        case 'ADD_RESULT':
            return action.payload

        case 'UPDATE_RESULT':
            return state.concat( action.payload )
        
        default:
            return state
    }
}

export const inputForm = ( state = initialState.input, action ) => {
    switch( action.type )
    {
        case 'CHANGE_BASENAME':
            return Object.assign({}, state, { baseName: action.payload })

        case 'CHANGE_O':
            return Object.assign({}, state, { o: action.payload })

        case 'CHANGE_K':
            return Object.assign({}, state, { k: action.payload })

        default:
            return state
        
    }
}

export const combine = combineReducers({
    result,
    inputForm,
})

export const store   = createStore( combine, applyMiddleware(logger) )

export default store