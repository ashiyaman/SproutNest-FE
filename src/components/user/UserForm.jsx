import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { postUser, postAddress, getUser } from "./userSlice"

const UserForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)

    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [zip, setZip] = useState('')
    const [addressType, setAddressType] = useState('Home')

     useEffect(() => {
        dispatch(getUser())
    }, [])

    const userRegHandler = async(e) => {
        e.preventDefault()
        if(!user){
            console.log('....in not user...')
            const user = {
                name: name,
                designation: designation,
                phoneNo: phoneNo,
                street: street,
                city: city,
                country: country,
                zip: zip,
                addressType: addressType
            }
            await dispatch(postUser(user))
        }
        else{
            console.log('....in else.....')
            const address = {
                userId: user._id,
                phoneNo: phoneNo,
                street: street,
                city: city,
                country: country,
                zip: zip,
                addressType: addressType
            }
            await dispatch(postAddress(address))
        }   
        navigate('/user')  
    }
    
    return(
        <main className='container py-4'>
            <form style={{color: '#224d43'}} onSubmit={(e) => userRegHandler(e)}>
                <h3 className='fw-bold py-4'>User Profile</h3>
                {!user  &&
                <>
                    <div>
                        <label className='fw-semibold'>Name: </label>
                        <input type='text' required onChange={(e) => setName(e.target.value)} className='form-control'/>
                    </div><br/>
                    <div>
                        <label className='fw-semibold'>Designation: </label>
                        <input type='text' onChange={(e) => setDesignation(e.target.value)} className='form-control'/>
                    </div><br/>
                    </>
                }
                <div>
                    <label className='fw-semibold'>Phone No: </label>
                    <input type='text' className='form-control' onChange={(e) => setPhoneNo(e.target.value)}/>
                </div><br/>                
                <div>
                    <label className='fw-semibold'>Street: </label>
                    <textarea type='text' className='form-control' required onChange={(e) => setStreet(e.target.value)}></textarea>
                </div><br/>
                <div>
                    <label className='fw-semibold'>City: </label>
                    <input type='text' className='form-control' required onChange={(e) => setCity(e.target.value)}/>
                </div><br/>
                <div>
                    <label className='fw-semibold'>Country: </label>
                    <input type='text' className='form-control' required onChange={(e) => setCountry(e.target.value)}/>
                </div><br/>
                <div>
                    <label className='fw-semibold'>Zipcode: </label>
                    <input type='number' className='form-control' required onChange={(e) => setZip(e.target.value)}/>
                </div><br/>
                <div>
                    <label className='fw-semibold'>Address Type</label><br/>
                    <input type='radio' onChange={(e) => setAddressType(e.target.value)} name='addressType' value='Home'/> Home<br/>
                    <input type='radio' onChange={(e) => setAddressType(e.target.value)}  name='addressType' value='Work'/> Work<br/>
                    <input type='radio' onChange={(e) => setAddressType(e.target.value)}  name='addressType' value='Other'/> Other<br/>
                </div>
                <div className='text-center'>
                    {!user  ?
                        <input type='submit' value='Register' className='btn btn-success fw-semibold text-center'/> :
                        <input type='submit' value='Add Address' className='btn btn-success fw-semibold text-center'/>
                    }                    
                </div>
            </form>
        </main>
    )
}

export default UserForm