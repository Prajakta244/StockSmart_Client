import React from 'react'
import Grid from '@mui/material/Grid2';
import { TextField, Button, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import FlexBetween from './FlexBetween';
import { useGetExpenseQuery, usePostExpenseMutation } from 'state/api';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/de';
import { format } from 'date-fns'
import * as Yup from 'yup'
import dayjs from 'dayjs';

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
  const [validationErrorObj, setValidationErr] = useState({
    description: '',
    amount: '',
    date: ''
  })
  const validationSchema = Yup.object({
    description: Yup.string().matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed.").required('Required'),
    amount: Yup.number().typeError('Amount must be a number.').required('Required'),
    date: Yup.date().required()
  })
  const [formData, setFormData] = useState({
    amount: 0,
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    description: ''
  });
  const [postExpense] = usePostExpenseMutation();
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const expenseData = formData;
      const validations = await validationSchema.validate(expenseData, { abortEarly: false })
      let msg = ''
      console.log('expense data', expenseData)
      const res = await postExpense(expenseData)
      console.log(res?.data)
      if (res?.data?.status == 'success') {
        msg = 'Expense added successfuly!!'
        refetch()
      } else {
        msg = 'Something went wrong!!! Try again later.'
      }
      setMessage(msg)
      console.log(closeForm)
      setSnackBarOpen({
        ...isSnackBarOpen,
        open: true,
        Transition: SlideTransition,
      })
    } catch (e) {
      let msg = 'Something went wrong!!! Try again later.'
      setSnackBarOpen({
        ...isSnackBarOpen,
        open: true,
        Transition: SlideTransition,
      })
      if (e?.inner) {
        msg = 'Validation failed. Please check the form fields and correct any errors.'
        const errObj = {}
        e.inner.forEach(errorObj => {
          errObj[errorObj['path']] = errorObj.errors[0]
        })
        setValidationErr(errObj)
      }
      setMessage(msg)
      console.error(`Error occured while adding transaction ${e}`)
    }
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
              error={validationErrorObj.description}
              type="text"
              variant="outlined"
              label="Description"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value })
                setValidationErr({ ...validationErrorObj, description: '' })
              }
              }
              helperText={validationErrorObj.description}
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
              error={validationErrorObj.amount}
              type="text"
              variant="outlined"
              label="Amount"
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value })
                setValidationErr({ ...validationErrorObj, amount: '' })
              }
              }
              helperText={validationErrorObj.amount}
            ></TextField>
          </Grid>
          <Grid
            size={5}
            sx={{
              display: "flex",
              ml: '20px',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
              <DatePicker defaultValue={dayjs(new Date())} error={validationErrorObj.date} format="DD/MM/YYYY" onChange={(date) => setFormData({ ...formData, date: format(date['$d'], 'yyyy-MM-dd') })} />
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