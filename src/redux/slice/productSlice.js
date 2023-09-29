import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../baseUrl";
import { toast } from "react-toastify";


const initialState = {
    isLoading : false,
    isSuccess: false,
    isError: false,
    products: [],
    product: {}
}

//add Product Handler
export const addProduct = createAsyncThunk("products/add",async(product, {rejectWithValue})=>{
    try {
        const res = await axios.post(baseUrl + 'products/new',product,{
            headers: {
                "x-auth": localStorage.getItem('token'),
              },
        })
        toast(res.data.message, {type:"success"})
        return res.data;
    } catch (error) {
        toast(error.response.data.message, { type: 'error' });
      return rejectWithValue(error.response.data.message);
    }
})

// Get all products handler
export const getAllProducts = createAsyncThunk("products/getAll", async(_, {rejectWithValue})=>{
    try {
        const res = await axios.get(baseUrl + "products/all")
        return res.data;
    } catch (error) {
        toast(error.response.data.message, { type: 'error' });
        return rejectWithValue(error.response.data.message);
    }
})
// Delete all Products
export const deleteProduct = createAsyncThunk("products/delete", async(id, {rejectWithValue})=>{
    try {
        const res = await axios.delete(baseUrl + "products/" + id,{
            headers: {
                "x-auth": localStorage.getItem('token'),
              },
        })
        toast(res.data.message, {type:"success"})
        return res.data
    } catch (error) {
        toast(error.response.data.message, { type: 'error' });
        return rejectWithValue(error.response.data.message);
    }
})

// Get One Product 
export const getOneProduct = createAsyncThunk("products/getOneProduct",async(id, {rejectWithValue})=>{
  try {
    const res = await axios.get(baseUrl + "products/" + id)
    return res.data

  } catch (error) {
    toast(error.response.data.message, { type: 'error' });
    return rejectWithValue(error.response.data.message);
  }
})
//Update One product

export const updateProduct = createAsyncThunk("products/update",async(product, {rejectWithValue})=>{
    try {
        const res = await axios.put(baseUrl + "products/" + product.id,product,{
            headers: {
                "x-auth": localStorage.getItem('token'),
              },
        })
        toast(res.data.message, {type:"success"})
        return res.data
    } catch (error) {
        toast(error.response.data.message, { type: 'error' });
        return rejectWithValue(error.response.data.message);
    }
})




const producSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      searchProduct: (state,action)=>{
        state.products= state.products.filter(prod=>prod.name.toLowerCase().includes(action.payload))
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addProduct.pending, (state) => {
            return {...state,
            isLoading: true,
            isSuccess: false,
            isError: false,
            }
          })
          .addCase(addProduct.fulfilled, (state, action) => {
            return {...state, isLoading: false, isSuccess: true, isError: false}
          })
          .addCase(addProduct.rejected, (state, action) => {
            return {...state, isLoading: false, isSuccess: false, isError: true}
          })
          //get all product
          .addCase(getAllProducts.pending, (state) => {
            return {...state, isLoading:true, isSuccess: false, isError: false}
          })
          .addCase(getAllProducts.fulfilled, (state, action) =>{
            return {...state, isLoading:false, 
                isSuccess: true,
                isError: false,
                 products: action.payload.products}
          })
          .addCase(getAllProducts.rejected, (state)=>{
            return {...state, isLoading:false, isSuccess: false, isError: true}
          })
          //delete product
          .addCase(deleteProduct.pending, (state)=>{
            return {...state, isLoading:true, isSuccess: false, isError: false}
          })
          .addCase(deleteProduct.fulfilled, (state)=>{
            return {...state, isLoading:false, isSuccess: true, isError: false}
          })
          .addCase(deleteProduct.rejected, (state)=>{
            return {...state, isLoading:false, isSuccess: false, isError: true}
          })
          //get one product
          .addCase(getOneProduct.pending, (state)=>{
            return {...state, isLoading:true, isSuccess: false, isError: false}
          })
          .addCase(getOneProduct.fulfilled, (state, action)=>{
            return {...state, isLoading:false, isSuccess: true, isError: false, product: action.payload.product}
          })
          .addCase(getOneProduct.rejected, (state, action)=>{
            return {...state, isLoading:false, isSuccess: false, isError: true}
          })
          //Update One product
          .addCase(updateProduct.pending, (state)=>{
           return {...state, isLoading:true, isSuccess: false, isError: false}
           })
          .addCase(updateProduct.fulfilled, (state, action)=>{
            return {...state, isLoading:false, isSuccess: true, isError: false, product: action.payload.product}
           })
          .addCase(updateProduct.rejected, (state)=>{
            return {...state, isLoading:false, isSuccess: false, isError: true}
           })
    }
})



export default producSlice.reducer
export const {searchProduct} = producSlice.actions