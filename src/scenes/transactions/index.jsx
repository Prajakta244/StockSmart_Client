import React, { useState, useEffect } from 'react'
import { useGetTransactionsQuery, useDeleteSaleMutation } from 'state/api'
import LongMenu from 'components/LongMenu'
import ModalC from 'components/Modal'
import QuantityInput from 'components/QuantityInput'
import Slide from '@mui/material/Slide';
import DialogeBox from 'components/DialogeBox'
import Table from 'components/Table'

const Transitions = () => {
  const { data, isLoading, refetch } = useGetTransactionsQuery()
  const [deleteSale] = useDeleteSaleMutation()
  const [isOpen, setIsOpen] = useState(false);
  const [snackBarOpen, setSnackBar] = useState(false)
  const [message, setMessage] = useState('');
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [isSnackBarOpen, setSnackBarOpen] = useState({
    open: false,
    Transition: Slide,
    vertical: 'top', horizontal: 'right'
  });
  const onDeleteSale = async () => {
    console.log('inside delete',selectedRow)
    const res = await deleteSale({ id: selectedRow['id'] })

    if (res?.data?.status == 'success') {
      setMessage('Sale deleted successfuly!!')
      refetch()
      setSnackBar(true)
    }
  }
  const options = [
    { value: "Edit", action: setSaleModalOpen },
    { value: "Delete", action: setDeleteModalOpen }
  ];
  const actionsObj = {
    close:() => setDeleteModalOpen(false),
    sure:onDeleteSale
  }
  const modalElements = [
    <ModalC
      isOpen={saleModalOpen}
      handleClose={() => setSaleModalOpen(false)}
      title="Sale Product"
      action='sale'
      modalElement={<QuantityInput productData={{
        name: selectedRow?.product_name, quantity: selectedRow?.quantity_sold, measure: selectedRow?.measure, measure_unit: selectedRow?.measure_unit, unit: '1', unit_price: 200, cost_price: selectedRow?.sale_price, supplier_name: '', id: selectedRow?.id,product_id:selectedRow?.product_id, defaultQuantity: 100 ,quantity_sold:selectedRow?.quantity_sold
      }} action='update'/>}
    ></ModalC>,
    <ModalC
      isOpen={deleteModalOpen}
      handleClose={() => setDeleteModalOpen(false)}
      title="Delete Transaction"
      modalElement={<DialogeBox title='Delete Transaction' content='Are you sure you want to delete the transaction?' actions={actionsObj} />}
    ></ModalC>
  ]
  useEffect(() => {
    refetch()
  }, [])
  console.log(data)
  const columns = [
    {
      field: 'product_id',
      headerName: 'Product ID',
      flex: 1,
      hide: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <LongMenu setOpen={isOpen} options={options} modalElements={modalElements} />
      ),
      sortable: false,
      width: 80,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'product_name',
      headerName: 'Product',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'quantity_sold',
      headerName: 'Quantity',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'sale_price',
      headerName: 'Sale Price',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'measure_unit',
      headerName: 'Measure Unit',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'measure',
      headerName: 'Measure',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'profit',
      headerName: 'Profit',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    }
  ]
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false)
  };
  return (
    <Table title='Transactions' subtitle='List of transactions' columns={columns} data={data} setSelectedRow={setSelectedRow} snackBarData={{snackBarOpen,message,handleClose}} isLoading={isLoading} hideColumn={{product_id: false}}/>
  )
}

export default Transitions