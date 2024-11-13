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
        deleteproduct:builder.mutation({
            query:({id})=>({
                url:`deleteproduct/?product_id=${id}`,
                method: 'DELETE'
            })
        }),
        getTransactions:builder.query({
            query:()=>`get_sales`,
            providesTags:["Transactions"]
        }),
        postSale:builder.mutation({
            query:(body)=>({
                url:`addsale`,
                method: 'POST',
                body
            })
        }),
        deleteSale:builder.mutation({
            query:({id})=>({
                url:`deletesale/?sale_id=${id}`,
                method: 'DELETE'
            })
        }),
        updateSale:builder.mutation({
            query:({id,body})=>({
                url:`updatesale/?sale_id=${id}`,
                method: 'PUT',
                body
            })
        }),
        getExpense:builder.query({
            query:()=>`get_expenses`,
            providesTags:["Expenses"]
        }),
        postExpense:builder.mutation({
            query:(body)=>({
                url:`addexpense`,
                method: 'POST',
                body
            })
        }),
        deleteExpense:builder.mutation({
            query:({id})=>({
                url:`deleteexpense/?expense_id=${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useGetUserQuery, useGetProductQuery,usePostProductMutation,useUpdateProductMutation,useGetTransactionsQuery,usePostSaleMutation,useDeleteSaleMutation,useUpdateSaleMutation,useGetExpenseQuery,usePostExpenseMutation,useDeleteExpenseMutation,useDeleteproductMutation
} = api