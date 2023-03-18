import {
    Box,
    Button,
    ButtonBase,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import React from 'react';

export default function FormChoiceSlot({
    handleBookingItem,
    handleDetail,
    slots
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isDisableBooking, setIsDisableBooking] = React.useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (item) => {
        console.log(item);
        if (item.is_empty) {
            handleBookingItem(item);
        } else {
            handleDetail(item);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
            {slots.map((item, index) => (
                <Box key={index}>
                    <ButtonBase onClick={() => handleClick(item)}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={'250px'}
                            borderRadius={2}
                            border={'1px solid'}
                            m={2}
                        >
                            <Box
                                display={'flex'}
                                width={'100%'}
                                justifyContent={'center'}
                                borderRadius={'8px 8px 0 0'}
                                alignItems={'center'}
                                height={50}
                                bgcolor={item.is_empty ? 'green' : 'red'}
                            >
                                <Typography variant="h2" color={'white'}>
                                    {item.title}
                                </Typography>
                            </Box>
                            <Box
                                width={'100%'}
                                height={200}
                                sx={{ padding: '10px 0' }}
                            >
                                <h3>
                                    {item.is_empty
                                        ? 'Vị trí còn trống'
                                        : 'Đang thực hiện'}{' '}
                                </h3>
                            </Box>
                        </Box>
                    </ButtonBase>
                </Box>
            ))}
        </Box>
    );
}
