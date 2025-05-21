import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SPROUTNEST_URI = 'http://localhost:3000'

//const SPROUTNEST_URI = 'https://sprout-nest-be.vercel.app'

export const getUser = createAsyncThunk('user/fetch',
    async() => {
        const response = await axios.get(`${SPROUTNEST_URI}/user`)
        console.log('...get user in resp..............', response)
        return response.data
    }
)

export const getAddresses = createAsyncThunk('addresses/fetch', 
    async() => {
        const response = await axios.get(`${SPROUTNEST_URI}/${state.user._id}/addresses`)
        console.log('......all addresses...........', response.data)
        return response.data
    }
)

export const postAddress = createAsyncThunk(`user/address/post`,
    async(address) => {
        console.log('...in user slice post address....', address)
        const response = await axios.put(`${SPROUTNEST_URI}/user/address`, address)
        console.log('in respo......', response.data)
        return response.data
    }
 )

 export const postUser = createAsyncThunk(`user/post`,
    async(userProfile) => {
        console.log('....we are in put...............', userProfile)
        const response = await axios.post(`${SPROUTNEST_URI}/user`, userProfile)
        console.log('................response in put..........', response.data)
        return response.data
    }
 )

 export const updateAddress = createAsyncThunk(
    'user/address/update',
    async ({ addressId, addressToUpdate }) => {
        const response = await axios.put(`${SPROUTNEST_URI}/user/address/${addressId}`, addressToUpdate);
        return response.data;
    }
);


 export const deleteAddress = createAsyncThunk('user/delete',
    async({userId, addressId}) => {
        const response = await axios.delete(`${SPROUTNEST_URI}/user/address/${addressId}`, {data: {userId}})
        return response.data
    }
 )

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: null,
        userAddresses: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.userAddresses = state.userAddresses.map(address => {
                (address._id === action.payload._id) ? [...action.payload, {isShippingAddress: true}] :
                [...address, {isShippingAddress: false}]
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, state => {
                state.status = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'success'
            })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.error
                state.status = 'error'
            })
            .addCase(getAddresses.pending, state => {
                state.status = 'loading'
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.userAddresses = action.payload
                state.status = 'success'
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.error = action.error
                state.status = 'error'
            })
            .addCase(postUser.pending, state => {
                state.status = 'loading'
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'success'
            })
            .addCase(postUser.rejected, (state, action) => {
                state.error = action.error
                state.status = 'error'
            })
            .addCase(postAddress.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postAddress.fulfilled, (state, action) => {
                state.userAddresses = [...state.userAddresses, action.payload]
                if(!state.shippingAddress) state.shippingAddress = action.payload
                state.status = 'success'
            })
            .addCase(postAddress.rejected, (state, action) => {
                state.status = 'error'
            })
            .addCase(updateAddress.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.userAddresses = [...state.userAddresses, action.payload]
                state.status = 'success'
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.status = 'error'
            })
            .addCase(deleteAddress.pending, state => {
                state.status = 'loading'
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.user.addresses = state.user.addresses.filter(address => address._id !== action.payload._id)
                state.status = 'success'
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.error = action.error
                state.status = 'error'
            })
    }
})

export const { setShippingAddress } = userSlice.actions

export default userSlice.reducer 