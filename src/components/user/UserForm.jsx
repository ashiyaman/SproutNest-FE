import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { postUser, postAddress, getUser, updateAddress } from "./userSlice"

const UserForm = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useSelector(state => state.user)

    const state = location.state || {}
    

    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [phoneNo, setPhoneNo] = useState(state?.editAddress ? state.editAddress.phoneNo : '')
    const [street, setStreet] = useState(state?.editAddress ? state.editAddress.street : '')
    const [city, setCity] = useState(state?.editAddress ? state.editAddress.city : '')
    const [country, setCountry] = useState(state?.editAddress ? state.editAddress.country : '')
    const [zip, setZip] = useState(state?.editAddress ? state.editAddress.zip : '')
    const [addressType, setAddressType] = useState(state?.editAddress ? state.editAddress.addressType : '')
    const [isDefault, setIsDefault] = useState(state?.editAddress ? state.editAddress.isDefault : '')

     useEffect(() => {
        dispatch(getUser())
    }, [])

    const userRegHandler = async (e) => {
        e.preventDefault();
        
        const editAddress = location.state?.editAddress || null; // ✅ Fix
    
        let addressData = {
            phoneNo, street, city, country, zip, addressType, isDefault
        };
    
        if (isDefault) {
            const updatedAddresses = user.addresses.map(addr => ({
                ...addr,
                isDefault: false
            }));
            updatedAddresses.push(addressData);
    
            for (const addr of updatedAddresses) {
                await dispatch(updateAddress({ addressId: addr._id, addressToUpdate: addr }));
            }
        }
    
        if (editAddress) {
            await dispatch(updateAddress({ addressId: editAddress._id, addressToUpdate: addressData }));
        } else {
            addressData.userId = user._id;
            await dispatch(postAddress(addressData));
        }
    
        navigate('/user');
    };
    
    return(
        <main className='container py-4'>
            <form style={{color: '#224d43'}} onSubmit={(e) => userRegHandler(e)}>
                <h3 className='fw-bold py-4'>User Profile</h3>
                {!user  &&
                <>
                    <div>
                        <label className='fw-semibold'>Name: </label>
                        <input type='text' required onChange={(e) => setName(e.target.value)} value={name} className='form-control'/>
                    </div><br/>
                    <div>
                        <label className='fw-semibold'>Designation: </label>
                        <input type='text' onChange={(e) => setDesignation(e.target.value)} className='form-control'/>
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
                    <label className='fw-semibold'>Address Type</label><br/>
                    <input type='radio' onChange={(e) => setAddressType(e.target.value)} name='addressType' value='Home'/> Home<br/>
                    <input type='radio' onChange={(e) => setAddressType(e.target.value)}  name='addressType' value='Work'/> Work<br/>
                    <input type='radio' onChange={(e) => setAddressType(e.target.value)}  name='addressType' value='Other'/> Other<br/>
                </div><br/>
                <div>
                    <input type='checkbox' onChange={() => setIsDefault(!isDefault)} className='form-check-input mx-1'/>
                    <label> Set as Default</label>
                </div>
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