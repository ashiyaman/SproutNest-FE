import { useState } from "react"
import { useDispatch } from "react-redux"
import { postUser } from "./userSlice"

const UserForm = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [zip, setZip] = useState('')

    const userRegHandler = (e) => {
        console.log('...form submit')
        e.preventDefault()
        const user = {
            name: name,
            designation: designation,
            phoneNo: phoneNo,
            street: street,
            city: city,
            country: country,
            zip: zip
        }
        console.log('user...', user)
        dispatch(postUser(user))
    }
    
    return(
        <main className='container py-4'>
            <form style={{color: '#224d43'}} onSubmit={(e) => userRegHandler(e)}>
                <h3 className='fw-bold py-4'>User Form</h3>
                <div>
                    <label className='fw-semibold'>Name: </label>
                    <input type='text' required onChange={(e) => setName(e.target.value)} className='form-control'/>
                </div><br/>
                <div>
                    <label className='fw-semibold'>Designation: </label>
                    <input type='text' onChange={(e) => setDesignation(e.target.value)} className='form-control'/>
                </div><br/>
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
                <div className='text-center'>
                <input type='submit' value='Register' className='btn btn-success text-center'/>
                </div>
            </form>
        </main>
    )
}

export default UserForm