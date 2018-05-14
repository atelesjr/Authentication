import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const renderInput = field =>
  <div>
    <input {...field.input} type={field.type} className="form-control" />
  </div>

class Signin extends Component {
    handleFormSubmit({ email, password }){
        console.log(email, password)
        //need to do something to log user in
        this.props.signinUser({ email, password })
    }

    renderAlert(){
        if( this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Oops!</strong> { this.props.errorMessage }
                </div>
            )
        }
    }

    render(){
        //props object - handlesubmit helper from redux-form
        const { handleSubmit } = this.props

        return (
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <div className="form-group">
                    <label>E-mail: </label>
                    <Field name="email" component={ renderInput } type="text" />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <Field name="password" component={ renderInput } type="password" />
                </div>
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        ) 
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error }
}

//reduxFrom(configuration)(component)
const reduxFormSignin = reduxForm({ 
    form: 'signin', 
    fields: ['email', 'password'] 
})(Signin)

export default connect(mapStateToProps, actions)(reduxFormSignin)
