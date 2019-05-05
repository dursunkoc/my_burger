import React from 'react';
import Aux from './Aux'
import Modal from '../components/UI/Modal/Modal'

const withErrorHander = (WrappedComponent, axios) =>
    (
        class extends React.Component {
            componentDidMount(){
                axios.interceptors.response.use(response=>response, error=>{
                    this.setState({
                        error: error
                    })
                })
            }

            state ={
                error: null
            }
            
            hideModal = ()=>{
                this.setState({
                    error: null
                })
            }
            
            render() {
                return (
                    <Aux>
                        <Modal visible={this.state.error} hideModal={this.hideModal}>{this.state.error?this.state.error.message:null}</Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
                )
            }
        }
    );

export default withErrorHander;