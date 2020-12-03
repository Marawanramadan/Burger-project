import React from 'react'
import classes from './Input.module.css'

const Input =(props) =>{
    let inputElement = null
    let inputClasses =[classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case "input":
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}></input>
            break;
        case "textarea":
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}></textarea>
            break;
        case "select":
            inputElement = <select onChange={props.changed} className={inputClasses.join(' ')} 
            value={props.value}>{props.elementConfig.options.map((option ,i) =>{
            return <option key={i} value={option.value}>{option.dislayValue}</option>
        })}</select>
            break
        default:
            inputElement = <input onChange={props.changed}className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}></input>
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input 