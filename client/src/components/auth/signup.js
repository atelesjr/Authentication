import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label >{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control" />
        { touched && error && <span className="text-danger">{error}</span> }
    </div>
)
//if touched=true & if error=true entao mostr erro)


class Signup extends Component {
    
    handleFormSubmit({ email, password }){
        this.props.signupUser({ email, password })
    }
    
    render() {
        const { handleSubmit } = this.props
        return (
            //handlesubmit helper from redux-form
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <Field name="email" component={ renderInput } type="email" label="E-mail:" />
                <Field name="password" component={ renderInput } type="password" label="Password:" />
                <Field name="passwordConfirm" component={ renderInput } type="password" label="Confirm Passowrd:"/>
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        )
    }
}

function validate(formProps){
    const errors= {}

    if(!formProps.email){
        errors.email = 'Please enter an email'
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address'
     }

    if(!formProps.password){
        errors.password = 'Please enter a password'
    }

    if(!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password confirmation'
    }

    if(formProps.password !== formProps.passwordConfirm)
        errors.password = 'Password must match' 
        
    return errors
}

function mapStateToProps(state) {
    return {
      errorMessage: state.auth.error
    }
  }

const reduxFormSignup = reduxForm({ 
    form: 'signup', 
    //validate: validade  same key as value.
    validate
})(Signup)

export default connect(mapStateToProps, actions)(reduxFormSignup)
