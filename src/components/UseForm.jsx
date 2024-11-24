import React from 'react'
import Grid from '@mui/material/Grid2';
import { FormControl, Box } from '@mui/material';
import { TextField, Button, FormLabel, NativeSelect, Select, MenuItem, InputLabel, useTheme, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import FlexBetween from './FlexBetween';
import { usePostProductMutation } from 'state/api';
import { setProduct } from 'state'
import { useGetProductQuery, useUpdateProductMutation } from 'state/api';
import { useDispatch } from 'react-redux'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import * as Yup from 'yup'

const UseForm = ({ closeForm, action, productData, title }) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  const [isSnackBarOpen, setSnackBarOpen] = useState({
    open: false,
    Transition: Slide,
    vertical: 'top', horizontal: 'right'
  });
  const { vertical, horizontal, open } = isSnackBarOpen;
  const { data, isLoading, error, refetch } = useGetProductQuery();
  const [formData, setFormData] = useState({
    name: productData?.name || "",
    quantity: productData?.quantity,
    unit_price: productData?.unit_price,
    cost_price: productData?.cost_price,
    supplier_name: productData?.supplier_name || "",
    measure_unit: productData?.measure_unit || "",
    measure: productData?.measure,
    id: productData?.id || ''
  });
  console.log(formData.measure_unit)
  const [postProduct] = usePostProductMutation();
  const [updateProduct] = useUpdateProductMutation()
  const unitList = process.env.REACT_APP_UNIT?.split(',')
  console.log("action", action);
  const [message, setMessage] = useState('');
  const [validationErrorObj, setValidationErr] = useState({
    name: '',
    quantity: '',
    unit_price: '',
    cost_price: '',
    supplier_name: '',
    measure_unit: '',
    measure: ''
  })
  const validationSchema = Yup.object({
    name: Yup.string().matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed.").required('Required'),
    quantity: Yup.number().typeError('Quantity must be a number.').required('Required'),
    unit_price: Yup.number().typeError('Unit price must be a number.').required('Required'),
    cost_price: Yup.number().typeError('Cost price must be a number.').required('Required'),
    supplier_name: Yup.string().matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed.").required('Required'),
    measure_unit: Yup.string().required('Required'),
    measure: Yup.string().required('Required')
  })
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(formData)
      const validations = await validationSchema.validate(formData, { abortEarly: false })
      // console.log(`validation ${validations}`)
      const productData = formData;
      if (action == 'update') {
        console.log('prodct data', productData)
        const res = await updateProduct({ id: productData.id, body: productData })

        if (res?.data?.status == 'success') {
          setMessage('Product updated successfuly!!')
          refetch()
          // closeForm()
          setSnackBarOpen({
            ...isSnackBarOpen,
            open: true,
            Transition: SlideTransition,
          })
        }
      }
      else {
        postProduct(productData)
          .unwrap()
          .then(() => {
            console.log('enqueueSnackbar')
            setMessage('Product added successfuly!!')
            setSnackBarOpen({
              ...isSnackBarOpen,
              open: true,
              Transition: SlideTransition,
            })
            refetch();
          })
          .catch((e) => alert(e));
      }
      console.log("formData " + formData);
    } catch (e) {
      let msg = 'Something went wrong!!! Try again later.'
      setSnackBarOpen({
        ...isSnackBarOpen,
        open: true,
        Transition: SlideTransition,
      })
      console.error(`Error occured while adding product`)
      if (e?.inner) {
        msg = 'Validation failed. Please check the form fields and correct any errors.'
        const errObj = {}
        e.inner.forEach(errorObj => {
          // console.log(errorObj['path'],errorObj.errors[0])
          errObj[errorObj['path']] = errorObj.errors[0]
        })
        console.log(errObj)
        setValidationErr(errObj)
        console.log(validationErrorObj)
      }
      setMessage(msg)
    }

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
        autoHideDuration={5000}
        onClose={() => {
          setSnackBarOpen({
            ...isSnackBarOpen,
            open: false,
            Transition: SlideTransition,
          })
        }}
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
              {title}
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
              error={validationErrorObj.name}
              type="text"
              variant="outlined"
              label="Product Name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                setValidationErr({ ...validationErrorObj, name: '' })
              }
              }
              helperText={validationErrorObj.name ? validationErrorObj.name : ''}
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
              error={validationErrorObj.quantity}
              type="text"
              variant="outlined"
              label="Quantity"
              value={formData.quantity}
              onChange={(e) => {
                setFormData({ ...formData, quantity: e.target.value })
                setValidationErr({ ...validationErrorObj, quantity: '' })
              }
              }
              helperText={validationErrorObj.quantity ? validationErrorObj.quantity : ''}
            ></TextField>
          </Grid>
          <Grid
            size={3}
            sx={{
              display: "flex",
              width: '103px',
              ml: '19px',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              error={validationErrorObj.measure}
              type="text"
              variant="outlined"
              label="Measure"
              value={formData.measure}
              onChange={(e) => {
                setFormData({ ...formData, measure: e.target.value })
                setValidationErr({ ...validationErrorObj, measure: '' })
              }
              }
              helperText={validationErrorObj.measure ? validationErrorObj.measure : ''}
            ></TextField>
          </Grid>
          <Grid
            size={3}
            sx={{
              display: "flex",
              width: '95px',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl>
              <InputLabel id="unit-select-label">Unit</InputLabel>
              <Select
                error={validationErrorObj.measure_unit}
                labelId="unit-select-label"
                id="unit-select"
                label="Unit"
                sx={{ width: '88px' }}
                value={formData.measure_unit}
                onChange={(e) => {
                  setFormData({ ...formData, measure_unit: e.target.value })
                  setValidationErr({ ...validationErrorObj, measure_unit: '' })
                }
                }
                helperText={validationErrorObj.measure_unit ? validationErrorObj.measure_unit : ''}
              >
                {unitList && unitList.map(unit => (

                  <MenuItem value={unit}>{unit}</MenuItem>

                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            size={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              ml: '19px',
              alignItems: "center",
            }}
          >
            <TextField
              error={validationErrorObj.unit_price}
              type="text"
              variant="outlined"
              label="Price/Unit"
              value={formData.unit_price}
              onChange={(e) => {
                setFormData({ ...formData, unit_price: e.target.value })
                setValidationErr({ ...validationErrorObj, unit_price: '' })
              }
              }
              helperText={validationErrorObj.unit_price ? validationErrorObj.unit_price : ''}
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
              error={validationErrorObj.cost_price}
              type="text"
              variant="outlined"
              label="Cost/Unit"
              value={formData.cost_price}
              onChange={(e) => {
                setFormData({ ...formData, cost_price: e.target.value })
                setValidationErr({ ...validationErrorObj, cost_price: '' })
              }
              }
              helperText={validationErrorObj.cost_price ? validationErrorObj.cost_price : ''}
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
              error={validationErrorObj.supplier_name}
              type="text"
              variant="outlined"
              label="Supplier Name"
              value={formData.supplier_name}
              onChange={(e) => {
                setFormData({ ...formData, supplier_name: e.target.value })
                setValidationErr({ ...validationErrorObj, supplier_name: '' })
              }
              }
              helperText={validationErrorObj.supplier_name ? validationErrorObj.supplier_name : ''}
            ></TextField>
          </Grid>
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

export default UseForm