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
import { useGetProductQuery, useDeleteproductMutation } from "state/api";
import Header from "components/Header";
import ModalC from "components/Modal";
import LongMenu from "components/LongMenu";
import QuantityInput from "components/QuantityInput";
import UseForm from "components/UseForm";
import DialogeBox from 'components/DialogeBox'
import Snackbar from '@mui/material/Snackbar';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, isLoading, error,refetch } = useGetProductQuery();
  const [deleteproduct] = useDeleteproductMutation()
  const [snackBarOpen, setSnackBar] = useState(false)
  const [message, setMessage] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false)
  };
  const options = [
    { value: "Edit", action: setModalOpen },
    { value: "Sale", action: setSaleModalOpen },
    { value: "Delete", action: setDeleteModalOpen }
  ];
  
  const ondeleteproduct = async () => {
    console.log('inside delete', id)
    const res = await deleteproduct({ id: id })

    if (res?.data?.status == 'success') {
      setMessage('Product deleted successfuly!!')
      refetch()
      setSnackBar(true)
    }
  }
  const actionsObj = {
    close: () => setDeleteModalOpen(false),
    sure: ondeleteproduct
  }
  const modalElements = [<ModalC
    isOpen={modalOpen}
    handleClose={() => setModalOpen(false)}
    productData={{
      name, quantity, measure, measure_unit, unit, unit_price, cost_price, supplier_name, action, setOpen, id
    }}
    title="Update Product"
    action="update"
    modalElement={<UseForm closeForm={() => setModalOpen(false)} action='update' productData={{
      name, quantity, measure, measure_unit, unit, unit_price, cost_price, supplier_name, action, setOpen, id
    }} title='Update Product'/>}
  ></ModalC>,
  <ModalC
    isOpen={saleModalOpen}
    handleClose={() => setSaleModalOpen(false)}
    title="Sale Product"
    action='sale'
    productData={{
      name, quantity, measure, measure_unit, unit, unit_price, cost_price, supplier_name, action, setOpen, id
    }}
    modalElement={<QuantityInput productData={{
      name, quantity, measure, measure_unit, unit, unit_price, cost_price, supplier_name, action, setOpen, product_id: id, defaultQuantity: 1,quantity_sold:1
    }} />}
  ></ModalC>,
  <ModalC
    isOpen={deleteModalOpen}
    handleClose={() => setDeleteModalOpen(false)}
    title="Delete product"
    modalElement={<DialogeBox title='Delete Product' content='Are you sure you want to delete the product?' actions={actionsObj} />}
  ></ModalC>]
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // TransitionComponent={Slide}
        message={message}
        key={'top' + 'right'}
        autoHideDuration={5000}
        onClose={handleClose}
      />
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
            <LongMenu setOpen={setOpen} data={{
              name, quantity, measure, measure_unit, unit, unit_price, cost_price, supplier_name, action, setOpen, id
            }} options={options} modalElements={modalElements} />
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
  const { data, isLoading, error,refetch } = useGetProductQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('add')
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log("data", data);

  const [modalOpen, setModalOpen] = useState(false);
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
        modalElement={<UseForm closeForm={handleClose} title='Add Product'/>}
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
          {data?.data?.map(
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
