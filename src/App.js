import React , {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route , Switch ,Redirect,withRouter} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth'
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/index'
class App extends Component {

  componentDidMount(){
    this.props.onAutoSignIn();
  }
  
  render(){
    let routes = (
      <Switch>
          <Route exact path="/" component={BurgerBuilder}></Route>
          <Route path="/auth" component={Auth}></Route>
      </Switch>
    )
    if (this.props.isAuthenticated){
      routes= (<Switch>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route exact path="/" component={BurgerBuilder}></Route>
        
      </Switch>)
    }
  return (

    <div className="App">
      <Layout>

      </Layout>
      {routes}
      
    </div>

  );
}
}

const mapStateToProps = state =>{
  return {
    isAuthenticated : state.auth.idToken !== null
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onAutoSignIn : () => dispatch(actionCreators.authCheckStatus())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
