import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Bon Appetit!</h1>
            <div style={{width : "100%",height : "300px"}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>

        </div>
    )
}

export default checkoutSummary;