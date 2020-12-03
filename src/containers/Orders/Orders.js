import React , {Component} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import axios from '../../axios-orders'

class Orders extends Component {
    // state ={
    //     orders : [],
    //     loading : true
    // }
    componentDidMount(){
        this.props.onFetchOrdersStart(this.props.token,this.props.userId)
        // let fetchedOrders = []
        // axios.get('/orders.json')
        // .then(response=>{
        //     for(let key in response.data){
        //         fetchedOrders.push({
        //             ...response.data[key],
        //             id : key
        //         })
        //     }

        //     this.setState({loading : false,orders:fetchedOrders})
        //     console.log(fetchedOrders)
        //     console.log(response.data)
        // })
        // .catch(err => {
        //     console.log(err)
        //     this.setState({loading : false})
        // })
    }
    render(){
        let ordersList = <Spinner></Spinner>
        if(!this.props.loading){
            ordersList = this.props.orders.map(order =>(
                <Order key={order.id} 
                       ingredients={Object.entries(order.ingredients)} 
                       price={order.price}>

                </Order>))
            }
        return(
            <div>
                {ordersList}

            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.idToken,
        userId : state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrdersStart : (token,userId) => dispatch(actionCreators.fetchOrders(token,userId)) 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));