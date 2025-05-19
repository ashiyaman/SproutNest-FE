import { useState } from "react"
import { useSelector } from "react-redux"

const AddressList = () => {
    const {user, status, error} = useSelector(state => state.user)

    console.log(user)

    return (
        <main className='container'>
            {status === 'loading' && (
                <div className="d-flex justify-content-center my-3">
                    <Spinner animation="border" variant="primary" />
                    <span className="ms-2">Loading products...</span>
                </div>
            )}
            {status === 'success' && (
                <div>
                    {user.addresses.map(address => (
                        <div className='card'>
                            <input type='radio' value={address}/> {address}
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default AddressList