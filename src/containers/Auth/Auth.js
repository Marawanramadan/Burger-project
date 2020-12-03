import React , {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actionCreators from '../../store/actions/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state = {
        controls : {
            email : {
                name:'Email',

                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Email Address'
                },
                value : '',
                validation :{
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched:false
            },
            password : {
                name:'Password',

                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Password'
                },
                value : '',
                validation :{
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched:false
            },
        },
        isSignup : true
    }

checkValidity = (value,rules) =>{
    let isValid = true
    if(rules.required){
        isValid = value.trim() !== '' && isValid
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength-1 && isValid
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength-1 && isValid
    }
    if (rules.isEmail){
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        isValid = pattern.test(value) && isValid
    }
    if(rules.isNumeric){
        const pattern = /^\d+$/
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}
inputChange = (event,id) =>{
    let updatedForm = {...this.state.controls}
    let updatedFormElement = {...updatedForm[id]}
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
    updatedFormElement.value = event.target.value
    updatedFormElement.touched = true
    updatedForm[id] = updatedFormElement
    let isFormValid = true
    for (let el in updatedForm){
        isFormValid = updatedForm[el].valid && isFormValid
    }
    this.setState({controls : updatedForm,isFormValid:isFormValid})
}

onSubmitForm = (event) =>{
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    if(this.props.price){
        this.props.history.push('/checkout')
    }
}

switchMode = () => {
    this.setState(prevState =>{
        return {isSignup : !prevState.isSignup}
    })
    console.log(this.state.isSignup)
}
render(){
    let formElements = []
        for (let element in this.state.controls){
            formElements.push(
                {
                    id : element,
                    config : this.state.controls[element]
                }
            )
        }

        let form = (
            <form onSubmit={this.onSubmitForm}>
                    {formElements.map(el => {
                        return <Input elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value} 
                        label={el.config.name} 
                        key={el.id}
                        invalid={!el.config.valid} 
                        touched={el.config.touched}
                        shouldValidate={el.config.validation}
                        changed={(event)=>this.inputChange(event,el.id)}></Input>
                    })}
                    <Button className={classes.Input} btnType="Success">SUBMIT</Button>
                </form>
                
        )
        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/"></Redirect>
        }
        if(this.props.loading){
            form = <Spinner></Spinner>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
    return (
    <div className={classes.Controls}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button btnType="Danger" className={classes.Input} clicked={this.switchMode}>Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}</Button>
    </div>)
}
}
const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.idToken !==null,
        price : state.burger.totalPrice > 4
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email,password ,isSignup) => dispatch(actionCreators.auth(email,password,isSignup))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);