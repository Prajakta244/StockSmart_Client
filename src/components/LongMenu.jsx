import { React, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalC from "./Modal";
import SaleModal from "./SaleModal";
const LongMenu = ({productData}) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const options = [
    { value: "Edit", action: setModalOpen },
    {value:"sale",action:setSaleModalOpen}
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} onClick={option.action}>
            {option.value}
          </MenuItem>
        ))}
      </Menu>
      <ModalC
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        productData={productData}
        title="Update Product"
        action="update"
      ></ModalC>
      <SaleModal
        isOpen={saleModalOpen}
        handleClose={() => setSaleModalOpen(false)}
        title="Sale Product"
        action='sale'
        productData={productData}
      ></SaleModal>
    </div>
  );
};

export default LongMenu;
