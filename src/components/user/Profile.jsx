import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {deleteAddress, getUser} from './userSlice.jsx'
import { useEffect } from "react"

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    const editDetailsHandler = (editAddress) => {
        console.log('....edit addr...', editAddress)
        navigate('/user/userForm', {state: {editAddress: editAddress}})
    }

    return(
        <main className='container py-4' style={{color: '#224d43'}}>
            <h3 className='my-3'>Welcome, {user?.name}</h3>
            <hr/>    
            {user?.addresses && 
                <>
                    <h5 className='py-2'>Address:</h5>
                    {user.addresses.map(address => (     
                        <div key={address._id} className='card container py-4' style={{color: '#224d43'}}>
                            <p>Type: {address.addressType}</p>
                            <p className='fw-semibold'>{user.name}</p>
                            <p>{address.street}, {address.city}, {address.country}, {address.zip}.</p>
                            {user.phoneNo && 
                                <p>Phone No: {user.phoneNo}</p>
                            }
                            <div className='d-flex justify-content-around'>
                                <button className='btn btn-success fw-bold rounded-pill my-2' onClick={() => editDetailsHandler(address)} >Edit</button>
                                <button className='btn btn-danger fw-bold rounded-pill my-2' onClick={() => dispatch(deleteAddress({userId: user._id, addressId: address._id}))}>Delete</button>
                            </div>
                        </div>                
                    ))}
                </>
            }
            <div className='container text-center my-4'>
                <Link className='btn btn-success fw-bold rounded-pill my-2' to='/user/userForm'>Add Address</Link>
            </div>
        </main>
    )
}

export default Profile