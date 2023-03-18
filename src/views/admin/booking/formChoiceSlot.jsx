import { Box, Button, ButtonBase, Menu, MenuItem, Typography } from "@mui/material"
import React from "react";



export default function FormChoiceSlot({handleBookingItem ,slots}) {
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDisableBooking, setIsDisableBooking] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setIsDisableBooking(!item.is_empty)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <Box>
            {slots.map((item, index) => (
              <>
                <ButtonBase onClick={(event) => handleClick(event, item)} >
                  <Box display={'flex'} flexDirection={'column'} width={'250px'} borderRadius={2} border={'1px solid'} m={2}>
                    <Box display={'flex'} width={'100%'} justifyContent={'center'} borderRadius={'8px 8px 0 0'} alignItems={'center'} height={50} bgcolor={item.is_empty ? 'green':  'red'}>
                      <Typography variant="h2" color={'white'}>{item.title}</Typography> 
                    </Box>
                    <Box width={'100%'} height={200}>
        
                    </Box>
                  </Box>
                </ButtonBase>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem disabled={isDisableBooking} onClick={(event) => handleBookingItem(event, item)}>Đặt chỗ</MenuItem>
                  <MenuItem onClick={handleClose}>Hiển thị thông tin</MenuItem>
                </Menu>
              </>
              ))}
              
        </Box>
    )
}