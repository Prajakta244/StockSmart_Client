import React from 'react'
import Dialog from "@mui/material/Dialog";
import QuantityInput from './QuantityInput';

const SaleModal = ({isOpen,handleClose,productData}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} >
      <QuantityInput productData={productData} />
    </Dialog>   
  )
}

export default SaleModal