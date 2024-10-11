import { useState } from "react";
import Grid from '@mui/material/Grid2';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useGetProductQuery } from "state/api";
import Header from "components/Header";
import ModalC from "components/Modal";
import LongMenu from "components/LongMenu";

const Product = ({
  name,
  quantity,
  measure_unit,
  measure,
  unit,
  unit_price,
  cost_price,
  supplier_name,
  action,
  setOpen,
  id
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
      <Grid container>
      <Grid size={11} >
      <Typography
          sx={{ fontSize: 22 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          {name}
        </Typography>
      </Grid>
      <Grid size={1} >
        <LongMenu setOpen={setOpen} productData={{ name, quantity,measure, measure_unit, unit, unit_price, cost_price, supplier_name, action, setOpen, id
}}/>
      </Grid>
      </Grid>
        
        <Typography variant="h6" component="div">
          Quantity: {quantity}
        </Typography>
        <Typography variant="h6" component="div">
          Measure: {measure} {measure_unit}
        </Typography>
        <Typography variant="h6" component="div">
          Price Per Unit: {unit_price}
        </Typography>
        <Typography variant="h6" component="div">
          Cost Per Unit: {cost_price}
        </Typography>
        <Typography variant="h6" component="div" >
          Supplier: {supplier_name}
        </Typography>
        <input 
            type="hidden" 
            value={id}
            name="name"
          />
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading,error } = useGetProductQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [action,setAction] = useState('add')
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [selectedProduct,setSelectedProduct] = useState(null)
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log("data", error);

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 2 }}
      >
        <Box sx={{ gridColumn: "span 10" }}>
          <Header title="PRODUCTS" subtitle="See your list of products" />
        </Box>
        <Box sx={{ gridColumn: "span 2" }}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpen}
          >
            Add Product
          </Button>
        </Box>
      </Box>
      {/* <Modal isOpen={open} handleClose={handleClose}/> */}
      <ModalC
        isOpen={isOpen}
        handleClose={handleClose}
        title="Add Product"
        action={action}
      ></ModalC>
      {data?.data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.data.map(
            ({
              name,
              quantity,
              measure,
              measure_unit,
              unit,
              unit_price,
              cost_price,
              supplier_name,
              id
            }) => (
              
              <Product
                name={name}
                quantity={quantity}
                measure_unit={measure_unit}
                measure={measure}
                unit={unit}
                unit_price={unit_price}
                cost_price={cost_price}
                supplier_name={supplier_name}
                id={id}
                action={action}
                setOpen={setIsOpen}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading....</>
      )}
    </Box>
  );
};

export default Products;
