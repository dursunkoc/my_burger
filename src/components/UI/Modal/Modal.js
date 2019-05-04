import React from 'react'
import styles from './Modal.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    componentWillUpdate(){
        console.log('[Modal.componentWillUpdate]')
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.visible !== this.props.visible
    }
    render() {
        return (
            <Aux>
                <div style={{
                    transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.visible ? '1' : '0'
                }} className={styles.Modal}>
                    {this.props.children}
                </div>
                <Backdrop show={this.props.visible} onClick={this.props.hideModal} />
            </Aux>
        )
    }
}

export default Modal