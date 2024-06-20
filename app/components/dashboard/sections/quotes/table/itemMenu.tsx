import { MenuItem, Popover } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react'
import Iconify from '../../../components/iconify';

interface MenuProps {
    open:any;
    handleCloseMenu:()=>void;
    handleOrderClick:(e:any)=>void;
    handleEmailClick:(e:any)=>void;
    handleSendConfirmClick:(e:any)=>void;
    handleEditClick:(e:any)=>void;
    handleDeleteClick:(e:any)=>void;
    handleSMSClick:(e:any)=>void;

   
  }
  
  const ItemMenu: React.FC<MenuProps> = ({
    open,
    handleCloseMenu,
    handleOrderClick,
    handleEmailClick,
    handleSendConfirmClick,
    handleEditClick,
    handleDeleteClick,
    handleSMSClick,
  }) => {

    const pathname = usePathname();
  return (
    <Popover
        keepMounted
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        
        PaperProps={{
          sx: { width: 160 },
        }}
      >
        { pathname == '/dashboard/processing' &&
        <MenuItem onClick={(e)=>{
          handleCloseMenu();
          handleOrderClick(e);
        }}>
        <Iconify icon="ic:outline-task" sx={{mr: 2 }} />
          Order
        </MenuItem>
        }
          { pathname === '/dashboard/new' &&
         <MenuItem onClick={(e)=>{
          handleCloseMenu();
          handleEmailClick(e);
        }}>
          <Iconify icon="eva:email-fill" sx={{ mr: 2 }} />
          Send
        </MenuItem>
       
        }
          { pathname === '/dashboard/processing' &&
          <MenuItem onClick={(e)=>{
            handleCloseMenu();
            handleSendConfirmClick(e);
          }}>
          <Iconify icon="eva:email-fill" sx={{ mr: 2 }} />
          Confirm
        </MenuItem>
        }

        <MenuItem onClick={(e)=>{
          handleCloseMenu();
          handleEditClick(e);
        }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={(e)=>{
          handleCloseMenu();
          handleDeleteClick(e);
          }}
         sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
  )
}

export default ItemMenu