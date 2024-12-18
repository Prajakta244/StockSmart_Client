import React from 'react'
import Grid from '@mui/material/Grid2';
import { FormControl,Box } from '@mui/material';
import {TextField,Button,FormLabel,NativeSelect,Select,MenuItem,InputLabel,useTheme,Typography} from '@mui/material';
import { useState,useEffect } from 'react';
import FlexBetween from './FlexBetween';
import { usePostProductMutation } from 'state/api';
import { setProduct } from 'state'
import { useGetProductQuery,useUpdateProductMutation } from 'state/api';
import { useDispatch } from 'react-redux'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

const UseForm = ({closeForm,action,productData,title}) => {
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
  const { data, isLoading,error,refetch } = useGetProductQuery();
  const [formData, setFormData] = useState({
    name: productData?.name || "",
    quantity:productData?.quantity || 0,
    unit_price: productData?.unit_price ||0,
    cost_price: productData?.cost_price ||0,
    supplier_name: productData?.supplier_name ||"",
    measure_unit: productData?.measure_unit ||"",
    measure:productData?.measure ||0,
    id:productData?.id||''
  });
  console.log(formData.measure_unit)
  const [postProduct] = usePostProductMutation();
  const[updateProduct] = useUpdateProductMutation()
  const unitList = process.env.REACT_APP_UNIT?.split(',')
  console.log("action", action);
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = formData;
    if(action == 'update'){
      console.log('prodct data',productData)
      const res = await updateProduct({id:productData.id,body:productData})
      
      if(res?.data?.status == 'success'){
        setMessage('Product updated successfuly!!')
        refetch()
        // closeForm()
        setSnackBarOpen({
          ...isSnackBarOpen,
          open: true,
          Transition:SlideTransition,
        })
      }
    }
    else
    {
      postProduct(productData)
        .unwrap()
        .then(() => {
          console.log('enqueueSnackbar')
          setMessage('Product added successfuly!!')
          setSnackBarOpen({
            ...isSnackBarOpen,
            open: true,
            Transition:SlideTransition,
          })
          refetch();
        })
        .catch((e) => alert(e));
      }
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
              type="text"
              variant="outlined"
              label="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              label="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            ></TextField>
          </Grid>
          <Grid
            size={3}
            sx={{
              display: "flex",
              width:'103px',
              ml:'19px',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              type="text"
              variant="outlined"
              label="Measure"
              value={formData.measure}
              onChange={(e) =>
                setFormData({ ...formData, measure: e.target.value })
              }
            ></TextField>
          </Grid>
          <Grid
            size={3}
            sx={{
              display: "flex",
              width:'95px',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl>
            <InputLabel id="unit-select-label">Unit</InputLabel>
            <Select
          labelId="unit-select-label"
          id="unit-select"
          label="Unit"
          sx={{width:'88px'}}
          value={formData.measure_unit}
          onChange={(e) =>{
            // alert(e.target.value)
            setFormData({ ...formData, measure_unit: e.target.value })
          }
          }
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
              ml:'19px',
              alignItems: "center",
            }}
          >
            <TextField
              type="text"
              variant="outlined"
              label="Price/Unit"
              value={formData.unit_price}
              onChange={(e) =>
                setFormData({ ...formData, unit_price: e.target.value })
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
              label="Cost/Unit"
              value={formData.cost_price}
              onChange={(e) =>
                setFormData({ ...formData, cost_price: e.target.value })
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
              label="Supplier Name"
              value={formData.supplier_name}
              onChange={(e) =>
                setFormData({ ...formData, supplier_name: e.target.value })
              }
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