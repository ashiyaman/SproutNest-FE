import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//const SPROUTNEST_URI = 'http://localhost:3000'

const SPROUTNEST_URI = 'https://sprout-nest-be.vercel.app'

export const getUser = createAsyncThunk('user/fetch',
    async() => {
        const response = await axios.get(`${SPROUTNEST_URI}/user`)
        return response.data
    }
)

export const postAddress = createAsyncThunk(`user/address/post`,
    async(address) => {
        const response = await axios.put(`${SPROUTNEST_URI}/user/address`, address)
        return response.data
    }
 )

 export const postUser = createAsyncThunk(`user/post`,
    async(userProfile) => {
        const response = await axios.post(`${SPROUTNEST_URI}/user`, userProfile)
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
        userAddress: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, state => {
                state.status = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload[0]
                state.status = 'success'
            })
            .addCase(getUser.rejected, (state, action) => {
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

export default userSlice.reducer 