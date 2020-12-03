import React from 'react'
import Control from './Control/control'
import classes from './controls.module.css'

const controls = [
    {Label : "Meat" , type : "meat"},
    {Label : "Salad" , type : "salad"},
    {Label : "Cheese" , type : "cheese"},
    {Label : "Bacon" , type : "bacon"}]
const Controls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p><strong>Current price : {props.price.toFixed(2)}</strong></p>
            {controls.map(ig => {
                return <Control  disabled={props.disabled[ig.type]} removed={()=>props.ingredientsRemoved(ig.type)} added={() =>props.ingredientsAdded(ig.type)} key={ig.Label} Label={ig.Label}></Control>
            })}
            <button onClick={props.clicked} disabled={!props.purchasable} className={classes.OrderButton}>{!props.isAuth ? "Sign In to order" : "PROCEED TO CHECKOUT"}</button>
        </div>
    )
}

export default Controls