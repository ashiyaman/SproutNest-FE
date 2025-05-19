import { createSlice } from "@reduxjs/toolkit";

export const loadingAlertSlice = createSlice({
  name: "loadingAlert",
  initialState: {
    loading: false,
    alert: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = null;
    },
  },
});

export const { setLoading, setAlert, clearAlert } = loadingAlertSlice.actions
export default loadingAlertSlice.reducer
