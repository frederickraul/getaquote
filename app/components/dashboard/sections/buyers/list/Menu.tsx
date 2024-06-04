import { Menu, MenuItem } from "@mui/material";
import React from "react";

const DropdownMenu = ({ anchorEl, onClose }) => {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={() => onClose(null)}
      >
        <MenuItem dense>Item 1</MenuItem>
        <MenuItem dense>Item 2</MenuItem>
        <MenuItem dense>Item 3</MenuItem>
        <MenuItem dense>Item 4</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu
