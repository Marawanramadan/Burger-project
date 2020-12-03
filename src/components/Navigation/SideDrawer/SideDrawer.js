import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../HOC/Auxilliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close]
    if (props.show){
        attachedClasses = [classes.SideDrawer , classes.Open]
    }
    return (
        <Aux>
            <BackDrop show={props.show} clicked={props.closed}></BackDrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;