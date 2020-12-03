import React , {Component} from 'react'
import Aux from '../../HOC/Auxilliary'
import classes from './BurgerBuilder.module.css'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/controls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import * as actionCreators from '../../store/actions/index'


class BurgerBuilder extends Component{
    // const [burger , setBurger] = useState({
    //     meat : 0,
    //     salad :0,
    //     cheese : 0,
    //     bacon : 0
    // })
    // const [price , setPrice] = useState(4)
    state = {
        Modal : false,
        
    }

    componentDidMount(){
        console.log(this.props)
        this.props.onInitIngredients()
      

    }
    
    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum,el) =>{
                return sum + el
            },0)
            return sum > 0
        }

    purchasing = ()=>{
        if(this.props.isAuthenticated){
            this.setState({Modal : true})
        }else{
            this.props.history.push('/auth')
        }

    }

    cancelPurchasing = () => {
        this.setState({Modal : false})
    }
    continuePurchasing = () =>{
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    

    render(){
        const disabledButton = {
            ...this.props.ings
        }
        for (let key in disabledButton){
            disabledButton[key] = disabledButton[key] <= 0
        }
        let orderSummary = null
         
        
        let burger = this.props.error ? <p>Couldn't load ingredients!</p> : <Spinner></Spinner>
        if(this.props.ings){
            burger = (<Aux> 
                <Burger ingredients={this.props.ings} 
                        className={classes.component}>

                </Burger>
                <Controls clicked={this.purchasing}
                          isAuth={this.props.isAuthenticated} 
                          price={this.props.price} 
                          purchasable={this.updatePurchase(this.props.ings)} 
                          disabled={disabledButton} 
                          ingredientsRemoved={this.props.onIngredientRemoved} 
                          ingredientsAdded={this.props.onIngredientAdded} 
                          className={classes.component}>

                </Controls>
            </Aux>)

            orderSummary = <OrderSummary 
            price={this.props.price} 
            cancelPurchasing={this.cancelPurchasing} 
            continuePurchasing={this.continuePurchasing} 
            orderIngredients={this.props.ings}>
                
            </OrderSummary> 
        }
        
        return (
            <Aux>
            <Modal show={this.state.Modal} clicked={this.cancelPurchasing} > 
                {orderSummary}
            </Modal>
                {burger}
             </Aux>
        )
    }
       
    
}
const mapStateToProps = state =>{
    return {
        ings : state.burger.ingredients,
        price : state.burger.totalPrice,
        error : state.burger.error,
        isAuthenticated : state.auth.idToken !==null
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onInitIngredients : ()=> dispatch(actionCreators.initIngredients()),
        onIngredientAdded : (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onPurchaseInit : ()=> dispatch(actionCreators.purchaseInit()) 
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));