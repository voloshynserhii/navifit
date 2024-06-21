import React, { useState } from "react";
import dayjs from 'dayjs';
import { Button, Stack, Typography } from '@mui/material';
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { calendar } from '@src/utils/icons'

import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker = ({ onGetDateValue }) => {
    const [value, setValue] = useState(addDays(new Date(), 30));

    const pickDateHandler = (val) => {
        setValue(val);
        onGetDateValue(dayjs(val).format('YYYY-MM-DD'));
    }
  
  return (
    <Stack sx={{ width: '100%', maxWidth: 410 }}>
        <Typography>Data</Typography>
        <DatePicker 
            className='upper-datepicker'
            showIcon 
            selected={value} 
            disabled
            icon={<div>{calendar}</div>}
        />
        <DatePicker 
            inline 
            selected={value} 
            // showMonthDropdown
            minDate={addDays(new Date(), 30)}
            onChange={(date) => pickDateHandler(date)} 
        />
    </Stack>
  );
};

export default ReactDatePicker;