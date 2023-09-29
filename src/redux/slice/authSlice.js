import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { toast } from "react-toastify";
// initiale state
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLoggedIn: false,
  user: null,
  token: localStorage.getItem("token") || null,
};

//registre handler async handler

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseUrl + "users/signup", user);
      localStorage.setItem("token", res.data.token);
      toast(`welcome ${res.data.user.firstName} in our website`, {
        type: "success",
      });
      return res.data;
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// login handler asuyc handler

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseUrl + "users/login", credentials);
      localStorage.setItem("token", res.data.token);
      toast(`Welcome back, ${res.data.user.firstName}!`, { type: "success" });
      return res.data;
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
      return rejectWithValue(error.response.data.message);
    }
  }
);

//get profile async handler
export const getProfile = createAsyncThunk('auth/getProfile',async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(baseUrl + "users/profile", {
        headers: {
          "x-auth": localStorage.getItem('token'),
        },
      })
      return res.data;
    } catch (error) { 
      toast(error.response.data.message, { type: 'error' });
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update a profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async(user, {rejectWithValue})=>{
  try {
      const res = await axios.put(baseUrl + 'users/update', user,{ 
        headers: {
        "x-auth": localStorage.getItem('token'),
      },})
        toast(res.data.message, {type:"success"})
        return res.data

  } catch (error) {
    console.log(error)
    toast(error.response.data.message, { type: 'error' });
    return rejectWithValue(error.response.data.message);
  }
})

//auth slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state)=>{
      localStorage.clear('token');
      return{
      ...state,
      isLoading: false,
      isError:false,
      isSuccess:false,
      user:null,
      isLoggedIn:false
  }
        
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false, 
          isError: false
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isSuccess: true,
          user: action.payload.user,
          token: action.payload.token,
          message: action.payload.message,
          isLoggedIn: true,
        };
      })
      .addCase(register.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
        };
      })
      // login Case
      .addCase(login.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false,
          isError: false,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isError: false,
          user: action.payload.user,
          token: action.payload.token,
          message: "",
          isLoggedIn: true,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
          message: action.error.message || "An error occurred during login",
        };
      })
      // Get Profile 
      .addCase(getProfile.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false,
          isError: false,
        };
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isError: false,
          user: action.payload,
          message: "",
          isLoggedIn: true,
        };
      })
      .addCase(getProfile.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
          message: action.error.message || "An error occurred while fetching the profile",
        };
      })
      // Update Profile
      .addCase(updateProfile.pending,(state, action) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false,
           isError: false
        }
      })
      .addCase(updateProfile.fulfilled,(state,action) =>{
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isError: false,
          user: action.payload.newUser,
          message: action.payload.message,
        }
      })
      .addCase(updateProfile.rejected,(state, action)=>{
        return {
          ...state,
          isError:true,
          isSuccess: false, 
          isLoading: false
        }
      })
  },
});
export default authSlice.reducer;
export const {logout} = authSlice.actions
