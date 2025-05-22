import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SPROUTNEST_URI = "http://localhost:3000";

export const getUser = createAsyncThunk("user/fetch", async () => {
  const response = await axios.get(`${SPROUTNEST_URI}/user`);
  return response.data;
});

export const postUser = createAsyncThunk("user/post", async (userData) => {
  const response = await axios.post(`${SPROUTNEST_URI}/user`, userData);
  return response.data;
});

export const postAddress = createAsyncThunk(
  "user/address/post",
  async ({user, addressData}) => {
    console.log(".......post addr.......", user._id);
    const response = await axios.post(
      `${SPROUTNEST_URI}/${user._id}/address`,
      addressData
    );
    console.log(
      "...1.user slice.....post addr .......respo................",
      response.data
    );
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
    console.log("...1.user slice........update................", response.data);
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({user, addressData}) => {
    console.log('.....in delete address............', addressData)
    const response = await axios.delete(
      `${SPROUTNEST_URI}/${user._id}/${addressData._id}`
    );
    console.log("...1.user slice........delete................", response.data);
    return response.data;
  }
);

export const setShippingAddress = createAsyncThunk(
  "address/update",
  async (addressData) => {
    const response = await axios.post(
      `${SPROUTNEST_URI}/${state.user._id}/${addressData._id}`
    );
    console.log(
      "...1.user slice........set shipping addr................",
      response.data
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
        (state.user = action.payload), (state.status = "success");
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(postAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAddress.fulfilled, (state, action) => {
        console.log('....in xtra reducer.....', action.payload)
        state.user.addresses = [...state.user.addresses, action.payload];
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
        state.user = [...state.addresses, action.payload];
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
        console.log('...exyra dreducer..............................', action.payload)
        state.user.addresses = state.user.addresses.filter(
          (address) => address._id !== action.payload._id
        );
        state.status = "success";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});
