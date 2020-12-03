import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../NavigationItems/NavigationItems'
const toolbar = (props)=> {
    return (
        <header className={classes.Toolbar}>
            <div onClick={props.opened} className={classes.DrawerToggle}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height='80%'></Logo>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}></NavigationItems>
            </nav>
        </header>
    )
}

export default toolbar;