import { useSelector } from "react-redux"

const OrderDetails = () => {
    const {user} = useSelector(state => state.user)
    return (
        <div className='container'>
            <h2>Order Details</h2>

        </div>
    )
}

export default OrderDetails