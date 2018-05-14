import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './auth_reducer'

const rootReducer = combineReducers({
  //form: form ES6 can make simple as below
  form,
  auth: authReducer
})

export default rootReducer
