import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SPROUTNEST_URI = "http://localhost:3000";

export const registerNewUser = createAsyncThunk("user/register", async(userData) => {
  const response = await axios.post(`${SPROUTNEST_URI}/v1/user/register`, userData)
  return response.data
})

export const getUser = createAsyncThunk("user/fetch", async () => {
  const response = await axios.get(`${SPROUTNEST_URI}/user`);
  return response.data;
});

export const postUser = createAsyncThunk("user/post", async (userData) => {
    console.log('user databefore saving..............', userData)
  const response = await axios.post(`${SPROUTNEST_URI}/user`, userData);
  return response.data;
});

export const postAddress = createAsyncThunk(
  "user/address/post",
  async (addressData) => {
    console.log('adding another addr..............222............', addressData)
    const response = await axios.post(
      `${SPROUTNEST_URI}/v1/${addressData.user._id}/address`,
      addressData
    );
    console.log('adding another addr..............33333............', response.data)
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "user/address/update",
  async (addressData) => {
    const response = await axios.post(
      `${SPROUTNEST_URI}/${state.user._id}/${addressData._id}`,
      addressData
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({user, addressData}) => {
    const response = await axios.delete(
      `${SPROUTNEST_URI}/${user._id}/${addressData._id}`
    );
    return response.data;
  }
);

export const setShippingAddress = createAsyncThunk(
  "address/update",
  async (addressData) => {
    const response = await axios.post(
      `${SPROUTNEST_URI}/${state.user._id}/${addressData._id}`
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        (state.user = action.payload), (state.status = "success");
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state, action) => {
        console.log('...add user.........after success............', action.payload)
        state.user = action.payload,
        state.status = "success"
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(postAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAddress.fulfilled, (state, action) => {
        console.log('....in xtra reducer...success................', action.payload)
        state.user = action.payload
        state.status = "success";
      })
      .addCase(postAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = "success";
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        console.log('...exyra dreducer.......delete successssssssssssss.......................', action.payload)
        state.user = action.payload
        state.status = "success";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(registerNewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        console.log('...exyra dreducer.......new user reggggggggggggggggggggggggggggggg successssssssssssss.......................', action.payload)
        state.user = action.payload
        state.status = "success";
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});
