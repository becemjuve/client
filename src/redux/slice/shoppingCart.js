import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const initialState = {
    cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
    total : 0,
}

const carteSlice = createSlice({
    name: "cart",
    initialState,
    
    reducers: {
        addToCart: (state, action) => {
            const targetProd = state.cartProducts.find(prod => prod._id === action.payload._id)
            if (!targetProd) state.cartProducts.push({...action.payload, count: 1 } )
            else state.cartProducts.map(prod =>{
             if (prod._id === action.payload._id) {
                if(prod.stock === targetProd.count){
                    toast(`sorry we have only ${prod.stock} pieces left`, {type:"error"})
                } else prod.count += 1
        }
        })
        state.total = state.cartProducts.reduce((acc,prod) => acc  +  prod.count * prod.price,0)
        localStorage.setItem("cart", JSON.stringify(state.cartProducts))
            
        },
        deleteFromCart: (state, action) =>{
            state.cartProducts = state.cartProducts.filter(prod => prod._id!== action.payload._id)

            state.total = state.cartProducts.reduce((acc,prod) => acc  +  prod.count * prod.price,0)
            localStorage.setItem("cart", JSON.stringify(state.cartProducts))
        },

        clearCart : (state, action) =>{
            localStorage.removeItem('cart')
            return {...state , total: 0 , cartProducts: []}
        } ,
        // Get total
        getTotal: (state, action) => {
            state.total = state.cartProducts.reduce((acc,prod) => acc  +  prod.count * prod.price,0)
        },
        // Inc count
        incCount : (state, action) =>{
            state.cartProducts.map(prod =>{
                if (prod._id === action.payload._id) {
                    if(prod.stock === action.payload.count){
                        toast(`sorry we have only ${prod.stock} pieces left`, {type:"error"})
                    } else prod.count += 1
                }
            })
            state.total = state.cartProducts.reduce((acc,prod) => acc  +  prod.count * prod.price,0)
            localStorage.setItem("cart", JSON.stringify(state.cartProducts))
        },
        decCount : (state,action) =>{
            state.cartProducts.map(prod =>{
                if (prod._id === action.payload._id && prod.count > 1) {
                    prod.count -= 1
                }
            })
            state.total = state.cartProducts.reduce((acc,prod) => acc  +  prod.count * prod.price,0)
            localStorage.setItem("cart", JSON.stringify(state.cartProducts))
        }  
        
    }
})
export default carteSlice.reducer
export const {addToCart, deleteFromCart, clearCart, getTotal, incCount, decCount} = carteSlice.actions
