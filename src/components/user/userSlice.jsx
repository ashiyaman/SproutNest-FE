import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SPROUTNEST_URI = 'https://sprout-nest-be.vercel.app'

export const postUser = createAsyncThunk(`user/post`,
    async(userProfile) => {
        console.log('...in slice......', userProfile)
        const response = await axios.post(`${SPROUTNEST_URI}/user`, userProfile)
        console.log(response.data)
        return response.data
    }
 )

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
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
    }
})

export default userSlice.reducer 