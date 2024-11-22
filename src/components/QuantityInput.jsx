import React, { useState } from "react";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "./FlexBetween";
import Grid from "@mui/material/Grid2";
import { Typography, useTheme, Button } from "@mui/material";
import { usePostSaleMutation,useUpdateSaleMutation,useGetTransactionsQuery,useGetProductQuery } from "state/api";
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput({ productData, action,title }) {
  console.log('productData', productData)
  const [postSale] = usePostSaleMutation();
  const[updateSale] = useUpdateSaleMutation()
  const {refetch:fetchTrans } = useGetTransactionsQuery()
  const {refetch:fetchProdData } = useGetProductQuery()
  const theme = useTheme();
  const [isSnackBarOpen, setSnackBarOpen] = useState({
    open: false,
    Transition: Slide,
    vertical: 'top', horizontal: 'right'
  });
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  const { vertical, horizontal, open } = isSnackBarOpen;
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(productData?.quantity_sold); // State to hold the quantity
  const defaultQuantity = productData?.defaultQuantity || 1
  const addSale = async () => {
    const saleData = {
      product_name: productData?.name || "",
      quantity_sold: quantity || 0,
      sale_price: quantity * productData?.unit_price || 0,
      measure_unit: productData?.measure_unit || "",
      measure: productData?.measure || 0,
      product_id: productData?.product_id || '',
      date: "2024-10-17",
      available_quantity:productData.available_quantity - quantity
    };
    console.log('sale data', saleData)
    if (action == 'update') {
      const res = await updateSale({id:productData.id,body:saleData})
      console.log(res)
      fetchTrans()
      fetchProdData()
      setMessage('Sale updated successfuly!!')
      setSnackBarOpen({
        ...isSnackBarOpen,
        open: true,
        Transition: SlideTransition,
      })
    } else {
      postSale(saleData)
        .unwrap()
        .then(() => {
          setMessage('Sale added successfuly!!')
          setSnackBarOpen({
            ...isSnackBarOpen,
            open: true,
            Transition: SlideTransition,
          })
          fetchProdData();
        })
        .catch((e) => alert(e));
    }
  };
  return (
    <>
      <Snackbar
        open={isSnackBarOpen.open}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={isSnackBarOpen.Transition}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={1200}
      />
      <FlexBetween sx={{ m: 4 }}>
        <Grid container spacing={2} >
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
            size={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div">
              Product:
            </Typography>
          </Grid>
          <Grid
            size={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div">
              {productData.name}
            </Typography>
          </Grid>
          <Grid
            size={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div">
              Quantity:
            </Typography>
          </Grid>
          <Grid
            size={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NumberInput aria-label="Quantity Input" min={1} max={productData.available_quantity} onChange={(event, newValue) => { setQuantity(newValue)} } defaultValue={defaultQuantity}
            />
          </Grid>
          <Grid
            size={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div">
              Price:
            </Typography>
          </Grid>
          <Grid
            size={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div">
              {quantity * (productData.unit_price)}
            </Typography>
          </Grid>
          <Grid size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button variant="outlined" color="secondary" onClick={() => addSale()}>
              Sale
            </Button>
          </Grid>
        </Grid>
      </FlexBetween></>
  );
}

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
