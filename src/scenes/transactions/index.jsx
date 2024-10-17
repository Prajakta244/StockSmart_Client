import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import { useGetTransactionsQuery } from 'state/api'
import { Box,  useTheme } from '@mui/material'

const Transitions = () => {
    const theme = useTheme()
    const [page,setPage] = useState(0)
    const [pageSize,setPageSize] = useState(20)
    const [sort,setSort] = useState({})
    const [search,setSearch] = useState('')
    const {data,isLoading,refetch} = useGetTransactionsQuery()
    useEffect(()=>{
        refetch()
    },[])
    console.log(data)
    const columns = [
        {
            field:'product_id',
            headerName:'Product ID',
            flex:1
        },
        {
            field:'quantity_sold',
            headerName:'Quantity',
            flex:1
        },
        {
            field:'sale_price',
            headerName:'Sale Price',
            flex:1
        },
        {
            field:'measure_unit',
            headerName:'Measure Unit',
            flex:1
        },
        {
            field:'measure',
            headerName:'Measure',
            flex:1
        },
        {
            field:'date',
            headerName:'Date',
            flex:1
        },
        {
            field:'profit',
            headerName:'Profit',
            flex:1
        }
    ]

  return (
    <Box m='1.5rem 2.5rem'>
        <Header title='Transactions' subtitle='List of transactions'/>
        <Box
             mt="40px"
             height="75vh"
             sx={{
               "& .MuiDataGrid-root": {
                 border: "none",
               },
               "& .MuiDataGrid-cell": {
                 borderBottom: "none",
               },
               "& .MuiDataGrid-columnHeaders": {
                 backgroundColor: theme.palette.background.alt,
                 color: theme.palette.secondary[100],
                 borderBottom: "none",
               },
               "& .MuiDataGrid-virtualScroller": {
                 backgroundColor: theme.palette.primary.light,
               },
               "& .MuiDataGrid-footerContainer": {
                 backgroundColor: theme.palette.background.alt,
                 color: theme.palette.secondary[100],
                 borderTop: "none",
               },
               "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                 color: `${theme.palette.secondary[200]} !important`,
               },
             }}
        >
            <DataGrid
                loading={isLoading || !data?.data}
                rows={data?.data || []}
                columns={columns}
                getRowId={(row)=>row.id}
                rowsPerPageOptions={[4, 8, 10]}
            />
        </Box>
    </Box>
  )
}

export default Transitions