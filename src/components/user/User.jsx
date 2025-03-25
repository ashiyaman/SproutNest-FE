import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const User = () => {
    const {user} = useSelector((state) => state.user)
    return(
        <main className='container py-4' style={{color: '#224d43'}}>
            <h3>Welcome {user.name}</h3>
            <hr/>
            {user.phoneNo && 
                <p>Phone No: {user.phoneNo}</p>
            }
            <h5 className='py-2'>Addresses:</h5>
            {user.addresses && user.addresses.map(address => {
            return (
                <div key={address._id} className='card container py-4' style={{color: '#224d43'}}>
                    <p>Default: {address.addressType}</p>
                    <p className='fw-semibold'>{user.name}</p>
                    <p>{address.street}, {address.city}, {address.country}, {address.zip}</p>
                    <div className='d-flex justify-content-around'>
                        <Link className='btn btn-outline-success fw-bold rounded-pill my-2' to='/userForm'>Edit</Link>
                        <Link className='btn btn-outline-danger fw-bold rounded-pill my-2' to='/userForm'>Delete</Link>
                    </div>
                </div>
                )})
            }
        </main>
    )
}

export default User