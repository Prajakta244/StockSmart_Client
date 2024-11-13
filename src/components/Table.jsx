import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Header from 'components/Header'
import { Box, useTheme, Button } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

const Table = ({ title, subtitle, columns, data, setSelectedRow, snackBarData, isLoading, hideColumn, actionButton }) => {
    const theme = useTheme()
    return (
        <Box m='1.5rem 2.5rem'>
            <Snackbar
                open={snackBarData.snackBarOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                // TransitionComponent={Slide}
                message={snackBarData.message}
                key={'top' + 'right'}
                autoHideDuration={5000}
                onClose={snackBarData.handleClose}
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 2 }} >
                <Box sx={{ gridColumn: "span 10" }}>
                    <Header title={title} subtitle={subtitle} />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                    {actionButton}
                </Box>
            </Box>
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
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                // Hide column product_id, the other columns will remain visible
                                ...hideColumn
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    // checkboxSelection
                    loading={isLoading || !data?.data}
                    rows={data?.data || []}
                    columns={columns}
                    // getRowId={(row) => row.id}
                    rowsPerPageOptions={[4, 8, 10]}
                    disableColumnMenu
                    // selectionModel={select}
                    onRowSelectionModelChange={(newSelection, det) => {
                        console.log('newselection', det.api.getSelectedRows().get(newSelection[0]), newSelection)
                        setSelectedRow(det.api.getSelectedRows().get(newSelection[0]));
                    }}
                />
            </Box>
        </Box>
    )
}

export default Table