import React, { useState, useEffect } from 'react'
import { useGetExpenseQuery,useDeleteExpenseMutation } from 'state/api'
import LongMenu from 'components/LongMenu'
import ModalC from 'components/Modal'
import QuantityInput from 'components/QuantityInput'
import Slide from '@mui/material/Slide';
import DialogeBox from 'components/DialogeBox'
import Table from 'components/Table'
import ExpenseForm from 'components/ExpenseForm'
import { Box,Button } from '@mui/material'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Expenses = () => {
  const { data, isLoading, refetch } = useGetExpenseQuery()
  const [deleteExpense] = useDeleteExpenseMutation()
  const [isOpen, setIsOpen] = useState(false);
  const [snackBarOpen, setSnackBar] = useState(false)
  const [message, setMessage] = useState('');
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [isSnackBarOpen, setSnackBarOpen] = useState({
    open: false,
    Transition: Slide,
    vertical: 'top', horizontal: 'right'
  });
  const onDeleteExpense = async () => {
    try{
      const res = await deleteExpense({ id: selectedRow['id'] })
      let msg = ''
      if (res?.data?.status == 'success') {
        msg = 'Expense deleted successfuly!!'
        refetch()
      }else{
        msg = 'Something went wrong!!! Try again later.'
      }
      setMessage(msg)
      setDeleteModalOpen(false)
      setSnackBar(true)
    }catch(e){
      setDeleteModalOpen(false)
      console.error(`Error occured while deleting product ${e}`)
    }
  }
  const options = [
    { value: "Delete", action: setDeleteModalOpen }
  ];
  const actionsObj = {
    close: () => setDeleteModalOpen(false),
    sure: onDeleteExpense
  }
  const modalElements = [
    <ModalC
      isOpen={deleteModalOpen}
      handleClose={() => setDeleteModalOpen(false)}
      title="Delete Expense"
      modalElement={<DialogeBox title='Delete Expense' content='Are you sure you want to delete the expense?' actions={actionsObj} />}
    ></ModalC>
  ]
  console.log(data)
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
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
      field: 'description',
      headerName: 'Description',
      width: 250,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 250,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
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
  const actionButton = <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleOpen} > Add Expense </Button>
  return (
    <>
      <ModalC
        isOpen={isOpen}
        handleClose={handleModalClose}
        title="Add Expense"
        modalElement={<ExpenseForm closeForm={handleModalClose} />}
      ></ModalC>
      <Table title='Expenses' subtitle='List of Expenses' columns={columns} data={data} setSelectedRow={setSelectedRow} snackBarData={{ snackBarOpen, message, handleClose }} isLoading={isLoading} hideColumn={{ id: false }} actionButton={actionButton}/>
    </>
  )
}

export default Expenses