import React from 'react'
import classes from './control.module.css'

const Control = (props) => {
    return (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.Label}</div>
        <button onClick={props.removed} disabled={props.disabled} className={classes.Less}>Less</button>
        <button onClick={props.added} className={classes.More}>More</button>
        

    </div>
    )
}

export default Control;