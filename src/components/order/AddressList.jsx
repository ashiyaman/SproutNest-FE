import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Spinner } from 'react-bootstrap'

const AddressList = () => {
    const [defaultAddress, setDefaultAddress] = useState(user.addresses.filter(address => address.isShippingAddress === true))
    const {user, status, error} = useSelector(state => state.user)

    console.log('fetching address list..............', user?.addresses)

    useEffect(() => {

    }, [])

    return (
        <main className='container'>
            {status === 'loading' && (
                <div className="d-flex justify-content-center my-3">
                    <Spinner animation="border" variant="primary" />
                    <span className="ms-2">Loading Address...</span>
                </div>
            )}
            {status === 'success' && (
                <div>
                    
                </div>
            )}
        </main>
    )
}

export default AddressList