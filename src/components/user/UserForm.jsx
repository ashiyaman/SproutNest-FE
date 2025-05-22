import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { postUser, postAddress, updateAddress } from "./userSlice"
import { setAlert } from "../notifications/loadingAlertSlice"

const UserForm = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useSelector(state => state.user)

    const state = location.state || {}    

    const [name, setName] = useState('')
    const [phoneNo, setPhoneNo] = useState(state?.editAddress ? state.editAddress.phoneNo : '')
    const [street, setStreet] = useState(state?.editAddress ? state.editAddress.street : '')
    const [city, setCity] = useState(state?.editAddress ? state.editAddress.city : '')
    const [country, setCountry] = useState(state?.editAddress ? state.editAddress.country : '')
    const [zip, setZip] = useState(state?.editAddress ? state.editAddress.zip : '')
    const [isShippingAddress, setIsShippingAddress] = useState(state?.editAddress ? state.editAddress.isShippingAddress : false)

    const userRegHandler = async (e) => {
        e.preventDefault();
        
        const editAddress = location.state?.editAddress || null; 

        const firstUser = !user || user === null ? 1 : 0

        if(!user || user === null || !user.addresses || user.addresses.length < 1 ) setIsShippingAddress(true)

        let addressData = {
            phoneNo, street, city, country, zip, isShippingAddress: firstUser ? true : false
        };

        if (editAddress) {
            console.log('we are editing........')
            dispatch(updateAddress({ addressId: editAddress._id, addressToUpdate: addressData }))
                .then(() => dispatch(setAlert(`Address Updated successfully.`)))
        } else {
            if(firstUser == 0){
                console.log('....user another addrr...........', addressData)
                dispatch(postAddress({user, addressData}))
                    .then(() => dispatch(setAlert(`Added new Address successfully.`)))
            }
            else{
                console.log('.........add first addres........')
                const userData = {
                   ...addressData
                }
                dispatch(postUser(userData))
                    .dispatch(() => dispatch(setAlert(`User registered successfully.`)))
            }
            
        }
    
        navigate('/userProfile');
    };
    
    return(
        <main className='container py-4'>
            <form style={{color: '#224d43'}} onSubmit={(e) => userRegHandler(e)}>
                <h3 className='fw-bold py-4'>User Profile</h3>
                {(!user || user.length < 1) &&
                <>
                    <div>
                        <label className='fw-semibold'>Name: </label>
                        <input type='text' required onChange={(e) => setName(e.target.value)} value={name} className='form-control'/>
                    </div><br/>
                </>
                }
                <div>
                    <label className='fw-semibold'>Phone No: </label>
                    <input type='text' className='form-control' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                </div><br/>                
                <div>
                    <label className='fw-semibold'>Street: </label>
                    <textarea type='text' className='form-control' required value={street} onChange={(e) => setStreet(e.target.value)}></textarea>
                </div><br/>
                <div>
                    <label className='fw-semibold'>City: </label>
                    <input type='text' className='form-control' required value={city} onChange={(e) => setCity(e.target.value)}/>
                </div><br/>
                <div>
                    <label className='fw-semibold'>Country: </label>
                    <input type='text' className='form-control' required value={country} onChange={(e) => setCountry(e.target.value)}/>
                </div><br/>
                <div>
                    <label className='fw-semibold'>Zipcode: </label>
                    <input type='number' className='form-control' required value={zip} onChange={(e) => setZip(e.target.value)}/>
                </div><br/>
                <div>
                    <input type='checkbox' className="fw-semibold" onChange={(e) => setIsShippingAddress(!isShippingAddress)} /> Set this as default address<br/>
                </div><br/>
                <div className='text-center'>
                    {!user  ?
                        <input type='submit' value='Register' className='btn btn-success fw-semibold text-center'/> :
                        <input type='submit' value={state.editAddress ? 'Update Address' : 'Add Address'} className='btn btn-success fw-semibold text-center'/>
                    }                    
                </div>
            </form>
        </main>
    )
}

export default UserForm