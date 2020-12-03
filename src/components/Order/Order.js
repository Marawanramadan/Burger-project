import React from 'react'
import classes from './Order.module.css'
const Order = (props) => {
    let ingredients = []
    console.log(props.ingredients)
    props.ingredients.map(ingredient => {
        ingredients.push({
            name : ingredient[0],
            amount : ingredient[1]
        })
    })
        
    
    const ingredientsOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{
            border : "1px solid black",
            margin : "2px",
            display : "inline-block",
            textTransform :"capitalize",
        }}>{ig.name} : {(ig.amount)}</span>
    })
    return(
        
        <div className={classes.Order}>
            <p>Ingredients : {ingredientsOutput}</p>
            <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;