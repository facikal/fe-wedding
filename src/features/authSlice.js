import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  messege: "",
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, {
      email: user.email,
      password: user.password
    })
    return response.data
  } catch (error) {
    if (error.response) {
      const messege = error.response.data.msg
      return thunkAPI.rejectWithValue(messege);
    }
  }
})

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/me`)
    return response.data
  } catch (error) {
    if (error.response) {
      const messege = error.response.data.msg
      return thunkAPI.rejectWithValue(messege);
    }
  }
})

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete(`${process.env.REACT_APP_BASEURL}/logout`)
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.messege = action.payload;
    })


    //get user login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.messege = action.payload;
    })
  }
});

export const { reset } = authSlice.actions
export default authSlice.reducer;