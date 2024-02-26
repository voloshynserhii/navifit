import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue({ onGetDateValue }) {
    const [value, setValue] = useState(dayjs(new Date()).add(1, 'month'));

    const pickDateHandler = (val) => {
        setValue(val);
        onGetDateValue(dayjs(val).format('YYYY-MM-DD'));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    sx={{ width: '100%' }}
                    label="Desired date"
                    showDaysOutsideCurrentMonth
                    minDate={dayjs(new Date()).add(1, 'month')}
                    value={value}
                    onAccept={pickDateHandler}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}