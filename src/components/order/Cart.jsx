import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import CartList from "../products/CartList"
import { postUser } from "../user/userSlice"

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cartProducts = [], totalCartAmount, cartDiscount, deliveryCharge } = useSelector(state => state.productCard)
    const {user, status, error} = useSelector(state => state.user)

    const totalItems = cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)

    const checkoutHandler = async () => {
        if(!user){
           await navigate('/user/userForm')
        }
        else{
            await navigate('/order')
        }
    }

    return (
        <main className='container text-center py-5' style={{ color: "#224d43" }}>
            <h5 className="fw-bold">My Cart ({totalItems})</h5>
            <hr/>
            {cartProducts.length === 0 ? 
                (
                <div>
                    <p>Your Cart is empty.</p>    
                    <div className='text-center'>
                        <Link className='btn btn-outline-success rounded-pill px-auto fw-semibold' to='/products'>EXPLORE OUR PRODUCTS</Link>
                    </div>
                </div>) :
                (
                    <div className='row '>
                        <div className='col-8'>
                            <CartList />
                        </div>
                        <div className='col-4'>
                            <div className='container card text-start' style={{ color: "#224d43" }}>
                                <p className='mt-2 fw-bold'>PRICE DETAILS</p>
                                <hr/>
                                <section>
                                    <div className='d-flex justify-content-between'>
                                    <p>Price ({totalItems} item{totalItems === 1 ? '' : 's'}) </p>
                                        <p>₹{totalCartAmount}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                    <p>Discount </p>
                                    <p>₹{cartDiscount}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                    <p>Delivery Charges</p>
                                    <p>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</p>
                                    </div>
                                </section>
                                <hr/>
                                <div className='d-flex justify-content-between fw-bold'>
                                    <p>TOTAL AMOUNT</p>
                                    <p>₹{totalCartAmount + deliveryCharge - cartDiscount}</p>
                                </div>
                                <hr/>
                                <p>You will save ₹{cartDiscount} on this order.</p>
                                <button 
                                    onClick={() => checkoutHandler()}
                                    style={{backgroundColor: '#8b5e3c'}}
                                    className='btn text-light mt-1 mb-3 rounded-pill fw-bold'>PLACE ORDER</button>
                            </div>
                        </div>
                    </div>
                )
            }            
        </main>
    )
}

export default Cart