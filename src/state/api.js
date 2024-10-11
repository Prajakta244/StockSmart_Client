import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery:fetchBaseQuery({baseUrl:process.env.REACT_APP_BASE_URL}),
    reducerPath:"adminApi",
    tagTypes:["User","Products"],
    endpoints:(builder) =>({
        getUser:builder.query({
            query:(id)=>`general/user/${id}`,
            providesTags:["User"]
        }),
        getProduct:builder.query({
            query:()=>`fetchproducts`,
            providesTags:["Products"]
        }),
        postProduct:builder.mutation({
            query:(body)=>({
                url:`addproduct`,
                method: 'POST',
                body
            })
        }),
        updateProduct:builder.mutation({
            query:({id,body})=>({
                url:`updateproduct/?product_id=${id}`,
                method: 'PUT',
                body
            })
        }),
    })
})

export const {
    useGetUserQuery, useGetProductQuery,usePostProductMutation,useUpdateProductMutation
} = api