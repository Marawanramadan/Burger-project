import React , { Component } from 'react'
import { Route ,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'
class Checkout extends Component {
   
   
    cancelPurchase = () =>{
        this.props.history.goBack()
    }
    continuePurchase = () => {
        this.props.history.replace('/checkout/contact-data')
        
    }
    render(){
        let summary = (
            <Redirect to='/'></Redirect>
        )
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'></Redirect> : null
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    cancelPurchase={this.cancelPurchase}
                    continuePurchase={this.continuePurchase}>
                </CheckoutSummary>
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}></Route>
            </div>
        }
        return summary
           
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burger.ingredients,
        purchased : state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);