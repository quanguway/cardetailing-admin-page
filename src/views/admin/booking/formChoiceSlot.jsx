import {
    Box,
    Button,
    ButtonBase,
    Menu,
    MenuItem,
    Paper,
    Typography
} from '@mui/material';
import { height } from '@mui/system';
import axios from 'axios';
import { apiConfig } from 'config/app.config';
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

    const styles = {
        paperContainer: {
            backgroundImage: `url('https://cutewallpaper.org/24/car-logo-png/mechanic-clipart-automobile-engineer-vector-cars-logo-png-transparent-png--kindpng.png')`,
            height: '70%',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
        }
    };


    return (
        <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
            {slots.map((item, index) => {
                return (
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
                                    {item.is_empty ? (
                                        <Paper
                                            style={styles.paperContainer}
                                        ></Paper>
                                    ) : (
                                        <Box
                                            sx={{
                                                height: '70%',
                                                backgroundColor: 'red',
                                                padding: '0 10px'
                                            }}
                                        ></Box>
                                    )}
                                </Box>
                            </Box>
                        </ButtonBase>
                    </Box>
                );
            })}
        </Box>
    );
}
