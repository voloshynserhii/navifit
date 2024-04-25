import { useState } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Calendar from '../Icons/Calendar';

export default function DatePickerValue({ onGetDateValue }) {
    const [value, setValue] = useState(dayjs(new Date()).add(1, 'month'));

    const pickDateHandler = (val) => {
        setValue(val);
        onGetDateValue(dayjs(val).format('YYYY-MM-DD'));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography>Data</Typography>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    sx={{ width: '100%' }}

                    minDate={dayjs(new Date()).add(1, 'month')}
                    value={value}
                    onAccept={pickDateHandler}
                    slots={{
                        openPickerIcon: Calendar
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
// https://stackoverflow.com/questions/69569223/how-to-change-the-icon-in-mui-x-datepicker