import React , {Component} from 'react'
import Aux from '../../../HOC/Auxilliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
    componentDidUpdate(){
        console.log("[OrderSummary] will update")
    }
    render(){
        const orderIngredients = Object.keys(this.props.orderIngredients).map(igKey => {
            return <li key={igKey}> 
                    <span style={{textTransform : 'capitalize'}}>{igKey} </span>: {this.props.orderIngredients[igKey]}
                    </li>
        })

        
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {orderIngredients}
                </ul>
                <p><strong>Total price : {this.props.price.toFixed(2)}</strong></p>
                <Button btnType="Danger" clicked={this.props.cancelPurchasing}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchasing}>CONTINUE</Button>
            </Aux>
        )
    }


}

export default OrderSummary;