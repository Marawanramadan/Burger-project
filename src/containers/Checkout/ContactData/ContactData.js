import React , { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
class ContactData extends Component {
    state = {
        orderForm : {
            name : {
                name:'Name',

                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched:false
            },
            street : {
                name:'Street',
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched:false
            },
            email : {
                name:'E-Mail',

                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your E-mail'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched:false
            },
            ZIP : {                
                name:'ZIP',
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'ZIP CODE'
                },
                value : '',
                validation :{
                    required : true,
                    minLength :5,
                    maxLength : 5
                },
                valid : false,
                touched:false
            },
            country : {
                name:'Country',
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched:false
            },
            delivery_Method : {
                name:'Delivery Method',
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest',dislayValue: 'Fastest'},
                        {value : 'cheapest',dislayValue: 'Cheapest'},

                    ]
                },
                value : 'fastest',
                validation :{
                    required : false
                },
                valid:true
            }
        },
            
            isFormValid : false
    }
    componentDidMount(){
        console.log("contact data mounted")
    }
    orderBurger = (event) =>{
        this.setState({loading : true})
        const orderData = {}
        for (let data in this.state.orderForm){
            orderData[data] = this.state.orderForm[data].value
        }
        const order = {
            ingredients : this.props.ings,
            price : this.props.price,
            orderData : orderData,
            userId : this.props.userId
        }
        this.props.onOrderSuccess(order,this.props.token)
        
        event.preventDefault()
    }

    checkValidity = (value,rules) =>{
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength-1 && isValid
        }if(rules.maxLength){
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
        return isValid
    }

    inputChange = (event,id) =>{
        let updatedForm = {...this.state.orderForm}
        let updatedFormElement = {...updatedForm[id]}
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedForm[id] = updatedFormElement
        let isFormValid = true
        for (let el in updatedForm){
            isFormValid = updatedForm[el].valid && isFormValid
        }
        this.setState({orderForm : updatedForm,isFormValid:isFormValid})
    }
    render(){
        
        let formElements = []
        for (let element in this.state.orderForm){
            formElements.push(
                {
                    id : element,
                    config : this.state.orderForm[element]
                }
            )
        }

        let form = (
            <form>
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
                    <Button disabled={!this.state.isFormValid} className={classes.Input} btnType="Success" clicked={this.orderBurger}>ORDER</Button>
                </form>
        )
        if(this.props.loading){
            form = <Spinner></Spinner>
        }

        return(
            <div className={classes.ContactData}>
                <h3>Enter your information</h3>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings : state.burger.ingredients,
        price : state.burger.totalPrice,
        loading : state.order.loading,
        token : state.auth.idToken,
        userId : state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSuccess : (orderData,token) => dispatch(actionCreators.orderBurgerStart(orderData,token)),
        onOrderFailed : () => dispatch(actionCreators.orderBurgerFailed())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactData);