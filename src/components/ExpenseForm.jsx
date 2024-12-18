import React from 'react'
import Grid from '@mui/material/Grid2';
import { FormControl, Box } from '@mui/material';
import { TextField, Button, FormLabel, NativeSelect, Select, MenuItem, InputLabel,Typography,useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import FlexBetween from './FlexBetween';
import { useDeleteExpenseMutation,useGetExpenseQuery,usePostExpenseMutation } from 'state/api';
import { useDispatch } from 'react-redux'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/de';
import { format } from 'date-fns'


const ExpenseForm = ({ closeForm }) => {
    const theme = useTheme();
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }
    const [isSnackBarOpen, setSnackBarOpen] = useState({
        open: false,
        Transition: Slide,
        vertical: 'top', horizontal: 'right'
    });
    const { vertical, horizontal, open } = isSnackBarOpen;
    const { data, isLoading, error, refetch } = useGetExpenseQuery();
    const [formData, setFormData] = useState({
        amount: 0,
        date: '',
        description: ''
    });
    const [postExpense] = usePostExpenseMutation();
    const unitList = process.env.REACT_APP_UNIT?.split(',')
    console.log("unitList", unitList);
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const expenseData = formData;
        console.log('expense data', expenseData)

        postExpense(expenseData)
            .unwrap()
            .then(() => {
                console.log('enqueueSnackbar')
                setMessage('Expense added successfuly!!')
                setSnackBarOpen({
                    ...isSnackBarOpen,
                    open: true,
                    Transition: SlideTransition,
                })
                refetch();
            })
            .catch((e) => console.log(e));

        console.log("formData " + formData);
        // closeForm()
    };


    return (
        <form onSubmit={handleSubmit}>
            <Snackbar
                open={isSnackBarOpen.open}
                anchorOrigin={{ vertical, horizontal }}
                TransitionComponent={isSnackBarOpen.Transition}
                message={message}
                key={vertical + horizontal}
                autoHideDuration={1200}
            />
            <FlexBetween sx={{ m: 5 }}>
                <Grid container spacing={2}>
                <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 30 }}
              color={theme.palette.secondary[400]}
              gutterBottom
            >
              Add Expense
            </Typography>
          </Grid>
                    <Grid
                        size={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            label="Description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        ></TextField>
                    </Grid>
                    <Grid
                        size={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            label="Amount"
                            value={formData.amount}
                            onChange={(e) =>
                                setFormData({ ...formData, amount: e.target.value })
                            }
                        ></TextField>
                    </Grid>
                    <Grid
                        size={5}
                        sx={{
                            display: "flex",
                            ml:'20px',
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker format="DD/MM/YYYY" onChange={(date) => setFormData({ ...formData, date: format(date['$d'], 'yyyy-MM-dd') })}/>
                        </LocalizationProvider>

                    </Grid>
                    <Grid
            size={6}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          ></Grid>
                    <Grid
            size={6}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <Button variant="outlined" color="secondary" type="submit">
              Save
            </Button>
          </Grid>
          <Grid
            size={6}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Button variant="outlined" color="secondary" onClick={closeForm}>
              Close
            </Button>
          </Grid>
                </Grid>
            </FlexBetween>
        </form>
    );
}

export default ExpenseForm