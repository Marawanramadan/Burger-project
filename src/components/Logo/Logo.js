import React from 'react'
import logo from '../../Assets/Images/burgerlogo.png'
import classes from './Logo.module.css'
const Logo = (props) =>{
    return (
        <div className={classes.Logo} style={{height : props.height}}>
            <img src={logo} alt="Burger logo"></img>
        </div>
    )
}

export default Logo;