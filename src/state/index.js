import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: "63701cc1f03239c72c000180",
    token: null,
    posts: [],
    product:{
        productName: "",
        quantity: "",
        pricePerUnit: "",
        costPerUnit: "",
        supplierName: "",
        measure: "",
      }
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setProduct: (state, action) => {
            state.product = action.payload
            // console.log('action',action)
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state,action) => {
            if(state.user){
                state.user.friends = action.payload.friends
            }else{
                console.log('User friends does not exists')
            }
        },
        setPosts : (state,action) => {
            state.posts = action.payload.posts
        },
        setPost : (state,action) => {
            const updatedPost = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post
                return post
            })
            state.posts = updatedPost
        }
    },
})

export const {setMode,setProduct,setLogout,setPosts,setPost,setFriends} = globalSlice.actions
export default globalSlice.reducer