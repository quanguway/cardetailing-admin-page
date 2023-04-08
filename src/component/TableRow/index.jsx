import * as React from 'react';
import { Box, IconButton, TableCell, TableRow, Typography, TableBody, Collapse, Table, TableHead, Grid } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState } from 'react';
import dayjs from 'dayjs';

// const rowsDetail = [
//   {
//     value: "promotion_code",
//     label: 'Promotion code'
//   },
//   {
//     value: "title",
//     label: 'Title'
//   }
// ]





export default function Row(props) {
    const { row, rowsDetail } = props;
    const [open, setOpen] = React.useState(false);

    console.log(row);

    const [promotionCode, setPromotionCode] = useState(row.promotion_code);
    const [title, setTitle] = useState(row.title)
    const [startDate, setStartDate] = useState(dayjs(row.start_date))
    const [endDate, setEndDate] = useState(dayjs(row.end_date))

    const rowsShowDetail = [
      {
        label: 'Promotion code',
        name: 'promotion_code',
        useState: [promotionCode, setPromotionCode],
        disabled: true,
      },
      {
        label: 'Title',
        name: 'title',
        useState: [title, setTitle],
        disabled: true,
      },
      {
        label: 'Start date',
        useState: [startDate, setStartDate],
        disabled: true,
        type: 'date-picker'
      },
      {
        label: 'End date',
        useState: [endDate, setEndDate],
        type: 'date-picker'
      }
    ]

    console.log(rowsShowDetail);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.promotion_code}</TableCell>
          <TableCell>{row.start_date}</TableCell>
          <TableCell>{row.end_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                
              {/* <Grid container spacing={2}>
                {rowsDetail.map((item) => (
                  < >
                    <Grid item xs={4}>
                      <h4>{item.label}:</h4>
                    </Grid>
                    <Grid item xs={8}>
                      <p>{row[item.value]}</p>
                    </Grid>
                  </>
                ))}
              </Grid> */}
              <FormSimpleLayout fields={rowsShowDetail} isBackgroud={false} nameForm={'Thông tin chung'} nameButtonSave={'Lưu chi tiết giảm giá'} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }