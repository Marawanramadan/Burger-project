import React ,{useEffect} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxilliary'
const withErrorHandler = (WrappedComponent , axios) => {
    return props => {
            const[error,setError] = useEffect(null)
        
        
            const reqInterceptor = axios.interceptors.request.use(req => {
               setError(null)
                return req
            })
            const resInterceptor = axios.interceptors.response.use(res => res,err => {
                setError(err)
            })
        }
            useEffect(()=>{
                return () => {
                    axios.interceptors.request.eject(reqInterceptor)
                    axios.interceptors.response.eject(resInterceptor)
                }
            },[reqInterceptor,resInterceptor])
       
        const errorConfirmed = () => {
            setError(null)
        }
        
            return (
                <Aux>
                <Modal show={error}
                        clicked={this.errorConfirmed}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}>
        
                </WrappedComponent>
            </Aux>
            )
        
        
    }
   
}

export default withErrorHandler
