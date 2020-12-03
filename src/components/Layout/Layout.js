import React ,{Component} from 'react'
import Aux from '../../HOC/Auxilliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout extends Component{
    state = {
        showSideDrawer : false
    }
    showSideDrawer = (props) =>{
        this.setState({showSideDrawer : true})
    }

    hideSideDrawer = (props) =>{
        this.setState({showSideDrawer :false})
    }
    render(){
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer} opened={this.showSideDrawer}></Toolbar>
                <SideDrawer isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer} closed={this.hideSideDrawer}></SideDrawer>
                <p className={classes.par}>Test</p>
            </Aux>
)}}

const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.idToken !== null
    }
}
export default connect(mapStateToProps)(Layout);