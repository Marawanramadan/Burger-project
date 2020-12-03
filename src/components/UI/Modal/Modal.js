import React , {Component} from 'react'
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'
import Aux from '../../../HOC/Auxilliary'
class Modal extends Component {
    shouldComponentUpdate(nextProps,nextStates){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    
    render(){
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.clicked}></BackDrop>
                <div style={{
                    transform :this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : this.props.show ? '1' : '0'
                }} 
                className={classes.Modal}>
                    {this.props.children}
                </div>
        </Aux>
        )
    }

}

export default Modal;